import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchMovies, selectAllMovies } from '../../slices/movieSlice'
import MovieCard from '../../components/movieCard/movieCard'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
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

  const [newMovie, setNewMovie] = useState({
    title: '',
    date: '',
    startDate: '',
    endDate: '',
    isRandom: false,
  })

  const { title, date, startDate, endDate, isRandom } = newMovie

  const handleInputChange = (e, date = false) => {
    if (!date) {
      let { title } = e.target
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setNewMovie({ ...newMovie, [title]: value })
    } else {
      setNewMovie({ ...newMovie, [e.type]: e.date })
    }
  }

  const [errorForm, setErrorForm] = useState(null)
  const handleSubmitCreate = (e) => {
    e.preventDefault()

    if (!title) {
      setErrorForm('Title cannot be blank')
    } else {
      axios.post('https://importerapi.prod.ashish.me/movies', newMovie, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setErrorForm(null)
    }
  }
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
          <form className={'form mb-5'} onSubmit={handleSubmitCreate}>
            <fieldset className={'fieldset'}>
              <div className="columns">
                <div className="column">
                  <div className="field is-grouped has-addons">
                    <div className="control is-expanded ">
                      <input
                        className="input is-fullwidth"
                        type="text"
                        title="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={handleInputChange}
                      />
                    </div>
                    {!newMovie.isRandom && (
                      <div className="mr-3">
                        <DatePicker
                          placeholderText="Enter date"
                          className="input"
                          selected={date}
                          onChange={(date) => handleInputChange({ type: 'date', date }, true)}
                        />
                      </div>
                    )}
                    {newMovie.isRandom && (
                      <div className="mr-3">
                        <DatePicker
                          placeholderText="Enter start date"
                          className="input"
                          selected={startDate}
                          onChange={(date) => handleInputChange({ type: 'startDate', date }, true)}
                        />
                      </div>
                    )}
                    {newMovie.isRandom && (
                      <div className="mr-3">
                        <DatePicker
                          placeholderText="Enter end date"
                          className="input"
                          selected={endDate}
                          onChange={(date) => handleInputChange({ type: 'endDate', date }, true)}
                        />
                      </div>
                    )}
                    <div className="mr-3">
                      <label className="checkbox">
                        <input
                          title="isRandom"
                          type="checkbox"
                          checked={isRandom}
                          onChange={handleInputChange}
                        />
                        &ensp; Generate Random <br></br>date
                      </label>
                    </div>
                    <div className="control">
                      <button type="submit" className={'button'}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {errorForm ? <div className={'info'}>{errorForm}</div> : null}
            </fieldset>
          </form>
          <div className="columns is-multiline">
            <MovieGrid items={movies} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Movies
