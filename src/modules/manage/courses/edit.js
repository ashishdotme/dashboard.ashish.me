import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//import { updateAnimal, getOneAnimal } from '../../redux/actions'
import { getCourse, updateCourse, selectCoursesById } from '../../../slices/coursesSlice'

export default function UpdateCourse() {
  const { id: courseIdParam } = useParams()
  let history = useHistory()
  let dispatch = useDispatch()
  const course = useSelector((state) => selectCoursesById(state, courseIdParam))
  const status = useSelector((state) => state.courses.status)

  const [newCourse, setNewCourse] = useState({})

  useEffect(() => {
    dispatch(getCourse(courseIdParam))

    console.log(courseIdParam)
  }, [dispatch, courseIdParam])

  useEffect(() => {
    setNewCourse({ ...course })
  }, [course])

  console.log(newCourse, 'course')
  const { name, type, description, content, professor, teachingAssistant, isActive } = newCourse

  const handleInputChange = (e) => {
    let { name } = e.target
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setNewCourse({ ...newCourse, [name]: value })
  }

  const [errorForm, setErrorForm] = useState(null)

  const handleSubmitCreate = (e) => {
    e.preventDefault()

    if (!name || !type || !description) {
      setErrorForm('Please fill the form')
    } else {
      dispatch(updateCourse(newCourse))
      history.push('/')
    }
  }

  return (
    <>
      <div className={'container'}>
        <form className={'form'} onSubmit={handleSubmitCreate}>
          <fieldset className={'fieldset'}>
            <legend>Course</legend>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label class="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      placeholder="name"
                      value={name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-half">
                <p className="control is-expanded">
                  <label class="label">Select Elective</label>
                  <div className="select">
                    <select name="type" value={type || ''} onChange={handleInputChange}>
                      <option value="">Select</option>
                      <option value="Elective">Elective</option>
                      <option value="Non-Elective">Non-Elective</option>
                    </select>
                  </div>
                </p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <label class="label">Course Description</label>
                <textarea
                  class="textarea"
                  placeholder="Course Description"
                  name="description"
                  value={description || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="columns">
              <div className="column is-half">
                <label className="label">Content</label>
                <textarea
                  class="textarea"
                  placeholder="Course Content"
                  name="content"
                  value={content || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label class="label">Professor</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="professor"
                      placeholder="Course Professor"
                      value={professor || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label class="label">Teaching Assistant</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="teachingAssistant"
                      placeholder="Teaching Assistant"
                      value={teachingAssistant || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-half">
                <label className="checkbox">
                  <input
                    name="isActive"
                    type="checkbox"
                    checked={isActive}
                    onChange={handleInputChange}
                  />
                  &ensp; Is Active
                </label>
              </div>
            </div>

            {errorForm ? <div className={'errorMsg'}>{errorForm}</div> : null}
          </fieldset>

          <div className="field is-grouped">
            <div className="control">
              <button
                className={'button'}
                onClick={() => {
                  history.push('/')
                }}
              >
                Cancel
              </button>
            </div>
            <div className="control">
              <button type="submit" className={'button'}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
