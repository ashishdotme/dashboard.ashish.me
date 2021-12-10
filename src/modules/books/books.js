import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchBooks, selectAllBooks } from '../../slices/booksSlice'
import ReactPlayer from 'react-player/lazy'

const BooksGrid = ({ items }) => {
  return (
    <div className="columns is-mobile is-multiline is-centered">
      {items.map((item, index) => {
        return (
          <div key={index} className="column is-narrow">
            {' '}
            <ReactPlayer url={item.url} />{' '}
          </div>
        )
      })}
    </div>
  )
}

const Books = () => {
  const dispatch = useDispatch()
  const books = useSelector(selectAllBooks)
  const status = useSelector((state) => state.books.status)
  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchBooks())
    }
  }, [dispatch, status])
  return (
    <>
      <div className="custom-container">
        <section className="hero is-link">
          <div className="hero-body">
            <p className="title">Books</p>
            <p className="subtitle">find all books here</p>
          </div>
        </section>
        <div className="section has-background-light p-5">
          <BooksGrid items={books} />
        </div>
      </div>
    </>
  )
}

export default Books
