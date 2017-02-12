import { combineReducers } from 'redux'
import {
  LIST_SERIAL_PORTS, RECEIVE_SERIAL_PORTS, SELECT_SERIAL_PORT
} from '../actions'

export const STATUS_CONNECTED = 'connected'
export const STATUS_CONNECTING = 'connecting...'
export const STATUS_DISCONNECTED = 'disconnected'

const serialPorts = (state =
    {
        isFetching: false,
        ports: [],
        activePort: null,
        status: STATUS_DISCONNECTED
    }, action) => {

    switch (action.type) {
        case LIST_SERIAL_PORTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_SERIAL_PORTS:
            return Object.assign({}, state, {
                isFetching: false,
                ports: action.ports
            })
        case SELECT_SERIAL_PORT:
            return Object.assign({}, state, {
                activePort: action.activePort
            })
        default:
        return state
    }
}

export default serialPorts