import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { httpDelete, httpGet, httpPost, httpPut, httpGetOne, httpGetStats } from '../services/todo'

//Entity adapter
const todoAdapter = createEntityAdapter()

//Endpoints requests
export const fetchTodos = createAsyncThunk('database/fetchTodos', async () => {
  return await httpGet()
})
export const fetchStats = createAsyncThunk('database/fetchStats', async () => {
  return await httpGetStats()
})

export const getTodo = createAsyncThunk('database/getTodo', async (id) => {
  return await httpGetOne(id)
})
export const saveTodo = createAsyncThunk('database/saveTodo', async (todo) => {
  return await httpPost(todo)
})
export const deleteTodo = createAsyncThunk('database/deleteTodo', async (id) => {
  await httpDelete(id)
  return id
})
export const updateTodo = createAsyncThunk('database/updateTodo', async (todo) => {
  return await httpPut(todo.id, todo)
})

//Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: todoAdapter.getInitialState({
    todo: {},
    stats: {},
    status: 'not_loaded',
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchTodos.fulfilled]: (state, { payload }) => {
      todoAdapter.setAll(state, payload)
      state.status = 'ready'
    },
    [fetchStats.fulfilled]: (state, { payload }) => {
      state.stats = payload
      state.status = 'ready'
    },
    [getTodo.fulfilled]: (state, { payload }) => {
      state.todo = payload
      state.status = 'ready'
    },
    [saveTodo.fulfilled]: (state, { payload }) => {
      todoAdapter.addOne(state, payload)
      state.status = 'ready'
    },
    [updateTodo.fulfilled]: (state, { payload }) => {
      state.status = 'ready'
      todoAdapter.upsertOne(state, payload)
    },
    [deleteTodo.pending]: (state) => {
      state.status = 'pending'
    },
    [deleteTodo.fulfilled]: (state, { payload }) => {
      todoAdapter.removeOne(state, payload)
      state.status = 'ready'
    },
    [deleteTodo.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchTodos.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchStats.rejected]: (state) => {
      state.status = 'failed'
    },
    [getTodo.rejected]: (state) => {
      state.status = 'failed'
    },
    [saveTodo.rejected]: (state) => {
      state.status = 'failed'
    },
    [updateTodo.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchStats.pending]: (state) => {
      state.status = 'loading'
    },
    [getTodo.pending]: (state) => {
      state.status = 'loading'
    },
    [saveTodo.pending]: (state) => {
      state.status = 'loading'
    },
    [updateTodo.pending]: (state) => {
      state.status = 'loading'
    },
  },
})

export default todoSlice.reducer
export const activeTodo = (state) => state.todo
export const { selectAll: selectAllTodos, selectById: selectTodosById } = todoAdapter.getSelectors(
  (state) => state.todos,
)
export const selectAllStats = todoAdapter.getSelectors((state) => state.stats)
