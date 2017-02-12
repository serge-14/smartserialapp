import mocha from 'mocha';
import chai from 'chai';
import serialPorts, {STATUS_CONNECTED, STATUS_DISCONNECTED} from './serialports';

chai.should();

describe('serialPorts reducer', () => {

    it('should STATUS_CONNECTED be equal 1', () => {
        STATUS_CONNECTED.should.be.deep.equal(1)
    })

    it('should STATUS_DISCONNECTED be equal 2', () => {
        STATUS_DISCONNECTED.should.be.deep.equal(2)
    })
})