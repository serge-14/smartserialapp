import SerialPort from 'serialport';

export const addLog = (direction, content) => ({
  type: 'ADD_LOG',
  direction,
  content
})

export const LIST_SERIAL_PORTS = 'LIST_SERIAL_PORTS'

function listSerialPorts() {
  return {
    type: LIST_SERIAL_PORTS
  }
}


export const RECEIVE_SERIAL_PORTS = 'RECEIVE_SERIAL_PORTS'

function receiveSerialPorts(ports) {
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

export const CONNECT_TO_SERIAL_PORT = 'CONNECT_TO_SERIAL_PORT'

export function connectToSerialPort(port) {
  return {
    type: CONNECT_TO_SERIAL_PORT,
    portToConnect: port
  }
}

export const DISCONNECT_TO_SERIAL_PORT = 'DISCONNECT_TO_SERIAL_PORT'

export function didconnectFromSerialPort() {
  return {
    type: DISCONNECT_TO_SERIAL_PORT,
  }
}

export const UPDATE_CONNECTION_STATUS = 'UPDATE_CONNECTION_STATUS'

export function updateConnectionStatus(status) {
  return {
    type: UPDATE_CONNECTION_STATUS,
    connectionStatus: status
  }
}

let activePort = null;

export function connect(port) {

  return function (dispatch) {

    dispatch(updateConnectionStatus('connecting'))

    activePort = new SerialPort(port.pnpId, {
      baudRate: 9600
    });

    port.on('open', function() {
      dispatch(updateConnectionStatus('connected'))
    });
    
    port.on('error', function(err) {
      dispatch(updateConnectionStatus('error'))
    })
  }
}

export function disconnect(port) {

  return function (dispatch) {
    dispatch(updateConnectionStatus('disconnected'))

    activePort.close();
    activePort = null;
  }
}


export function fetchAllSerialPorts() {

  return function (dispatch) {

    dispatch(listSerialPorts())

    return new Promise((resolve, reject) => {
        SerialPort.list((err, ports) => {
            if(err !== null) {
                reject(err)
            }
            else {
                dispatch(receiveSerialPorts(ports))
                resolve();
            }
        })
    })
  }
}