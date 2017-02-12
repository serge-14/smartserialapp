'use strict';

import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react';
import {Grid, FormControl, ButtonToolbar, InputGroup, Button, Navbar, DropdownButton, MenuItem, Panel, Row, ButtonGroup} from 'react-bootstrap';

class Footer extends Component {

  constructor({dispatch})
  {
    super()

    this.dispatch = dispatch
  }

  connect()
  {
      this.dispatch(this.props.serialport.connect(this.props.serialPorts.activePort))
  }

  disconnect()
  {
      this.dispatch(this.props.serialport.disconnect())
  }

  render() {
    return (
    <Navbar fixedBottom fluid>
        <Navbar.Header>
        <Navbar.Brand>
            Status: {this.props.serialPorts.status}
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Navbar.Form pullRight>
            <ButtonToolbar>
            <ButtonGroup>
                <Button onClick={this.connect.bind(this)}>Connect</Button>
                <Button>Disconnect</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button active>RTS</Button>
                <Button>DTS</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button>Auto Connect</Button>
            </ButtonGroup>
            <DropdownButton title="9600" id="bg-nested-dropdown">
                <MenuItem eventKey="1">9600</MenuItem>
                <MenuItem eventKey="2">115200</MenuItem>
            </DropdownButton>
            </ButtonToolbar>
        </Navbar.Form>
        </Navbar.Collapse>
    </Navbar>
    );
  }
}

Footer.propTypes = {
  serialPorts: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    ports: PropTypes.arrayOf(PropTypes.shape({
        comName: PropTypes.string.isRequired,
        pnpId: PropTypes.string.isRequired
    }).isRequired).isRequired,
    activePort: PropTypes.shape({
        comName: PropTypes.string.isRequired,
        pnpId: PropTypes.string.isRequired
    }),
    status: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = (state) => ({
  serialPorts: state.serialPorts
})

Footer = connect(
  mapStateToProps
)(Footer)

export default Footer