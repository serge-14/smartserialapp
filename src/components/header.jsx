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
      return port == null ? "Select" : port.comName + ' (' + port.manufacturer + ')';
  }

  selectPort(port) {
    this.props.dispatch(selectSerialPort(port))
  }

  serialPorts() {
    if(this.props.fetching ) {
        return (
            <Navbar.Collapse className="test">
                <Navbar.Form pullRight>
                    <Button disabled>Loading...</Button>
                </Navbar.Form>
            </Navbar.Collapse>
        )
    }
    else if(!this.props.fetching && this.props.ports.length == 0) {
        if(this.props.selected == null)
        {
            return (
                <Navbar.Collapse className="test">
                    <Navbar.Form pullRight>
                        <Button disabled>Not available</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            )
        }
        else
        {
            return (
                <Navbar.Collapse className="test">
                    <Navbar.Form pullRight>
                        <Button disabled>{this.props.selected.comName} ({this.props.selected.manufacturer})</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            )
        }
    }
    else if(!this.props.fetching && this.props.ports.length > 0) {
        return (
            <Navbar.Collapse className="test">
                <Navbar.Form pullRight>
                    <DropdownButton bsStyle="default" title={this.getActiveSerialPortName(this.props.selected)} id="communicationPort">
                        {this.props.ports.map((port, index) =>
                            <MenuItem key={index} eventKey={index} onClick={this.selectPort.bind(this, port)}>{port.comName} ({port.manufacturer})</MenuItem>
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
            Smart Serial
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        {this.serialPorts()}
    </Navbar>
    );
  }
}

Header.propTypes = {
    fetching: PropTypes.bool.isRequired,
    ports: PropTypes.arrayOf(PropTypes.shape({
        comName: PropTypes.string.isRequired,
        manufacturer: PropTypes.string.isRequired,
        pnpId: PropTypes.string.isRequired
    }).isRequired).isRequired,
    selected: PropTypes.shape({
        comName: PropTypes.string.isRequired,
        pnpId: PropTypes.string.isRequired
    })
}

const mapStateToProps = (state) => ({
    fetching: state.ports.fetching,
    ports: state.ports.data,
    selected: state.connection.selectedPort
})

Header = connect(
  mapStateToProps
)(Header)

export default Header