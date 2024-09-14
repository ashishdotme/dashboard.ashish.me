import * as types from './actionType'
import axios from 'axios'

const getBooks = (books) => ({
  type: types.GET_BOOKS,
  payload: books,
})

const getBook = (book) => ({
  type: types.GET_ONE_BOOK,
  payload: book,
})

const bookDeleted = () => ({
  type: types.DELETE_BOOKS,
})

const bookAdded = () => ({
  type: types.ADD_BOOKS,
})

const bookUpdated = () => ({
  type: types.UPDATE_BOOKS,
})

export const loadBooks = () => {
  return function (dispatch) {
    axios
      .get('https://api.ashish.me/books')
      .then((res) => {
        dispatch(getBooks(res.data))
      })
      .catch((e) => console.log(e))
  }
}

export const deleteBook = (id) => {
  return function (dispatch) {
    axios
      .delete('https://api.ashish.me/books/' + id)
      .then((res) => {
        dispatch(bookDeleted())
        dispatch(loadBooks())
      })
      .catch((e) => console.log(e))
  }
}

export const addBook = (a) => {
  return function (dispatch) {
    axios
      .post('https://api.ashish.me/books', a)
      .then((res) => {
        dispatch(bookAdded())
        dispatch(loadBooks())
      })
      .catch((e) => console.log(e))
  }
}

export const getOneBook = (id) => {
  return function (dispatch) {
    axios
      .get('https://api.ashish.me/books/' + id)
      .then((res) => {
        dispatch(getBook(res.data))
      })
      .catch((e) => console.log(e))
  }
}

export const updateBook = (id, a) => {
  return function (dispatch) {
    axios
      .put('https://api.ashish.me/books/' + id, a)
      .then((res) => {
        dispatch(bookUpdated())
        dispatch(loadBooks())
      })
      .catch((e) => console.log(e))
  }
}
