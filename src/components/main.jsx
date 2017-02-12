'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux'
import CommandInput from './commandinput';
import Header from './header';
import Footer from './footer';
import Logs from '../containers/logs'
import {Grid, FormControl, ButtonToolbar, InputGroup, Button, Navbar, DropdownButton, MenuItem, Panel, Row, ButtonGroup} from 'react-bootstrap';


class Main extends Component {

  constructor({dispatch})
  {
    super()

    this.dispatch = dispatch
    this.serialport = null
  }

  componentDidMount()
  {
    this.dispatch(this.props.serialport.list())
  }

  render() {
    return (
      <div>
        <Header>
        </Header>
        <Grid fluid className="body">
        <CommandInput className="body">
        </CommandInput>
        <Logs>
        </Logs>
        </Grid>
         <Footer serialport={this.props.serialport} />
      </div>
    );
  }
}

Main = connect()(Main)

export default Main