import mocha from 'mocha';
import chai from 'chai';
import connection, {STATUS_CONNECTED, STATUS_CONNECTING, STATUS_DISCONNECTED} from './connection';
import {SET_BAUD_RATE, RESET_CONNECTION, SELECT_SERIAL_PORT, UPDATE_CONNECTION_STATUS} from '../actions';

chai.should();

describe('connection reducer', () => {

    it('should STATUS_CONNECTED be equal connected', () => {
        STATUS_CONNECTED.should.be.deep.equal('connected')
    })

    it('should STATUS_CONNECTING be equal connecting', () => {
        STATUS_CONNECTING.should.be.deep.equal('connecting')
    })

    it('should STATUS_DISCONNECTED be equal disconnected', () => {
        STATUS_DISCONNECTED.should.be.deep.equal('disconnected')
    })

    it('should set baud rate', () => {
        connection(undefined, {
            type: SET_BAUD_RATE,
            rate: 115200
        })
        .baudRate.should.be
        .equal(115200)
    })

    it('should reset connection', () => {
        connection({status: STATUS_CONNECTED}, {
            type: RESET_CONNECTION
        })
        .status.should.be
        .equal(STATUS_DISCONNECTED)
    })

    it('should select port', () => {
        connection({selectedPort: 'port_1'}, {
            type: SELECT_SERIAL_PORT,
            port: 'port_2'
        })
        .selectedPort.should.be
        .equal('port_2')
    })

    it('should update connection status', () => {
        connection({status: STATUS_CONNECTED}, {
            type: UPDATE_CONNECTION_STATUS,
            status: STATUS_CONNECTING
        })
        .status.should.be
        .equal(STATUS_CONNECTING)

        connection({status: STATUS_CONNECTING}, {
            type: UPDATE_CONNECTION_STATUS,
            status: STATUS_DISCONNECTED
        })
        .status.should.be
        .equal(STATUS_DISCONNECTED)
    })
})