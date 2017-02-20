import mocha from 'mocha';
import chai from 'chai';
import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { createStore } from 'redux'
import reducer from '../reducers'
import sinon from 'sinon';

import LogContainer from './logcontainer'

chai.should();

describe('LogContainer', () =>
{
    let mock
    let store

    beforeEach(() =>
    {
        mock = sinon.sandbox.create();
        store = createStore(reducer)
    })

    afterEach(() =>
    {
        mock.restore();
    })

    it('should have proper set of components', () =>
    {
    })
})