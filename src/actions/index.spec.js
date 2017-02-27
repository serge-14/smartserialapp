import mocha from 'mocha';
import chai from 'chai';
import {
    clearLogs,
    resetConnection,
    setBaudRate,
    setError,
    updateConnectionStatus,
    selectSerialPort,
    receiveSerialPorts,
    listSerialPorts,
    updateLogStatus,
    addLog,
    CLEAR_LOGS,
    RESET_CONNECTION,
    SET_BAUD_RATE,
    SET_ERROR,
    UPDATE_CONNECTION_STATUS,
    SELECT_SERIAL_PORT,
    RECEIVE_SERIAL_PORTS,
    LIST_SERIAL_PORTS,
    UPDATE_LOG_STATUS,
    ADD_LOG
} from './index';

chai.should();

describe('Actions', () =>
{
    describe('clearLogs', () =>
    {
        it('should return proper type', () => 
        {
            clearLogs().type.should.be.equal(CLEAR_LOGS)
        })
    })

    describe('resetConnection', () =>
    {
        it('should return proper type', () => 
        {
            resetConnection().type.should.be.equal(RESET_CONNECTION)
        })
    })

    describe('setBaudRate', () =>
    {
        it('should return proper type', () => 
        {
            setBaudRate(0).type.should.be.equal(SET_BAUD_RATE)
        })

        it('should return proper rate', () => 
        {
            setBaudRate(50).rate.should.be.equal(50)
            setBaudRate(9600).rate.should.be.equal(9600)
            setBaudRate(115200).rate.should.be.equal(115200)
        })
    })

    describe('setError', () =>
    {
        it('should return proper type', () => 
        {
            setError(0).type.should.be.equal(SET_ERROR)
        })

        it('should return proper error message from Error', () => 
        {
            setError(new Error('an error from error')).error.should.be.equal('an error from error')
        })

        it('should return proper error message from string', () => 
        {
            setError('a string error').error.should.be.equal('a string error')
        })
    })

    describe('updateConnectionStatus', () =>
    {
        it('should return proper type', () => 
        {
            updateConnectionStatus('status').type.should.be.equal(UPDATE_CONNECTION_STATUS)
        })

        it('should return proper status', () => 
        {
            updateConnectionStatus('connected').status.should.be.equal('connected')
            updateConnectionStatus('disconnected').status.should.be.equal('disconnected')
        })
    })

    describe('selectSerialPort', () =>
    {
        it('should return proper type', () => 
        {
            selectSerialPort('port').type.should.be.equal(SELECT_SERIAL_PORT)
        })

        it('should return proper port', () => 
        {
            selectSerialPort('port_1').port.should.be.equal('port_1')
            selectSerialPort('port_2').port.should.be.equal('port_2')
        })
    })

    describe('receiveSerialPorts', () =>
    {
        it('should return proper type', () => 
        {
            receiveSerialPorts('port').type.should.be.equal(RECEIVE_SERIAL_PORTS)
        })

        it('should return proper ports', () => 
        {
            receiveSerialPorts(['port_1', 'port_2']).ports.should.be.deep.equal(['port_1', 'port_2'])
            receiveSerialPorts([]).ports.should.be.deep.equal([])
        })
    })

    describe('listSerialPorts', () =>
    {
        it('should return proper type', () => 
        {
            listSerialPorts().type.should.be.equal(LIST_SERIAL_PORTS)
        })
    })

    describe('updateLogStatus', () =>
    {
        it('should return proper type', () => 
        {
            updateLogStatus().type.should.be.equal(UPDATE_LOG_STATUS)
        })

        it('should return proper id', () => 
        {
            updateLogStatus('id1').id.should.be.equal('id1')
            updateLogStatus('id2').id.should.be.equal('id2')
        })

        it('should return proper status', () => 
        {
            updateLogStatus('id1', 'delivered').status.should.be.equal('delivered')
            updateLogStatus('id2', 'error').status.should.be.equal('error')
        })
    })

    describe('addLog', () =>
    {
        it('should return proper type', () => 
        {
            addLog().type.should.be.equal(ADD_LOG)
        })

        it('should return proper id', () => 
        {
            addLog('id1').id.should.be.equal('id1')
            addLog('id2').id.should.be.equal('id2')
        })

        it('should return proper direction', () => 
        {
            addLog('id1', 0).direction.should.be.equal(0)
            addLog('id2', 1).direction.should.be.equal(1)
        })

        it('should return proper content', () => 
        {
            addLog('id1', 0, 'message 1').content.should.be.equal('message 1')
            addLog('id2', 1, 'message 2').content.should.be.equal('message 2')
        })
    })
})