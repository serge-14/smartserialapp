'use strict';

import React, { Component } from 'react';
import CommandInput from './commandinput';
import Footer from './footer';
import Logs from '../containers/logs'
import {Grid, FormControl, ButtonToolbar, InputGroup, Button, Navbar, DropdownButton, MenuItem, Panel, Row, ButtonGroup} from 'react-bootstrap';


export class Main extends Component {

  constructor()
  {
    super()
  }

  render() {
    return (
      <div>
        <Footer>
        </Footer>
        <Grid fluid className="body">
        <CommandInput className="body">
        </CommandInput>
        <Logs>
        </Logs>
        </Grid>
         <Navbar fixedBottom fluid>
          <Navbar.Header>
            <Navbar.Brand>
              Status: Connected
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullRight>
              <ButtonToolbar>
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
      </div>
    );
  }
}