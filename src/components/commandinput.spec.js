import mocha from 'mocha';
import chai from 'chai';
import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { createStore } from 'redux'
import ConnectedCommandInput, { CommandInput } from './commandinput'
import reducer from '../reducers'
import sinon from 'sinon';
import {SerialPortWrapper} from '../helpers/serialportwrapper';

chai.should();

describe('CommandInput', () => {

    let mock

    beforeEach(() =>
    {
        mock = sinon.sandbox.create();
    })

    afterEach(() =>
    {
        mock.restore();
    })

    it('should have proper default state', () => {
        const wrapper = mount(<CommandInput/>)

        wrapper.find('InputGroup').should.have.length(1)
        wrapper.find('button').should.have.length(2)
        wrapper.find('.input-group-addon').should.have.length(1)
    })

    it('should send simple command to serial port when enter pressed', () => {
        const store = createStore(reducer)
        
        const serialport = mock.mock(new SerialPortWrapper(null, null))
        serialport.expects('write').withArgs('enter_press?')

        const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)
        
        const input = wrapper.find('#command-text')
        input.get(0).value = 'enter_press'
        input.first().simulate('change')
        input.simulate('keyPress', {charCode:13})

        serialport.verify()
    })

    it('should send simple command to serial port when send button clicked', () => {
        const store = createStore(reducer)
        
        const serialport = mock.mock(new SerialPortWrapper(null, null))
        serialport.expects('write').withArgs('button_click?')

        const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)
        
        const input = wrapper.find('#command-text')
        input.get(0).value = 'button_click'
        input.first().simulate('change')
        
        wrapper.find('#command-send').simulate('click')

        serialport.verify()
    })
})