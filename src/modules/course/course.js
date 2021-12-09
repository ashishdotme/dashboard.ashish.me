import { useEffect, useState } from 'react'
import Grid from '../../components/grid/grid'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchCourses, selectAllCourses } from '../../slices/coursesSlice'

const IndexPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const courses = useSelector(selectAllCourses)
  const status = useSelector((state) => state.courses.status)
  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchCourses())
    }
  }, [dispatch, status])
  const bloggersData = {
    data: [
      { id: 1, title: 'Cloud Architecture', subtitle: 'MSc Cloud Computing' },
      { id: 2, title: 'Cloud Platform Programming', subtitle: 'MSc Cloud Computing' },
      { id: 3, title: 'Cloud DevOpsSec', subtitle: 'MSc Cloud Computing' },
      { id: 4, title: 'Blockchain', subtitle: 'MSc Cloud Computing' },
    ],
  }

  return (
    <div className="custom-container">
      <section className="hero is-link">
        <div className="hero-body">
          <p className="title">Courses</p>
          <p className="subtitle">Find all courses here</p>
        </div>
      </section>
      <section className="section has-background-light p-5">
        <Grid items={courses} />
      </section>
    </div>
  )
}

export default IndexPage
