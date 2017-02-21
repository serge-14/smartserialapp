'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { ListGroup } from 'react-bootstrap';
import Log from './log'

class LogContainer extends Component {

    constructor(props) {
        super(props)

        this.messagesEnd = null
    }

    render() {
        return (
        <ListGroup className="logs">
            {this.props.logs.map((log, index) =>
            <Log
                key={index}
                {...log}
            />
            )}
            <div style={ {float:"left", clear: "both"} } ref={(el) => {this.messagesEnd = el;}}></div>
        </ListGroup>
        )
    }

    scrollToBottom() {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({behavior: "smooth"});
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
}

LogContainer.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.shape({
    direction: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default LogContainer