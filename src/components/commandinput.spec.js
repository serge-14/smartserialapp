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

function typeCommand(input, command)
{
    input.get(0).value = command
    input.first().simulate('change')
}

describe('CommandInput', () =>
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

    it('should have proper set of components', () => {
        const wrapper = mount(<CommandInput/>)

        wrapper.find('InputGroup').should.have.length(1)
        wrapper.find('button').should.have.length(2)
        wrapper.find('.input-group-addon').should.have.length(1)
    })

    describe('send button', () =>
    {
        it('should send simple command to serial port when send button clicked', () => {
            serialport.expects('write').withArgs('button_click?')

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            typeCommand(input, 'button_click')
            
            wrapper.find('#command-send').simulate('click')

            serialport.verify()
        })
    })

    describe('handleKeyPress', () =>
    {
        it('should send simple command to serial port when enter pressed', () => 
        {
            serialport.expects('write').withArgs('enter_press?')

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)
            
            const input = wrapper.find('#command-text')
            typeCommand(input, 'enter_press')

            input.simulate('keyPress', {charCode:13})

            serialport.verify()
        })

        it('should not send empty command', () => 
        {

        })

        it('should send all parts even if input is empty', () => 
        {

        })

        it('should send all parts and input value', () => 
        {

        })

        it('should clear all commands and input after pressing clear button', () =>
        {

        })

        it('should prevent default keyPress event handler when adding new part', () =>
        {

        })

        it('should prevent default keyPress event handler when sending command', () =>
        {

        })

        it('should split commands with spaces', () =>
        {

        })

        it('should reset input value after adding new part', () =>
        {

        })

        it('should split commands with spaces, and trim input string', () =>
        {

        })
    })

    describe('handleKeyDown', () =>
    {
        it('should remove last command with backspace', () =>
        {

        })

        it('should not remove last command with backspace if input is not empty', () =>
        {

        })

        it('should prevent default keyDown event handler when removing last part', () =>
        {

        })
    })

    describe('text', () =>
    {
        it('should clear state', () =>
        {

        })

        it('should clear state when button clicked', () =>
        {

        })

        it('should update text value in state', () =>
        {

        })
    })

    describe("send", () =>
    {
        it('should write all parts', () =>
        {

        })

        it('should write all parts and input value', () =>
        {

        })

        it('should write only input value', () =>
        {

        })

        it('should add ? in the end of command', () =>
        {

        })

        it('should dispatch addLog', () =>
        {

        })

        it('should dispatch message status', () =>
        {

        })

        it('should clear state', () =>
        {

        })
    })
})