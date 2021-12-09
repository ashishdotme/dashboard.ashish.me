import * as types from './actionType'

const initialState = {
  shows: [],
  show: {},
  loading: true,
}

const showReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SHOWS:
      return {
        ...state,
        shows: action.payload,
        loading: false,
      }
    case types.GET_ONE_SHOW:
      return {
        ...state,
        show: action.payload,
        loading: false,
      }
    case types.DELETE_SHOWS:
    case types.ADD_SHOW:
    case types.UPDATE_SHOWS:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default showReducers
