import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MutableRefObject, useMemo, useRef } from 'react'
import { useParams } from 'react-router'
import 'react-big-calendar/lib/sass/styles.scss'
import { addWeeks, format, getDay, parse, set, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { fetchTodos, selectAllTodos } from '../../slices/todosSlice'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
})

const Todo = () => {
  const dispatch = useDispatch()
  const events = useSelector(selectAllTodos)
  console.log(events)
  const status = useSelector((state) => state.todos.status)
  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchTodos())
    }
  }, [dispatch, status])
  const today = useMemo(() => new Date(), [])
  const [maxHour, setMaxHour] = useState(20)
  const lectureEvents = events.map((item) => {
    const session = {}
    session.start = new Date(item.start)
    session.end = new Date(item.end)
    session.title = item.name
    session.type = item.type
    return session
  })
  return (
    <div className="container custom-container">
      <div className="content pt-4">
        <div className="title is-size-2">About MSc Cloud Computing</div>
        <div className="subtitle">National College of Ireland</div>
        <hr />
        {lectureEvents.length > 0 && (
          <Calendar
            localizer={localizer}
            events={lectureEvents}
            min={set(today, { hours: 8, minutes: 0 })}
            max={set(today, { hours: maxHour, minutes: 0 })}
            defaultView="work_week"
            views={['work_week']}
            dayLayoutAlgorithm="no-overlap"
          />
        )}
        <hr />
      </div>
    </div>
  )
}

export default Todo
