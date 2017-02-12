export const addLog = (direction, content) => ({
  type: 'ADD_LOG',
  direction,
  content
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
    activePort: port
  }
}

export const UPDATE_CONNECTION_STATUS = 'UPDATE_CONNECTION_STATUS'

export function updateConnectionStatus(status) {
  return {
    type: UPDATE_CONNECTION_STATUS,
    connectionStatus: status
  }
}

export const SET_ERROR = 'SET_ERROR'

export function setError(error) {
  return {
    type: SET_ERROR,
    error: error
  }
}
