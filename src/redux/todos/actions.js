import * as types from './actionType'
import axios from 'axios'

const getTodos = (todos) => ({
  type: types.GET_TODOS,
  payload: todos,
})

const getTodoStats = (stats) => ({
  type: types.GET_TODO_STATS,
  payload: stats,
})

const getTodo = (todo) => ({
  type: types.GET_ONE_TODO,
  payload: todo,
})

const todoDeleted = () => ({
  type: types.DELETE_TODOS,
})

const todoAdded = () => ({
  type: types.ADD_TODOS,
})

const todoUpdated = () => ({
  type: types.UPDATE_TODOS,
})

export const loadTodos = () => {
  return function (dispatch) {
    axios
      .get('https://systemapi.prod.ashish.me/todos')
      .then((res) => {
        dispatch(getTodos(res.data))
      })
      .catch((e) => console.log(e))
  }
}

export const deleteTodo = (id) => {
  return function (dispatch) {
    axios
      .delete('https://systemapi.prod.ashish.me/todos/' + id)
      .then((res) => {
        dispatch(todoDeleted())
        dispatch(loadTodos())
      })
      .catch((e) => console.log(e))
  }
}

export const addTodo = (a) => {
  return function (dispatch) {
    axios
      .post('https://systemapi.prod.ashish.me/todos', a)
      .then((res) => {
        dispatch(todoAdded())
        dispatch(loadTodos())
      })
      .catch((e) => console.log(e))
  }
}

export const getOneTodo = (id) => {
  return function (dispatch) {
    axios
      .get('https://systemapi.prod.ashish.me/todos/' + id)
      .then((res) => {
        dispatch(getTodo(res.data))
      })
      .catch((e) => console.log(e))
  }
}

export const updateTodo = (id, a) => {
  return function (dispatch) {
    axios
      .put('https://systemapi.prod.ashish.me/todos/' + id, a)
      .then((res) => {
        dispatch(todoUpdated())
        dispatch(loadTodos())
      })
      .catch((e) => console.log(e))
  }
}
