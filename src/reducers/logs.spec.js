import mocha from 'mocha';
import chai from 'chai';
import logs, {DIRECTION_IN, DIRECTION_OUT} from './logs';

chai.should();

describe('logs reducer', () => {

    it('should DIRECTION_IN be equal 0', () => {
        DIRECTION_IN.should.be.deep.equal(0)
    })

    it('should DIRECTION_OUT be equal 1', () => {
        DIRECTION_OUT.should.be.deep.equal(1)
    })

    it('initial state', () => {
        logs(undefined,{}).should.be.deep.equal([])
    })

    it('should handle ADD_LOG', () => {
        logs([], {
            type: 'ADD_LOG',
            direction:DIRECTION_OUT,
            content:'content'
        })
        .should.be.deep
        .equal([{direction:DIRECTION_OUT, content:'content'}])
    })
})