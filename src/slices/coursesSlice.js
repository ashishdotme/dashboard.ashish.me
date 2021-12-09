import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { httpDelete, httpGet, httpPost, httpPut, httpGetOne } from '../services/course'

//Entity adapter
const courseAdapter = createEntityAdapter()

//Endpoints requests
export const fetchCourses = createAsyncThunk('database/fetchCourses', async () => {
  return await httpGet()
})
export const getCourse = createAsyncThunk('database/getCourse', async (id) => {
  return await httpGetOne(id)
})
export const saveCourse = createAsyncThunk('database/saveCourse', async (course) => {
  return await httpPost(course)
})
export const deleteCourse = createAsyncThunk('database/deleteCourse', async (id) => {
  await httpDelete(id)
  return id
})
export const updateCourse = createAsyncThunk('database/updateCourse', async (course) => {
  return await httpPut(course.id, course)
})

//Slice
const courseSlice = createSlice({
  name: 'courses',
  initialState: courseAdapter.getInitialState({
    course: {},
    status: 'not_loaded',
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchCourses.fulfilled]: (state, { payload }) => {
      courseAdapter.setAll(state, payload)
      state.status = 'ready'
    },
    [getCourse.fulfilled]: (state, { payload }) => {
      state.course = payload
      state.status = 'ready'
    },
    [saveCourse.fulfilled]: (state, { payload }) => {
      courseAdapter.addOne(state, payload)
      state.status = 'ready'
    },
    [updateCourse.fulfilled]: (state, { payload }) => {
      state.status = 'ready'
      courseAdapter.upsertOne(state, payload)
    },
    [deleteCourse.pending]: (state) => {
      state.status = 'pending'
    },
    [deleteCourse.fulfilled]: (state, { payload }) => {
      courseAdapter.removeOne(state, payload)
      state.status = 'ready'
    },
    [deleteCourse.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchCourses.rejected]: (state) => {
      state.status = 'failed'
    },
    [getCourse.rejected]: (state) => {
      state.status = 'failed'
    },
    [saveCourse.rejected]: (state) => {
      state.status = 'failed'
    },
    [updateCourse.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchCourses.pending]: (state) => {
      state.status = 'loading'
    },
    [getCourse.pending]: (state) => {
      state.status = 'loading'
    },
    [saveCourse.pending]: (state) => {
      state.status = 'loading'
    },
    [updateCourse.pending]: (state) => {
      state.status = 'loading'
    },
  },
})

export default courseSlice.reducer
export const activeCourse = (state) => state.course
export const { selectAll: selectAllCourses, selectById: selectCoursesById } =
  courseAdapter.getSelectors((state) => state.courses)
