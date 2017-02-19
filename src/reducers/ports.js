import { combineReducers } from 'redux'
import {
  LIST_SERIAL_PORTS, RECEIVE_SERIAL_PORTS
} from '../actions'

const ports = (state =
    {
        fetching: false,
        data: []
    }, action) => {

    switch (action.type) {
        case LIST_SERIAL_PORTS:
            return Object.assign({}, state, {
                fetching: true
            })
        case RECEIVE_SERIAL_PORTS:
            return Object.assign({}, state, {
                fetching: false,
                data: action.ports
            })
        default:
        return state
    }
}

export default ports