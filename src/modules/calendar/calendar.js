import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'

import 'react-big-calendar/lib/sass/styles.scss'
import { format, getDay, parse, set, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { fetchTimetables, selectAllTimetables } from '../../slices/timetablesSlice'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
})

const Timetable = () => {
  const dispatch = useDispatch()
  const events = useSelector(selectAllTimetables)
  console.log(events)
  const status = useSelector((state) => state.timetables.status)
  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchTimetables())
    }
  }, [dispatch, status])
  const today = useMemo(() => new Date(), [])
  const [maxHour, setMaxHour] = useState(20)
  const lectureEvents = events.map((item) => {
    const session = {}
    session.start = new Date(item.eventDate)
    session.end = new Date(item.eventDate)
    session.title = item.name
    session.type = item.type
    return session
  })
  return (
    <div className="container has-background-light custom-container">
      <div className="content pt-4 pl-5">
        <div className="title is-size-2">Timetable</div>
        <div className="subtitle">MSc Cloud Computing</div>
        <hr />
        {lectureEvents.length > 0 && (
          <Calendar
            style={{ height: '100vh' }}
            localizer={localizer}
            events={lectureEvents}
            views={['month']}
            defaultDate={new Date()}
          />
        )}
        <hr />
      </div>
    </div>
  )
}

export default Timetable
