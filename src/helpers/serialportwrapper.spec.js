import mocha from 'mocha';
import chai from 'chai';
import {SerialPortWrapper} from './serialportwrapper';

chai.should();

class MockSerialPort
{
    constructor(name, options)
    {
        name.should.be.equal(MockSerialPort.expectedPort)
        options.should.be.deep.equal(MockSerialPort.expectedOptions)

        this.isOpenValue = false
    }

    isOpen()
    {
        return this.isOpenValue;
    }

    on(event, callback)
    {
        MockSerialPort.events.push(event)
        MockSerialPort.callbacks.set(event, callback)

        if(event === 'open' && MockSerialPort.error === null )
        {
            callback()

            this.isOpenValue = true
        }
        else if(event === 'error' && MockSerialPort.error !== null)
        {
            callback(MockSerialPort.error)
        }
    }

    close() {
        MockSerialPort.events.push('close')
    }

    static error = null
    static ports = []
    static events = []
    static callbacks = {}
    static expectedPort = null
    static expectedOptions = null

    static list(callback)
    {
        callback(this.error, this.ports)
    }

    static fireEvent(name, args)
    {
        if(this.callbacks.has(name))
        {
            this.callbacks.get(name)(args);
        }
    }
}

describe('serial port wrapper', () => {

    let serialport = null;
    let wrapper = null;
    let events = []
    const dispatch = (x) => { events.push(x) }

    beforeEach(() =>
    {
        events = []

        serialport = MockSerialPort
        serialport.error = null
        serialport.ports = []
        serialport.events = []
        serialport.expectedPort = null
        serialport.expectedOptions = null
        serialport.callbacks = new Map()

        wrapper = new SerialPortWrapper(serialport)
    })

    afterEach(() =>
    {
        serialport = null
        wrapper = null;
    })

    it('should list zero ports', async () => {
        const func = wrapper.list()

        await func(dispatch);

        events.should.be.deep.equal([
            { type: 'LIST_SERIAL_PORTS' },
            { type: 'RECEIVE_SERIAL_PORTS', ports: [] }])
    })

    it('should list two ports', async () => {
        serialport.ports = ['1', '2']

        const func = wrapper.list()

        await func(dispatch);

        events.should.be.deep.equal([
            { type: 'LIST_SERIAL_PORTS' },
            { type: 'RECEIVE_SERIAL_PORTS', ports: serialport.ports }])
    })

    it('should throw exception if serial port returned error', async () => {
        serialport.error = 'an error'
        serialport.ports = ['1', '2']

        const func = wrapper.list()

        let err = null
        try
        {
            await func(dispatch)
        }
        catch (e)
        {
            err = e
        }

        chai.expect(err).is.equal('an error')

        events.should.be.deep.equal([
            { type: 'LIST_SERIAL_PORTS' },
            { type: 'RECEIVE_SERIAL_PORTS', ports: [] },
            { type: 'SET_ERROR', error: 'an error' }])
    })

    it('should connect to provided port and update status', async () =>
    {
        serialport.expectedPort = 'com1'
        serialport.expectedOptions = {baudRate: wrapper.baudRate}

        const func = wrapper.connect({pnpId: serialport.expectedPort})

        await func(dispatch);

        serialport.events.should.be.deep.equal(['open', 'error'])

        events.should.be.deep.equal([
            { type: 'UPDATE_CONNECTION_STATUS', connectionStatus: 'connecting' },
            { type: 'UPDATE_CONNECTION_STATUS', connectionStatus: 'connected' }
        ])
    });

    it('should dispatch an error when connection failed and update status', async () =>
    {
        serialport.error = 'connection error'
        serialport.expectedPort = 'com1'
        serialport.expectedOptions = {baudRate: wrapper.baudRate}

        const func = wrapper.connect({pnpId: 'com1'})

        await func(dispatch);

        serialport.events.should.be.deep.equal(['open', 'error'])

        events.should.be.deep.equal([
            { type: 'UPDATE_CONNECTION_STATUS', connectionStatus: 'connecting' },
            { type: 'UPDATE_CONNECTION_STATUS', connectionStatus: 'disconnected' },
            { type: 'SET_ERROR', error: serialport.error }
        ])
    });

    it('should disconnect and update status', async () =>
    {
        serialport.expectedPort = 'com1'
        serialport.expectedOptions = {baudRate: wrapper.baudRate}

        await  wrapper.connect({pnpId: 'com1'})(() => {})

        const func = wrapper.disconnect()
        await func(dispatch);

        serialport.events.should.be.deep.equal(['open', 'error', 'close'])

        events.should.be.deep.equal([
            { type: 'UPDATE_CONNECTION_STATUS', connectionStatus: 'disconnected' }
        ])
    });

    it('should ignore disconnect if not connected', async () =>
    {
        const func = wrapper.disconnect()
        await func(dispatch);

        serialport.events.should.be.deep.equal([])

        events.should.be.deep.equal([])
    });

    it('should disconnect if error occurred', async () =>
    {
        serialport.expectedPort = 'com1'
        serialport.expectedOptions = {baudRate: wrapper.baudRate}

        await wrapper.connect({pnpId: 'com1'})(dispatch)

        serialport.fireEvent('error', 'connection error')

        events.should.be.deep.equal([
            { type: 'UPDATE_CONNECTION_STATUS', connectionStatus: 'connecting' },
            { type: 'UPDATE_CONNECTION_STATUS', connectionStatus: 'connected' },
            { type: 'UPDATE_CONNECTION_STATUS', connectionStatus: 'disconnected' },
            { type: 'SET_ERROR', error: 'connection error' }
        ])
    });
})