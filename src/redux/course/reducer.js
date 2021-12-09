import * as types from './actionType'

const initialState = {
  courses: [],
  course: {},
  loading: true,
}

const courseReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      }
    case types.GET_ONE_COURSE:
      return {
        ...state,
        course: action.payload,
        loading: false,
      }
    case types.DELETE_COURSES:
    case types.ADD_COURSE:
    case types.UPDATE_COURSES:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default courseReducers
