import { combineReducers } from 'redux'

import { SELECT_SERIAL_PORT, UPDATE_CONNECTION_STATUS, SET_BAUD_RATE, RESET_CONNECTION } from '../actions'

export const STATUS_CONNECTED = 'connected'
export const STATUS_CONNECTING = 'connecting'
export const STATUS_DISCONNECTED = 'disconnected'

const connection = (state =
    {
        selectedPort: null,
        status: STATUS_DISCONNECTED,
        baudRate: 9600
    }, action) => 
    {
    switch (action.type) {
        case SELECT_SERIAL_PORT:
            return Object.assign({}, state, {
                selectedPort: action.port
            })
        case UPDATE_CONNECTION_STATUS:
            return Object.assign({}, state, {
                status: action.status
            })
        case RESET_CONNECTION:
            return Object.assign({}, state, {
                status: STATUS_DISCONNECTED
            })
        case SET_BAUD_RATE:
            return Object.assign({}, state, {
                baudRate: action.rate
            })
        default:
        return state
    }
}

export default connection