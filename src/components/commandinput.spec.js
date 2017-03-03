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
            serialport.expects('write').never()

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)
            
            const input = wrapper.find('#command-text')
            typeCommand(input, '')

            input.simulate('keyPress', {charCode:13})

            serialport.verify()
        })

        it('should send all parts even if input is empty', () => 
        {
            serialport.expects('write').withArgs('enter press?')

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)
            
            const input = wrapper.find('#command-text')
            
            typeCommand(input, 'enter')
            input.simulate('keyPress', {charCode:32})

            typeCommand(input, 'press')
            input.simulate('keyPress', {charCode:32})

            typeCommand(input, '')

            input.simulate('keyPress', {charCode:13})

            serialport.verify()
        })

        it('should send all parts and input value', () => 
        {
            serialport.expects('write').withArgs('enter press yeah?')

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)
            
            const input = wrapper.find('#command-text')
            
            typeCommand(input, 'enter')
            input.simulate('keyPress', {charCode:32})

            typeCommand(input, 'press')
            input.simulate('keyPress', {charCode:32})

            typeCommand(input, 'yeah')

            input.simulate('keyPress', {charCode:13})

            serialport.verify()
        })

        it('should do nothing on other presses', () => 
        {
            serialport.expects('write').never()

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)
            
            const input = wrapper.find('#command-text')

            let preventDefault = mock.stub()

            input.simulate('keyPress', {charCode:12, preventDefault:preventDefault})

            sinon.assert.notCalled(preventDefault)
            serialport.verify()
        })

        it('should prevent default keyPress event handler when adding new part', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            typeCommand(input, 'enter_press')

            let preventDefault = mock.stub()

            input.simulate('keyPress', {charCode:32, preventDefault:preventDefault})

            sinon.assert.calledOnce(preventDefault)
        })

        it('should prevent default keyPress event handler when sending command', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            typeCommand(input, 'enter_press')

            let preventDefault = mock.stub()

            input.simulate('keyPress', {charCode:13, preventDefault:preventDefault})

            sinon.assert.calledOnce(preventDefault)
        })

        it('should reset input value after adding new part', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)
            
            const input = wrapper.find('#command-text')
            
            typeCommand(input, 'enter')

            input.get(0).value.should.not.be.equal('')

            input.simulate('keyPress', {charCode:32})

            input.get(0).value.should.be.equal('')
        })

        it('should trim input with space', () =>
        {
            serialport.expects('write').withArgs('button_click?')

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            typeCommand(input, '   button_click   ')
            input.simulate('keyPress', {charCode:32})

            wrapper.find('#command-send').simulate('click')

            serialport.verify()
        })

        it('should trim input string when clicking a button', () =>
        {
            serialport.expects('write').withArgs('button_click?')

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            typeCommand(input, '   button_click   ')

            wrapper.find('#command-send').simulate('click')

            serialport.verify()
        })

        it('should split trim input string when clicking a with enter', () => 
        {
            serialport.expects('write').withArgs('enter_press?')

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)
            
            const input = wrapper.find('#command-text')
            typeCommand(input, '   enter_press    ')

            input.simulate('keyPress', {charCode:13})

            serialport.verify()
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