import * as types from './actionType'

const initialState = {
  todos: [],
  todo: {},
  loading: true,
}

const todoReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      }
    case types.GET_ONE_TODO:
      return {
        ...state,
        todo: action.payload,
        loading: false,
      }
    case types.DELETE_TODOS:
    case types.ADD_TODO:
    case types.UPDATE_TODOS:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default todoReducers
