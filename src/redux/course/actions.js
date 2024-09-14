import * as types from './actionType'
import axios from 'axios'

const getCourses = (courses) => ({
  type: types.GET_COURSES,
  payload: courses,
})

const getCourse = (course) => ({
  type: types.GET_ONE_COURSE,
  payload: course,
})

const courseDeleted = () => ({
  type: types.DELETE_COURSES,
})

const courseAdded = () => ({
  type: types.ADD_COURSES,
})

const courseUpdated = () => ({
  type: types.UPDATE_COURSES,
})

export const loadCourses = () => {
  return function (dispatch) {
    axios
      .get('https://api.ashish.me/courses')
      .then((res) => {
        dispatch(getCourses(res.data))
      })
      .catch((e) => console.log(e))
  }
}

export const deleteCourse = (id) => {
  return function (dispatch) {
    axios
      .delete('https://api.ashish.me/courses/' + id)
      .then((res) => {
        dispatch(courseDeleted())
        dispatch(loadCourses())
      })
      .catch((e) => console.log(e))
  }
}

export const addCourse = (a) => {
  return function (dispatch) {
    axios
      .post('https://api.ashish.me/courses', a)
      .then((res) => {
        dispatch(courseAdded())
        dispatch(loadCourses())
      })
      .catch((e) => console.log(e))
  }
}

export const getOneCourse = (id) => {
  return function (dispatch) {
    axios
      .get('https://api.ashish.me/courses/' + id)
      .then((res) => {
        dispatch(getCourse(res.data))
      })
      .catch((e) => console.log(e))
  }
}

export const updateCourse = (id, a) => {
  return function (dispatch) {
    axios
      .put('https://api.ashish.me/courses/' + id, a)
      .then((res) => {
        dispatch(courseUpdated())
        dispatch(loadCourses())
      })
      .catch((e) => console.log(e))
  }
}
