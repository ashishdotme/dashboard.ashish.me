import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchShows, selectAllShows } from '../../slices/showsSlice'
import ShowCard from '../../components/showCard/showCard'

const ShowGrid = ({ items }) => {
  return (
    <div className="columns is-7 is-multiline">
      {items.map((item, index) => {
        return <ShowCard item={item} key={index} />
      })}
    </div>
  )
}

const Shows = () => {
  const dispatch = useDispatch()
  const shows = useSelector(selectAllShows)
  const status = useSelector((state) => state.shows.status)
  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchShows())
    }
  }, [dispatch, status])
  return (
    <>
      <div className="custom-container">
        <section className="hero is-link">
          <div className="hero-body">
            <p className="title">Shows</p>
            <p className="subtitle">find all shows here</p>
          </div>
        </section>
        <div className="section has-background-light p-5">
          <div classname="columns">
            <div classname="column is-one-third">
              <ShowGrid items={shows} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shows
