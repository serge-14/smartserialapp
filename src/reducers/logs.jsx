export const DIRECTION_IN = 0
export const DIRECTION_OUT = 1

const log = (state, action) => {
  switch (action.type) {
    case 'ADD_LOG':
      return {
        direction: action.direction,
        content: action.content
      }
    default:
      return state
  }
}

const logs = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LOG':
      return [
        ...state,
        log(undefined, action)
      ]
    default:
      return state
  }
}

export default logs