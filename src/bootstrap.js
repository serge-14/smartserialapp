import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './components/main';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { fetchAllSerialPorts } from './actions'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
  )
)

store.dispatch(fetchAllSerialPorts())

ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById('app'));