import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { resetConnection, clearLogs } from './actions'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import serialport from 'serialport'
import {SerialPortWrapper} from './helpers/serialportwrapper'
import persistState from 'redux-localstorage'

const loggerMiddleware = createLogger()

const enhancer = compose(
  applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
  ),
  persistState()
)

const store = createStore(
    reducer,
    enhancer
)

const serialPortWrapper = new SerialPortWrapper(
  {
    create: (p,o) => new serialport(p, o),
    parser: serialport.parsers.readline('\n'),
    list: (x) => serialport.list(x)
  }, store.dispatch)

store.dispatch(resetConnection())

ReactDOM.render(<Provider store={store}><Main serialport={serialPortWrapper}/></Provider>, document.getElementById('app'));