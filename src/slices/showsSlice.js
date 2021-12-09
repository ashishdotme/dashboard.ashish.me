import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { httpDelete, httpGet, httpPost, httpPut, httpGetOne } from '../services/show'

//Entity adapter
const showAdapter = createEntityAdapter()

//Endpoints requests
export const fetchShows = createAsyncThunk('database/fetchShows', async () => {
  return await httpGet()
})
export const getShow = createAsyncThunk('database/getShow', async (id) => {
  return await httpGetOne(id)
})
export const saveShow = createAsyncThunk('database/saveShow', async (show) => {
  return await httpPost(show)
})
export const deleteShow = createAsyncThunk('database/deleteShow', async (id) => {
  await httpDelete(id)
  return id
})
export const updateShow = createAsyncThunk('database/updateShow', async (show) => {
  return await httpPut(show.id, show)
})

//Slice
const showSlice = createSlice({
  name: 'shows',
  initialState: showAdapter.getInitialState({
    show: {},
    status: 'not_loaded',
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchShows.fulfilled]: (state, { payload }) => {
      showAdapter.setAll(state, payload)
      state.status = 'ready'
    },
    [getShow.fulfilled]: (state, { payload }) => {
      state.show = payload
      state.status = 'ready'
    },
    [saveShow.fulfilled]: (state, { payload }) => {
      showAdapter.addOne(state, payload)
      state.status = 'ready'
    },
    [updateShow.fulfilled]: (state, { payload }) => {
      state.status = 'ready'
      showAdapter.upsertOne(state, payload)
    },
    [deleteShow.pending]: (state) => {
      state.status = 'pending'
    },
    [deleteShow.fulfilled]: (state, { payload }) => {
      showAdapter.removeOne(state, payload)
      state.status = 'ready'
    },
    [deleteShow.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchShows.rejected]: (state) => {
      state.status = 'failed'
    },
    [getShow.rejected]: (state) => {
      state.status = 'failed'
    },
    [saveShow.rejected]: (state) => {
      state.status = 'failed'
    },
    [updateShow.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchShows.pending]: (state) => {
      state.status = 'loading'
    },
    [getShow.pending]: (state) => {
      state.status = 'loading'
    },
    [saveShow.pending]: (state) => {
      state.status = 'loading'
    },
    [updateShow.pending]: (state) => {
      state.status = 'loading'
    },
  },
})

export default showSlice.reducer
export const activeShow = (state) => state.show
export const { selectAll: selectAllShows, selectById: selectShowsById } = showAdapter.getSelectors(
  (state) => state.shows,
)
