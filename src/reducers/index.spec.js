import mocha from 'mocha';
import chai from 'chai';
import serialPortApp from '.';
import {STATUS_DISCONNECTED} from './connection';

chai.should();

describe('serialPortApp reducer', () => {

    it('should have correct initial state', () => {
        const state = serialPortApp(undefined, {});

        state.should.be.deep.equal({
          logs:[],
          ports:{
            fetching:false,
            data:[]
          },
          connection:
          {
            selectedPort: null,
            status: STATUS_DISCONNECTED,
            baudRate: 9600
          }});
    })
})