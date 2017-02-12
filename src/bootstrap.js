import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { fetchAllSerialPorts } from './actions'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import serialport from 'serialport'
import {SerialPortWrapper} from './helpers/serialportwrapper'

const loggerMiddleware = createLogger()
const serialPortWrapper = new SerialPortWrapper(serialport)

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
  )
)

//store.dispatch(fetchAllSerialPorts())

ReactDOM.render(<Provider store={store}><Main serialport={serialPortWrapper}/></Provider>, document.getElementById('app'));