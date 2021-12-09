import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { httpDelete, httpGet, httpPost, httpPut, httpGetOne } from '../services/movie'

//Entity adapter
const movieAdapter = createEntityAdapter()

//Endpoints requests
export const fetchMovies = createAsyncThunk('database/fetchMovies', async () => {
  return await httpGet()
})
export const getMovie = createAsyncThunk('database/getMovie', async (id) => {
  return await httpGetOne(id)
})
export const saveMovie = createAsyncThunk('database/saveMovie', async (movie) => {
  return await httpPost(movie)
})
export const deleteMovie = createAsyncThunk('database/deleteMovie', async (id) => {
  await httpDelete(id)
  return id
})
export const updateMovie = createAsyncThunk('database/updateMovie', async (movie) => {
  return await httpPut(movie.id, movie)
})

//Slice
const movieSlice = createSlice({
  name: 'movies',
  initialState: movieAdapter.getInitialState({
    movie: {},
    status: 'not_loaded',
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchMovies.fulfilled]: (state, { payload }) => {
      movieAdapter.setAll(state, payload)
      state.status = 'ready'
    },
    [getMovie.fulfilled]: (state, { payload }) => {
      state.movie = payload
      state.status = 'ready'
    },
    [saveMovie.fulfilled]: (state, { payload }) => {
      movieAdapter.addOne(state, payload)
      state.status = 'ready'
    },
    [updateMovie.fulfilled]: (state, { payload }) => {
      state.status = 'ready'
      movieAdapter.upsertOne(state, payload)
    },
    [deleteMovie.pending]: (state) => {
      state.status = 'pending'
    },
    [deleteMovie.fulfilled]: (state, { payload }) => {
      movieAdapter.removeOne(state, payload)
      state.status = 'ready'
    },
    [deleteMovie.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchMovies.rejected]: (state) => {
      state.status = 'failed'
    },
    [getMovie.rejected]: (state) => {
      state.status = 'failed'
    },
    [saveMovie.rejected]: (state) => {
      state.status = 'failed'
    },
    [updateMovie.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchMovies.pending]: (state) => {
      state.status = 'loading'
    },
    [getMovie.pending]: (state) => {
      state.status = 'loading'
    },
    [saveMovie.pending]: (state) => {
      state.status = 'loading'
    },
    [updateMovie.pending]: (state) => {
      state.status = 'loading'
    },
  },
})

export default movieSlice.reducer
export const activeMovie = (state) => state.movie
export const { selectAll: selectAllMovies, selectById: selectMoviesById } =
  movieAdapter.getSelectors((state) => state.movies)
