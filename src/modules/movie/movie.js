import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchMovies, selectAllMovies } from '../../slices/movieSlice'
import MovieCard from '../../components/movieCard/movieCard'

const MovieGrid = ({ items }) => {
  return (
    <div className="columns is-7 is-multiline">
      {items.map((item, index) => {
        return <MovieCard item={item} key={index} />
      })}
    </div>
  )
}

const Movies = () => {
  const dispatch = useDispatch()
  const movies = useSelector(selectAllMovies)
  const status = useSelector((state) => state.movies.status)
  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchMovies())
    }
  }, [dispatch, status])
  return (
    <>
      <div className="custom-container">
        <section className="hero is-link">
          <div className="hero-body">
            <p className="title">Moviess</p>
            <p className="subtitle">find all movies here</p>
          </div>
        </section>
        <div className="section has-background-light p-5">
          <div className="columns">
            <div className="column is-one-third">
              <MovieGrid items={movies} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Movies
