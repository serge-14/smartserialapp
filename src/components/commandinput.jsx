'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux'
import { FormControl, InputGroup, Button, Label } from 'react-bootstrap';
import { addLog, updateLogStatus } from '../actions'
import { DIRECTION_OUT, LOG_STATUS_SENT, LOG_STATUS_ERROR } from '../reducers/logs'

class CommandInput extends Component {

    constructor({dispatch}) {
        super()
        
        this.nextId = 0;
        this.dispatch = dispatch
        this.state = {parts: [], text: ''}
    }

    handleKeyPress(event) {
        var key = event.keyCode || event.charCode;

        if(key == 32 && this.state.text.trim().length != 0) {
            this.setState({ 
                parts: this.state.parts.concat([this.state.text]),
                text: ''
            })
            
            event.preventDefault()
        }
        else if(event.charCode == 13) {

            if(this.state.parts.length > 0 || this.state.text != '')
            {
                this.send();
                event.preventDefault()
            }
        }
    }

    send()
    {
        if(this.state.parts.length > 0 || this.state.text != '')
        {
            if(this.state.text.length != 0)
            {
                this.state.parts.push(this.state.text)
            }

            const message = this.state.parts.join(' ') + '?';

            this.dispatch(addLog(++this.nextId, DIRECTION_OUT, message))

            this.props.serialport.write(message, 
                (err) => this.dispatch(updateLogStatus(this.nextId, err == null ? LOG_STATUS_SENT : LOG_STATUS_ERROR)))

            this.setState({ 
                parts: [],
                text: ''
            })
        }
    }

    clear()
    {
        this.setState({ 
                parts: [],
                text: ''
            })
    }

     handleKeySown(event) {
        var key = event.keyCode || event.charCode;

        if( (key == 8 || key == 46) && this.state.text == '' )
        {
            this.state.parts.pop()

            this.setState({ 
                parts: this.state.parts,
                text: ''
            })

            event.preventDefault()
        }
    }

     handleChange(event) {
        this.setState({text: event.target.value});
    }

    render() {
        const groups = this.state.parts.map((part, i) =>
            <InputGroup.Addon key={i}>{part}</InputGroup.Addon>
        );
        return (
            <InputGroup>
                <InputGroup.Addon>Command:</InputGroup.Addon>
                {groups}
                <FormControl type="text" value={this.state.text} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} onKeyDown={this.handleKeySown.bind(this)} />
                <InputGroup.Button>
                    <Button onClick={this.send.bind(this)}>Send</Button>
                    <Button onClick={this.clear.bind(this)}>Clean</Button>
                </InputGroup.Button>
            </InputGroup>
        );
    }
}


CommandInput = connect()(CommandInput)

export default CommandInput