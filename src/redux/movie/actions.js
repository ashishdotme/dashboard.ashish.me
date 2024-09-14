import * as types from './actionType'
import axios from 'axios'

const getMovies = (movies) => ({
  type: types.GET_MOVIES,
  payload: movies,
})

const getMovie = (movie) => ({
  type: types.GET_ONE_MOVIE,
  payload: movie,
})

const movieDeleted = () => ({
  type: types.DELETE_MOVIES,
})

const movieAdded = () => ({
  type: types.ADD_MOVIES,
})

const movieUpdated = () => ({
  type: types.UPDATE_MOVIES,
})

export const loadMovies = () => {
  return function (dispatch) {
    axios
      .get('https://api.ashish.me/movies')
      .then((res) => {
        dispatch(getMovies(res.data))
      })
      .catch((e) => console.log(e))
  }
}

export const deleteMovie = (id) => {
  return function (dispatch) {
    axios
      .delete('https://api.ashish.me/movies/' + id)
      .then((res) => {
        dispatch(movieDeleted())
        dispatch(loadMovies())
      })
      .catch((e) => console.log(e))
  }
}

export const addMovie = (a) => {
  return function (dispatch) {
    axios
      .post('https://api.ashish.me/movies', a)
      .then((res) => {
        dispatch(movieAdded())
        dispatch(loadMovies())
      })
      .catch((e) => console.log(e))
  }
}

export const getOneMovie = (id) => {
  return function (dispatch) {
    axios
      .get('https://api.ashish.me/movies/' + id)
      .then((res) => {
        dispatch(getMovie(res.data))
      })
      .catch((e) => console.log(e))
  }
}

export const updateMovie = (id, a) => {
  return function (dispatch) {
    axios
      .put('https://api.ashish.me/movies/' + id, a)
      .then((res) => {
        dispatch(movieUpdated())
        dispatch(loadMovies())
      })
      .catch((e) => console.log(e))
  }
}
