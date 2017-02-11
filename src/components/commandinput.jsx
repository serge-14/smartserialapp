'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux'
import { FormControl, InputGroup, Button, Label } from 'react-bootstrap';
import { addLog } from '../actions'
import { DIRECTION_OUT } from '../reducers/logs'

class CommandInput extends Component {

    constructor({dispatch}) {
        super()
        
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

            if(this.state.parts.length > 0 || this.state.text != '') {
                this.state.parts.push(this.state.text)
                this.dispatch(addLog(DIRECTION_OUT, this.state.parts.join(' ') + '?'))

                this.setState({ 
                    parts: [],
                    text: ''
                })
                event.preventDefault()
            }
        }
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
                    <Button>Send</Button>
                    <Button>Clear</Button>
                </InputGroup.Button>
            </InputGroup>
        );
    }
}


CommandInput = connect()(CommandInput)

export default CommandInput