import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchCourses, selectAllCourses, deleteCourse } from '../../../slices/coursesSlice'

export const convertDate = (date) => {
  const newDate = date.split('-')
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
}

const CoursesTable = () => {
  //Redux Toolkit
  const dispatch = useDispatch()
  const history = useHistory()
  const courses = useSelector(selectAllCourses)
  const status = useSelector((state) => state.courses.status)

  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchCourses())
    }
  }, [dispatch, status])
  return (
    <>
      <button
        className={'button'}
        onClick={() => {
          history.push('/create/course')
        }}
      >
        New Course
      </button>
      <table className="table" cellSpacing="0" data-testid="courses-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {courses ? (
            courses.map((course, idx) => {
              return (
                <TableLine
                  key={course.id}
                  id={course.id}
                  date={course.description}
                  name={course.name}
                  type={course.description}
                  weight={course.type}
                />
              )
            })
          ) : (
            <p>Error</p>
          )}
        </tbody>
      </table>
    </>
  )
}

export const TableLine = ({ id, date, name, type, weight }) => {
  let dispatch = useDispatch()
  let history = useHistory()

  const handleDeleteCourse = (id) => {
    if (window.confirm('Do you want to delete?')) {
      dispatch(deleteCourse(id))
    }
  }

  return (
    <tr key={id} data-testid="table-line">
      <td>{id}</td>
      <td>{name}</td>
      <td>{type}</td>
      <td>{weight}</td>
      <td>
        <button
          onClick={() => {
            history.push(`/course/${id}/edit`)
          }}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            handleDeleteCourse(id)
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default CoursesTable
