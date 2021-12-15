import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchMovies, selectAllMovies } from '../../slices/movieSlice'
import MovieCard from '../../components/movieCard/movieCard'

const MovieGrid = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        return <MovieCard item={item} key={index} />
      })}
    </>
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
        <section className="main-hero hero is-info">
          <div className="hero-body">
            <p className="title">Movies</p>
            <p className="subtitle">dashboard.ashish.me</p>
          </div>
        </section>
        <div className="section has-background-light p-5">
          <div className="columns is-multiline">
            <MovieGrid items={movies} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Movies
