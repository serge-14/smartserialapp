import mocha from 'mocha';
import chai from 'chai';
import ports from './ports';
import {
  LIST_SERIAL_PORTS, RECEIVE_SERIAL_PORTS
} from '../actions'

chai.should();

describe('serialPorts reducer', () => {

    it('should have proper default state', () => {
        ports(undefined, {}).should.be.deep.equal({
                fetching: false,
                data: []
            })
    })

    it('should handle LIST_SERIAL_PORTS, and set fetching to true', () => {
        ports({fetching: false}, {
            type: LIST_SERIAL_PORTS
        })
        .fetching.should.be.true
    })

    it('should handle RECEIVE_SERIAL_PORTS, set fetching to false', () => {
        ports({fetching: true, data: []}, {
            type: RECEIVE_SERIAL_PORTS
        })
        .fetching.should.be.false
    })

    it('should handle RECEIVE_SERIAL_PORTS, update data', () => {
        ports({fetching: true, data: []}, {
            type: RECEIVE_SERIAL_PORTS,
            ports: ['1', '2']
        })
        .data.should.be.deep.equal(['1', '2'])
    })
})