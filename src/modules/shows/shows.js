import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchShows, selectAllShows } from '../../slices/showsSlice'
import ShowCard from '../../components/showCard/showCard'
import FilterComponent from '../../components/common/filterComponent'

const ShowGrid = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        return <ShowCard item={item} key={index} />
      })}
    </>
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
        <section className="hero is-info">
          <div className="hero-body">
            <p className="title">Shows</p>
            <p className="subtitle">dashboard.ashish.me</p>
          </div>
        </section>
        <div className="section has-background-light p-5">
          <div className="columns is-multiline">
            <ShowGrid items={shows} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Shows
