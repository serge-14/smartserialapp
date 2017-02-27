import mocha from 'mocha';
import chai from 'chai';
import logs, {DIRECTION_IN, DIRECTION_OUT, DIRECTION_ERROR, LOG_STATUS_NONE, LOG_STATUS_SENT, LOG_STATUS_ERROR} from './logs';

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

    it('no action, keeps same state', () => {
        logs(['item_1', 'item_2'],{}).should.be.deep.equal(['item_1', 'item_2'])
    })

    it('should handle ADD_LOG', () => {
        logs([], {
            type: 'ADD_LOG',
            id:1,
            direction:DIRECTION_OUT,
            content:'content'
        })
        .should.be.deep
        .equal([{id: 1, direction:DIRECTION_OUT, content:'content', status: LOG_STATUS_NONE}])
    })

    it('should handle SET_ERROR', () => {
        logs([], {
            type: 'SET_ERROR',
            error:'an error'
        })
        .should.be.deep
        .equal([{direction:DIRECTION_ERROR, content:'an error', status: LOG_STATUS_NONE}])
    })

    it('should handle UPDATE_LOG_STATUS', () => {
        let state = []

        state = logs(state, {
            type: 'ADD_LOG',
            id:1,
            direction:DIRECTION_OUT,
            content:'content 1'
        })

        state = logs(state, {
            type: 'ADD_LOG',
            id:2,
            direction:DIRECTION_OUT,
            content:'content 2'
        })

        state = logs(state, {
            type: 'ADD_LOG',
            direction:DIRECTION_OUT,
            content:'content 3'
        })

        state = logs(state, {
            type: 'UPDATE_LOG_STATUS',
            id: 2,
            status: LOG_STATUS_SENT
        })

        state = logs(state, {
            type: 'UPDATE_LOG_STATUS',
            id: 1,
            status: LOG_STATUS_ERROR
        })
        
        state.should.be.deep.equal([
            {id:1, direction:DIRECTION_OUT, content:'content 1', status: LOG_STATUS_ERROR},
            {id:2, direction:DIRECTION_OUT, content:'content 2', status: LOG_STATUS_SENT},
            {id:undefined, direction:DIRECTION_OUT, content:'content 3', status: LOG_STATUS_NONE}])
    })

    it('should clear logs with CLEAR_LOGS', () => {
        let state = []

        state = logs(state, {
            type: 'ADD_LOG',
            id:1,
            direction:DIRECTION_OUT,
            content:'content 1'
        })

        state = logs(state, {
            type: 'ADD_LOG',
            id:2,
            direction:DIRECTION_OUT,
            content:'content 2'
        })

        state.should.be.not.empty

        state = logs(state, {
            type: 'CLEAR_LOGS'
        })

        state.should.be.empty
    })
})