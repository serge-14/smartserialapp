import { combineReducers } from 'redux'
import logs from './logs'
import serialPorts from './serialports'

const serialPortApp = combineReducers({
  logs,
  serialPorts
})

export default serialPortApp