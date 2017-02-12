'use strict';

import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react';
import { Navbar, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import {fetchAllSerialPorts, selectSerialPort} from '../actions';

class Header extends Component {

  constructor(props)
  {
    super(props)
  }

  getActiveSerialPortName(port) {
      return port == null ? "Select" : port.comName;
  }

  selectPort(port) {
    this.props.dispatch(selectSerialPort(port))
  }

  serialPorts() {
    if(this.props.serialPorts.isFetching ) {
        return (
            <Navbar.Collapse className="test">
                <Button disabled>Loading...</Button>
            </Navbar.Collapse>
        )
    }
    else if(!this.props.serialPorts.isFetching && this.props.serialPorts.ports.length == 0) {
        return (
            <Navbar.Collapse className="test">
                <Navbar.Form pullRight>
                    <Button disabled>Not Available</Button>
                </Navbar.Form>
            </Navbar.Collapse>
        )
    }
    else if(!this.props.serialPorts.isFetching && this.props.serialPorts.ports.length > 0) {
        return (
            <Navbar.Collapse className="test">
                <Navbar.Form pullRight>
                    <DropdownButton bsStyle="default" title={this.getActiveSerialPortName(this.props.serialPorts.activePort)} id="communicationPort">
                        {this.props.serialPorts.ports.map((port, index) =>
                            <MenuItem key={index} eventKey={index} onClick={this.selectPort.bind(this, port)} >{port.comName}</MenuItem>
                        )}
                    </DropdownButton>
                </Navbar.Form>
            </Navbar.Collapse>
        )
    }
  }

  render() {
    return (
    <Navbar fixedTop fluid>
        <Navbar.Header>
        <Navbar.Brand>
            Serial Port
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        {this.serialPorts()}
    </Navbar>
    );
  }
}

Header.propTypes = {
  serialPorts: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    ports: PropTypes.arrayOf(PropTypes.shape({
        comName: PropTypes.string.isRequired,
        pnpId: PropTypes.string.isRequired
    }).isRequired).isRequired,
    activePort: PropTypes.shape({
        comName: PropTypes.string.isRequired,
        pnpId: PropTypes.string.isRequired
    })
  }).isRequired
}

const mapStateToProps = (state) => ({
  serialPorts: state.serialPorts
})

Header = connect(
  mapStateToProps
)(Header)

export default Header