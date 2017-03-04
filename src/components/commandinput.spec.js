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

        it('should send empty', () => {
            serialport.expects('write').never()

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            wrapper.find('#command-send').simulate('click')

            serialport.verify()
        })

        it('should send simple command to serial port and handle status', () => {
            serialport.object.write = mock.stub()
            serialport.object.write.callsArg(1)

            store.dispatch = mock.stub()

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            typeCommand(input, 'button_click')

            wrapper.find('#command-send').simulate('click')
            
            sinon.assert.calledOnce(serialport.object.write)
            sinon.assert.calledWith(store.dispatch, { type: 'UPDATE_LOG_STATUS', id: 1, status: 1 })
        })

        it('should send simple command to serial port and handle status with error', () => {
            serialport.object.write = mock.stub()
            serialport.object.write.callsArgWith(1, new Error('error'))

            store.dispatch = mock.stub()

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            typeCommand(input, 'button_click')

            wrapper.find('#command-send').simulate('click')
            
            sinon.assert.calledOnce(serialport.object.write)
            sinon.assert.calledWith(store.dispatch, { type: 'UPDATE_LOG_STATUS', id: 1, status: 2 })
        })

        it('should send simple command to serial port and add log', () => {
            store.dispatch = mock.stub()

            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            typeCommand(input, 'button_click')

            wrapper.find('#command-send').simulate('click')
            
            sinon.assert.calledWith(store.dispatch, { type: 'ADD_LOG', direction: 1, id: 1, content: 'button_click?' })
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
        it('should remove last command with backspace, key code 8', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            const commandInput = wrapper.find('CommandInput')

            commandInput.get(0).state.parts.push('hello')

            input.simulate('keyDown', {charCode:8})

            commandInput.get(0).state.parts.should.be.empty
        })

        it('should remove last command with backspace, key code 46', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            const commandInput = wrapper.find('CommandInput')

            commandInput.get(0).state.parts.push('hello')

            input.simulate('keyDown', {charCode:46})

            commandInput.get(0).state.parts.should.be.empty
        })

        it('should not remove last command with backspace, key code 13', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            const commandInput = wrapper.find('CommandInput')

            commandInput.get(0).state.parts.push('not_removed')

            input.simulate('keyDown', {charCode:13})

            commandInput.get(0).state.parts.should.be.deep.equal(['not_removed'])
        })

        it('should not remove last command with backspace if input is not empty', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            const commandInput = wrapper.find('CommandInput')

            commandInput.get(0).state.parts.push('not_removed')

            typeCommand(input, 'c')
            input.simulate('keyDown', {charCode:46})

            commandInput.get(0).state.parts.should.be.deep.equal(['not_removed'])
        })

        it('should prevent default keyDown event handler when removing last part', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            const commandInput = wrapper.find('CommandInput')

            commandInput.get(0).state.parts.push('not_removed')

            let preventDefault = mock.stub()

            input.simulate('keyDown', {charCode:46, preventDefault:preventDefault})

            sinon.assert.calledOnce(preventDefault)
        })

        it('should not prevent default keyDown event handler, wrong key', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            const commandInput = wrapper.find('CommandInput')

            commandInput.get(0).state.parts.push('not_removed')

            let preventDefault = mock.stub()

            input.simulate('keyDown', {charCode:15, preventDefault:preventDefault})

            sinon.assert.notCalled(preventDefault)
        })

        it('should not prevent default keyDown event handler, no parts', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const input = wrapper.find('#command-text')
            const commandInput = wrapper.find('CommandInput')

            let preventDefault = mock.stub()

            input.simulate('keyDown', {charCode:8, preventDefault:preventDefault})

            sinon.assert.notCalled(preventDefault)
        })
    })

    describe('text', () =>
    {
        it('should clear state', () =>
        {
            const wrapper = mount(<CommandInput/>)

            wrapper.get(0).state.parts.push('not_removed')
            wrapper.get(0).state.text = 'state'

            wrapper.get(0).clear()

            wrapper.get(0).state.parts.should.be.empty
            wrapper.get(0).state.text.should.be.empty
        })

        it('should clear state when button clicked', () =>
        {
            const wrapper = mount(<Provider store={store}><ConnectedCommandInput serialport={serialport.object}/></Provider>)

            const clear = wrapper.find('#command-clear')
            const commandInput = wrapper.find('CommandInput')

            commandInput.get(0).state.parts.push('not_removed')
            commandInput.get(0).state.text = 'state'

            clear.simulate('click')

            commandInput.get(0).state.parts.should.be.empty
            commandInput.get(0).state.text.should.be.empty
        })
    })
})