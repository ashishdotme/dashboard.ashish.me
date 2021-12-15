import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { httpDelete, httpGet, httpPost, httpPut, httpGetOne } from '../services/timetable'

//Entity adapter
const timetableAdapter = createEntityAdapter()

//Endpoints requests
export const fetchTimetables = createAsyncThunk('database/fetchTimetables', async () => {
  return await httpGet()
})
export const getTimetable = createAsyncThunk('database/getTimetable', async (id) => {
  return await httpGetOne(id)
})
export const saveTimetable = createAsyncThunk('database/saveTimetable', async (timetable) => {
  return await httpPost(timetable)
})
export const deleteTimetable = createAsyncThunk('database/deleteTimetable', async (id) => {
  await httpDelete(id)
  return id
})
export const updateTimetable = createAsyncThunk('database/updateTimetable', async (timetable) => {
  return await httpPut(timetable.id, timetable)
})

//Slice
const timetableSlice = createSlice({
  name: 'timetables',
  initialState: timetableAdapter.getInitialState({
    timetable: {},
    status: 'not_loaded',
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchTimetables.fulfilled]: (state, { payload }) => {
      timetableAdapter.setAll(state, payload)
      state.status = 'ready'
    },
    [getTimetable.fulfilled]: (state, { payload }) => {
      state.timetable = payload
      state.status = 'ready'
    },
    [saveTimetable.fulfilled]: (state, { payload }) => {
      timetableAdapter.addOne(state, payload)
      state.status = 'ready'
    },
    [updateTimetable.fulfilled]: (state, { payload }) => {
      state.status = 'ready'
      timetableAdapter.upsertOne(state, payload)
    },
    [deleteTimetable.pending]: (state) => {
      state.status = 'pending'
    },
    [deleteTimetable.fulfilled]: (state, { payload }) => {
      timetableAdapter.removeOne(state, payload)
      state.status = 'ready'
    },
    [deleteTimetable.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchTimetables.rejected]: (state) => {
      state.status = 'failed'
    },
    [getTimetable.rejected]: (state) => {
      state.status = 'failed'
    },
    [saveTimetable.rejected]: (state) => {
      state.status = 'failed'
    },
    [updateTimetable.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchTimetables.pending]: (state) => {
      state.status = 'loading'
    },
    [getTimetable.pending]: (state) => {
      state.status = 'loading'
    },
    [saveTimetable.pending]: (state) => {
      state.status = 'loading'
    },
    [updateTimetable.pending]: (state) => {
      state.status = 'loading'
    },
  },
})

export default timetableSlice.reducer
export const activeTimetable = (state) => state.timetable
export const { selectAll: selectAllTimetables, selectById: selectTimetablesById } =
  timetableAdapter.getSelectors((state) => state.timetables)
