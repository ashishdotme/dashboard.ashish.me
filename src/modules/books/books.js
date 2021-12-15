import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchBooks, selectAllBooks } from '../../slices/booksSlice'
import BookCard from '../../components/bookCard/bookCard'

const BooksGrid = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        return <BookCard item={item} key={index} />
      })}
    </>
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
        <section className="hero main-hero is-info">
          <div className="hero-body">
            <p className="title">Books</p>
            <p className="subtitle">dashboard.ashish.me</p>
          </div>
        </section>
        <div className="section has-background-light p-5">
          <div className="columns is-multiline">
            <BooksGrid items={books} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Books
