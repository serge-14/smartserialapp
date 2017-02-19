'use strict';

import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react';
import {Grid, FormControl, ButtonToolbar, InputGroup, Button, Navbar, DropdownButton, MenuItem, Panel, Row, ButtonGroup} from 'react-bootstrap';
import {STATUS_CONNECTED, STATUS_DISCONNECTED} from '../reducers/connection';
import { setBaudRate, clearLogs } from '../actions';


class Footer extends Component {

  constructor({dispatch})
  {
    super()

    this.dispatch = dispatch
  }

  connect()
  {
      this.props.serialport.baudRate = this.props.rate;
      this.props.serialport.connect(this.props.selected)
  }

  disconnect()
  {
      this.props.serialport.disconnect()
  }

  setRate(rate)
  {
      this.dispatch(setBaudRate(rate))
  }

  clearAll()
  {
      this.dispatch(clearLogs())
  }

  /*
            <ButtonGroup>
                <Button active>RTS</Button>
                <Button>DTS</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button>Auto Connect</Button>
            </ButtonGroup>
  */

  render() {
    return (
    <Navbar fixedBottom fluid>
        <Navbar.Header>
        <Navbar.Brand>
            Status: {this.props.status}
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Navbar.Form pullRight>
            <ButtonToolbar>
            <ButtonGroup>
                <Button disabled={this.props.selected == null || this.props.status != STATUS_DISCONNECTED} onClick={this.connect.bind(this)}>Connect</Button>
                <Button disabled={this.props.status != STATUS_CONNECTED} onClick={this.disconnect.bind(this)}>Disconnect</Button>
            </ButtonGroup>
             <ButtonGroup>
                <Button onClick={this.clearAll.bind(this)}>Clear</Button>
            </ButtonGroup>
            <DropdownButton title={this.props.rate} id="bg-nested-dropdown">
                <MenuItem onClick={this.setRate.bind(this, 9600)} eventKey="1">9600</MenuItem>
                <MenuItem onClick={this.setRate.bind(this, 115200)} eventKey="2">115200</MenuItem>
            </DropdownButton>
            </ButtonToolbar>
        </Navbar.Form>
        </Navbar.Collapse>
    </Navbar>
    );
  }
}

Footer.propTypes = {
    selected: PropTypes.shape({
        comName: PropTypes.string.isRequired,
        pnpId: PropTypes.string.isRequired
    }),
    status: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  selected: state.connection.selectedPort,
  status: state.connection.status,
  rate: state.connection.baudRate
})

Footer = connect(
  mapStateToProps
)(Footer)

export default Footer