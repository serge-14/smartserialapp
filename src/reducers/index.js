import { combineReducers } from 'redux'
import logs from './logs'
import ports from './ports'
import connection from './connection'

const serialPortApp = combineReducers({
  logs,
  ports,
  connection
})

export default serialPortApp