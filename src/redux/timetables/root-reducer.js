import { combineReducers } from "redux";
import timetableReducers from "./reducer";

const rootReducer = combineReducers({
  data: timetableReducers,
});

export default rootReducer;
