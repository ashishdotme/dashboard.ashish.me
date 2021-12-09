import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { httpDelete, httpGet, httpPost, httpPut, httpGetOne } from '../services/book'

//Entity adapter
const bookAdapter = createEntityAdapter()

//Endpoints requests
export const fetchBooks = createAsyncThunk('database/fetchBooks', async () => {
  return await httpGet()
})
export const getBook = createAsyncThunk('database/getBook', async (id) => {
  return await httpGetOne(id)
})
export const saveBook = createAsyncThunk('database/saveBook', async (book) => {
  return await httpPost(book)
})
export const deleteBook = createAsyncThunk('database/deleteBook', async (id) => {
  await httpDelete(id)
  return id
})
export const updateBook = createAsyncThunk('database/updateBook', async (book) => {
  return await httpPut(book.id, book)
})

//Slice
const bookSlice = createSlice({
  name: 'books',
  initialState: bookAdapter.getInitialState({
    book: {},
    status: 'not_loaded',
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchBooks.fulfilled]: (state, { payload }) => {
      bookAdapter.setAll(state, payload)
      state.status = 'ready'
    },
    [getBook.fulfilled]: (state, { payload }) => {
      state.book = payload
      state.status = 'ready'
    },
    [saveBook.fulfilled]: (state, { payload }) => {
      bookAdapter.addOne(state, payload)
      state.status = 'ready'
    },
    [updateBook.fulfilled]: (state, { payload }) => {
      state.status = 'ready'
      bookAdapter.upsertOne(state, payload)
    },
    [deleteBook.pending]: (state) => {
      state.status = 'pending'
    },
    [deleteBook.fulfilled]: (state, { payload }) => {
      bookAdapter.removeOne(state, payload)
      state.status = 'ready'
    },
    [deleteBook.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchBooks.rejected]: (state) => {
      state.status = 'failed'
    },
    [getBook.rejected]: (state) => {
      state.status = 'failed'
    },
    [saveBook.rejected]: (state) => {
      state.status = 'failed'
    },
    [updateBook.rejected]: (state) => {
      state.status = 'failed'
    },
    [fetchBooks.pending]: (state) => {
      state.status = 'loading'
    },
    [getBook.pending]: (state) => {
      state.status = 'loading'
    },
    [saveBook.pending]: (state) => {
      state.status = 'loading'
    },
    [updateBook.pending]: (state) => {
      state.status = 'loading'
    },
  },
})

export default bookSlice.reducer
export const activeBook = (state) => state.book
export const { selectAll: selectAllBooks, selectById: selectBooksById } = bookAdapter.getSelectors(
  (state) => state.books,
)
