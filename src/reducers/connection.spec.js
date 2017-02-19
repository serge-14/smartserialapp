import mocha from 'mocha';
import chai from 'chai';
import connection, {STATUS_CONNECTED, STATUS_CONNECTING, STATUS_DISCONNECTED} from './connection';
import {SET_BAUD_RATE} from '../actions';

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
})