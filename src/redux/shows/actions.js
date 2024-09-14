import * as types from './actionType'
import axios from 'axios'

const getShows = (shows) => ({
  type: types.GET_SHOWS,
  payload: shows,
})

const getShow = (show) => ({
  type: types.GET_ONE_SHOW,
  payload: show,
})

const showDeleted = () => ({
  type: types.DELETE_SHOWS,
})

const showAdded = () => ({
  type: types.ADD_SHOWS,
})

const showUpdated = () => ({
  type: types.UPDATE_SHOWS,
})

export const loadShows = () => {
  return function (dispatch) {
    axios
      .get('https://api.ashish.me/shows')
      .then((res) => {
        dispatch(getShows(res.data))
      })
      .catch((e) => console.log(e))
  }
}

export const deleteShow = (id) => {
  return function (dispatch) {
    axios
      .delete('https://api.ashish.me/shows/' + id)
      .then((res) => {
        dispatch(showDeleted())
        dispatch(loadShows())
      })
      .catch((e) => console.log(e))
  }
}

export const addShow = (a) => {
  return function (dispatch) {
    axios
      .post('https://api.ashish.me/shows', a)
      .then((res) => {
        dispatch(showAdded())
        dispatch(loadShows())
      })
      .catch((e) => console.log(e))
  }
}

export const getOneShow = (id) => {
  return function (dispatch) {
    axios
      .get('https://api.ashish.me/shows/' + id)
      .then((res) => {
        dispatch(getShow(res.data))
      })
      .catch((e) => console.log(e))
  }
}

export const updateShow = (id, a) => {
  return function (dispatch) {
    axios
      .put('https://api.ashish.me/shows/' + id, a)
      .then((res) => {
        dispatch(showUpdated())
        dispatch(loadShows())
      })
      .catch((e) => console.log(e))
  }
}
