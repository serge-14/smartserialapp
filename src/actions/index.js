export const ADD_LOG = 'ADD_LOG'

export const addLog = (id, direction, content) => ({
  type: ADD_LOG,
  id,
  direction,
  content
})

export const UPDATE_LOG_STATUS = 'UPDATE_LOG_STATUS'

export const updateLogStatus = (id, status) => ({
  type: UPDATE_LOG_STATUS,
  id,
  status
})


export const LIST_SERIAL_PORTS = 'LIST_SERIAL_PORTS'

export function listSerialPorts() {
  return {
    type: LIST_SERIAL_PORTS
  }
}


export const RECEIVE_SERIAL_PORTS = 'RECEIVE_SERIAL_PORTS'

export function receiveSerialPorts(ports) {
  return {
    type: RECEIVE_SERIAL_PORTS,
    ports: ports
  }
}

export const SELECT_SERIAL_PORT = 'SELECT_SERIAL_PORT'

export function selectSerialPort(port) {
  return {
    type: SELECT_SERIAL_PORT,
    port: port
  }
}

export const UPDATE_CONNECTION_STATUS = 'UPDATE_CONNECTION_STATUS'

export function updateConnectionStatus(status) {
  return {
    type: UPDATE_CONNECTION_STATUS,
    status: status
  }
}

export const SET_ERROR = 'SET_ERROR'

export function setError(error) {
  return {
    type: SET_ERROR,
    error: error.message
  }
}

export const SET_BAUD_RATE = 'SET_BAUD_RATE'

export function setBaudRate(rate) {
  return {
    type: SET_BAUD_RATE,
    rate: rate
  }
}

export const CLEAR_LOGS = 'CLEAR_LOGS'

export function clearLogs() {
  return {
    type: CLEAR_LOGS
  }
}

export const RESET_CONNECTION = 'RESET_CONNECTION'

export function resetConnection() {
  return {
    type: RESET_CONNECTION
  }
}
