import {ADD_LOG, SET_ERROR, UPDATE_LOG_STATUS, CLEAR_LOGS} from '../actions';

export const DIRECTION_IN = 0
export const DIRECTION_OUT = 1
export const DIRECTION_ERROR = 2

export const LOG_STATUS_NONE = 0
export const LOG_STATUS_SENT= 1
export const LOG_STATUS_ERROR = 2

const log = (state, action) => {
  switch (action.type) {
    case ADD_LOG:
      return {
        id: action.id,
        direction: action.direction,
        content: action.content,
        status: LOG_STATUS_NONE
      }
    case SET_ERROR:
      return {
        direction: DIRECTION_ERROR,
        content: action.error,
        status: LOG_STATUS_NONE
      }
    case UPDATE_LOG_STATUS:
      return Object.assign({}, state, {
                status: state.id == action.id ? action.status : state.status
            })
    default:
      return state
  }
}

const logs = (state = [], action) => {
  switch (action.type) {
    case ADD_LOG:
      return [
        ...state,
        log(undefined, action)
      ]
    case SET_ERROR:
      return [
        ...state,
        log(undefined, action)
      ]
    case CLEAR_LOGS:
      return []
    case UPDATE_LOG_STATUS:
      return state.map(x => log(x, action))
    default:
      return state
  }
}

export default logs