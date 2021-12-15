import * as types from "./actionType";
import axios from "axios";

const getTimetables = (timetables) => ({
  type: types.GET_TIMETABLES,
  payload: timetables,
});

const getTimetable = (timetable) => ({
  type: types.GET_ONE_TIMETABLE,
  payload: timetable,
});

const timetableDeleted = () => ({
  type: types.DELETE_TIMETABLES,
});

const timetableAdded = () => ({
  type: types.ADD_TIMETABLES,
});

const timetableUpdated = () => ({
  type: types.UPDATE_TIMETABLES,
});

export const loadTimetables = () => {
  return function (dispatch) {
    axios
      .get("https://api.ncirl.me/timetables")
      .then((res) => {
        dispatch(getTimetables(res.data));
      })
      .catch((e) => console.log(e));
  };
};

export const deleteTimetable = (id) => {
  return function (dispatch) {
    axios
      .delete("https://api.ncirl.me/timetables/" + id)
      .then((res) => {
        dispatch(timetableDeleted());
        dispatch(loadTimetables());
      })
      .catch((e) => console.log(e));
  };
};

export const addTimetable = (a) => {
  return function (dispatch) {
    axios
      .post("https://api.ncirl.me/timetables", a)
      .then((res) => {
        dispatch(timetableAdded());
        dispatch(loadTimetables());
      })
      .catch((e) => console.log(e));
  };
};

export const getOneTimetable = (id) => {
  return function (dispatch) {
    axios
      .get("https://api.ncirl.me/timetables/" + id)
      .then((res) => {
        dispatch(getTimetable(res.data));
      })
      .catch((e) => console.log(e));
  };
};

export const updateTimetable = (id, a) => {
  return function (dispatch) {
    axios
      .put("https://api.ncirl.me/timetables/" + id, a)
      .then((res) => {
        dispatch(timetableUpdated());
        dispatch(loadTimetables());
      })
      .catch((e) => console.log(e));
  };
};
