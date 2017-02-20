import mocha from 'mocha';
import chai from 'chai';
import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { createStore } from 'redux'
import reducer from '../reducers'

import Log from './log'

chai.should();

describe('Log', () =>
{
    let mock
    let store

    beforeEach(() =>
    {
        store = createStore(reducer)
    })

    afterEach(() =>
    {
    })

    it('should have proper set of components', () =>
    {
    })
})