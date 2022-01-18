import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchShows, selectAllShows } from '../../slices/showsSlice'
import ShowCard from '../../components/showCard/showCard'
import FilterComponent from '../../components/common/filterComponent'
import DatePicker from 'react-datepicker'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

import 'react-datepicker/dist/react-datepicker.css'
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
  const [newShow, setNewShow] = useState({
    title: '',
    date: '',
    startDate: '',
    endDate: '',
    seasonNumber: 1,
    isRandom: false,
  })

  const { title, date, startDate, endDate, seasonNumber, isRandom } = newShow

  const handleInputChange = (e, date = false) => {
    if (!date) {
      let { title } = e.target
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setNewShow({ ...newShow, [title]: value })
    } else {
      setNewShow({ ...newShow, [e.type]: e.date })
    }
  }

  const [errorForm, setErrorForm] = useState(null)
  const handleSubmitCreate = (e) => {
    e.preventDefault()

    if (!title) {
      setErrorForm('Title cannot be blank')
    } else {
      axios.post('https://importerapi.prod.ashish.me/shows', newShow, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setErrorForm(null)
    }
  }
  const { user } = useAuth0()
  let isAdmin = false
  if (user && user['https://ncirl.me/role']) {
    const roles = user['https://ncirl.me/role']
    const isAdminRolePresent = roles.find((x) => x === 'Admin')
    isAdmin = isAdminRolePresent ? true : false
  }
  return (
    <>
      <div className="custom-container">
        <section className="main-hero hero is-info">
          <div className="hero-body">
            <p className="title">Shows</p>
            <p className="subtitle">dashboard.ashish.me</p>
          </div>
        </section>
        <div className="section has-background-light p-5">
          {isAdmin && (
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
                      <div className="mr-3">
                        <input
                          className="input is-fullwidth"
                          type="number"
                          title="seasonNumber"
                          placeholder="Enter season number"
                          value={seasonNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      {!newShow.isRandom && (
                        <div className="mr-3">
                          <DatePicker
                            placeholderText="Enter date"
                            className="input"
                            selected={date}
                            onChange={(date) => handleInputChange({ type: 'date', date }, true)}
                          />
                        </div>
                      )}
                      {newShow.isRandom && (
                        <div className="mr-3">
                          <DatePicker
                            placeholderText="Enter start date"
                            className="input"
                            selected={startDate}
                            onChange={(date) =>
                              handleInputChange({ type: 'startDate', date }, true)
                            }
                          />
                        </div>
                      )}
                      {newShow.isRandom && (
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
          )}
          <div className="columns is-multiline">
            <ShowGrid items={shows} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Shows
