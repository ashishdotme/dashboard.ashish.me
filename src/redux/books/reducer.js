import * as types from './actionType'

const initialState = {
  books: [],
  book: {},
  loading: true,
}

const bookReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      }
    case types.GET_ONE_BOOK:
      return {
        ...state,
        book: action.payload,
        loading: false,
      }
    case types.DELETE_BOOKS:
    case types.ADD_BOOK:
    case types.UPDATE_BOOKS:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default bookReducers
