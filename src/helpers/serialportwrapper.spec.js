import mocha from 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import {SerialPortWrapper} from './serialportwrapper';

chai.use(chaiAsPromised);
chai.should();


class serialportapi
{
    isOpen(){}

    on(event, callback) {}

    close(){}
}

describe('serial port wrapper', () => {

    let serialport = null
    let wrapper = null
    let mock = null
    let dispatch

    beforeEach(() =>
    {
        mock = sinon.sandbox.create();

        dispatch = mock.spy()
        

        serialport = mock.mock(serialportapi)

        serialport.list = mock.stub()
        serialport.create = mock.spy(() => serialport)
        serialport.on = mock.stub()
        serialport.isOpen = mock.stub()
        serialport.close = mock.stub()
        serialport.write = mock.stub()
        serialport.drain = mock.stub()

        wrapper = new SerialPortWrapper(serialport, dispatch)
    })

    afterEach(() =>
    {
        mock.restore();
        serialport = null
        wrapper = null;
    })

    it('should list zero ports', async () => {

        serialport.list.callsArgWith(0, null, [])

        await wrapper.list()

        sinon.assert.calledWith(dispatch, { type: 'LIST_SERIAL_PORTS' })
        sinon.assert.calledWith(dispatch, { type: 'RECEIVE_SERIAL_PORTS', ports: [] })
        sinon.assert.callCount(dispatch, 2)
    })

    it('should list two ports', async () => {
        const error = new Error('an error')
        serialport.list.callsArgWith(0, error, ['1', '2'])

        wrapper.list().should.eventually.be.rejected;

        sinon.assert.calledWith(dispatch, { type: 'LIST_SERIAL_PORTS' })
        sinon.assert.calledWith(dispatch, { type: 'RECEIVE_SERIAL_PORTS', ports: [] })
        sinon.assert.calledWith(dispatch, { type: 'SET_ERROR', error: 'an error' })
        sinon.assert.callCount(dispatch, 3)
    })

    it('should connect to provided port and update status', async () =>
    {
        serialport.on.withArgs('open').callsArg(1);

        serialport.parser = 'parser'

        wrapper.connect({comName: 'COM1'})

        sinon.assert.calledWith(serialport.create, 'COM1', { baudRate: wrapper.baudRate, parser: serialport.parser })

        sinon.assert.calledWith(dispatch, { type: 'UPDATE_CONNECTION_STATUS', status: 'connecting' })
        sinon.assert.calledWith(dispatch, { type: 'UPDATE_CONNECTION_STATUS', status: 'connected' })
        sinon.assert.callCount(dispatch, 2)

        sinon.assert.calledWith(serialport.on, 'open')
        sinon.assert.calledWith(serialport.on, 'error')
        sinon.assert.calledWith(serialport.on, 'data')
        sinon.assert.callCount(serialport.on, 3)
    });

    it('should dispatch an error when connection failed and update status', async () =>
    {
        const error = new Error('an error')

        serialport.parser = 'parser'
        serialport.on.withArgs('error').callsArgWith(1, error);
        serialport.isOpen.returns(false)

        wrapper.connect({comName: 'COM1'})

        sinon.assert.calledWith(serialport.create, 'COM1', { baudRate: wrapper.baudRate, parser: serialport.parser })

        sinon.assert.calledWith(dispatch, { type: 'UPDATE_CONNECTION_STATUS', status: 'connecting' })
        sinon.assert.calledWith(dispatch, { type: 'UPDATE_CONNECTION_STATUS', status: 'disconnected' })
        sinon.assert.calledWith(dispatch, { type: 'SET_ERROR', error: 'an error' })
        sinon.assert.callCount(dispatch, 3)

        sinon.assert.calledWith(serialport.on, 'open')
        sinon.assert.calledWith(serialport.on, 'error')
        sinon.assert.calledWith(serialport.on, 'data')
        sinon.assert.callCount(serialport.on, 3)
    });

    it('should disconnect and update status', async () =>
    {
        wrapper.connect({comName: 'COM1'})

        serialport.isOpen.returns(true)

        wrapper.disconnect({comName: 'COM1'})

        sinon.assert.calledOnce(serialport.close)
        sinon.assert.calledWith(dispatch, { type: 'UPDATE_CONNECTION_STATUS', status: 'disconnected' })
    });

    it('should ignore disconnect if not connected', async () =>
    {
        wrapper.disconnect({comName: 'COM1'})

        sinon.assert.notCalled(serialport.close)
        sinon.assert.notCalled(dispatch)
    });

    it('should disconnect and update status', async () =>
    {
        wrapper.connect({comName: 'COM1'})

        serialport.isOpen.returns(true)

        wrapper.disconnect({comName: 'COM1'})

        sinon.assert.calledOnce(serialport.close)
        sinon.assert.calledWith(dispatch, { type: 'UPDATE_CONNECTION_STATUS', status: 'disconnected' })
    });

    it('should disconnect on an error', async () =>
    {
        const error = new Error('an error')

        wrapper.connect({comName: 'COM1'})
        serialport.isOpen.returns(false)

        serialport.on.lastCall.args[1](error)

        sinon.assert.notCalled(serialport.close)
        sinon.assert.calledWith(dispatch, { type: 'UPDATE_CONNECTION_STATUS', status: 'disconnected' })
        sinon.assert.calledWith(dispatch, { type: 'SET_ERROR', error: 'an error' })
    })

    it('should send log when data received', async () =>
    {
        wrapper.connect({comName: 'COM1'})
        serialport.isOpen.returns(true)

        serialport.on.secondCall.args[1]('test message')

        sinon.assert.notCalled(serialport.close)
        sinon.assert.calledWith(dispatch, { type: 'ADD_LOG', id: 0, direction: 0, content: 'test message' })
    })

    it('should write message', async () =>
    {
        serialport.write.callsArgWith(1)
        serialport.drain.callsArgWith(0)

        wrapper.connect({comName: 'COM1'})
        serialport.isOpen.returns(true)

        const callback = mock.spy()

        wrapper.write('hello there!', callback)

        sinon.assert.notCalled(serialport.close)
        sinon.assert.calledWith(serialport.write, 'hello there!\r\n')
        sinon.assert.calledOnce(serialport.drain)
        sinon.assert.calledOnce(callback)
    })
})