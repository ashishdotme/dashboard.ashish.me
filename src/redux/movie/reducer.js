import * as types from './actionType'

const initialState = {
  movies: [],
  movie: {},
  loading: true,
}

const movieReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      }
    case types.GET_ONE_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      }
    case types.DELETE_MOVIES:
    case types.ADD_MOVIE:
    case types.UPDATE_MOVIES:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default movieReducers
