import mocha from 'mocha';
import chai from 'chai';
import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { createStore } from 'redux'
import reducer from '../reducers'
import sinon from 'sinon';

import Main from './main'
import {SerialPortWrapper} from '../helpers/serialportwrapper';

chai.should();

describe('Main', () =>
{
    let mock
    let store
    let serialport

    beforeEach(() =>
    {
        mock = sinon.sandbox.create();
        store = createStore(reducer)
        serialport = mock.mock(new SerialPortWrapper(null, null))
    })

    afterEach(() =>
    {
        mock.restore();
    })

    it('should have proper set of components', () =>
    {
    })
})