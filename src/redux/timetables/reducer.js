import * as types from "./actionType";

const initialState = {
  timetables: [],
  timetable: {},
  loading: true,
};

const timetableReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TIMETABLES:
      return {
        ...state,
        timetables: action.payload,
        loading: false,
      };
    case types.GET_ONE_TIMETABLE:
      return {
        ...state,
        timetable: action.payload,
        loading: false,
      };
    case types.DELETE_TIMETABLES:
    case types.ADD_TIMETABLE:
    case types.UPDATE_TIMETABLES:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default timetableReducers;
