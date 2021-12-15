import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'

import 'react-big-calendar/lib/sass/styles.scss'
import { format, getDay, parse, set, startOfWeek, startOfDay, endOfDay } from 'date-fns'
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
    session.start = startOfDay(new Date(item.eventDate))
    session.end = endOfDay(new Date(item.eventDate))
    session.title = item.event
    session.type = item.category
    session.allDay = true
    return session
  })
  console.log(lectureEvents)
  const eventStyleGetter = (event) => {
    var eventColor = event.resource.eventColor
    var reserved = event.resource.reserved
    var style
    if (!reserved) {
      style = {
        border: `2px solid ${eventColor}`,
        backgroundColor: 'white',
        color: 'black',
        fontSize: '14px',
      }
    } else {
      style = {
        border: `2px solid ${eventColor}`,
        backgroundColor: eventColor,
        color: 'white',
        fontSize: '14px',
      }
    }
    return {
      style: style,
    }
  }
  return (
    <div className="custom-container">
      <section className="main-hero hero is-info">
        <div className="hero-body">
          <p className="title">Courses</p>
          <p className="subtitle">dashboard.ashish.me</p>
        </div>
      </section>
      <section className="section has-background-light p-5">
        {lectureEvents.length > 0 && (
          <div className="box container">
            <Calendar
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100vh' }}
              localizer={localizer}
              events={lectureEvents}
              views={['month']}
              defaultDate={new Date()}
            />
          </div>
        )}
        <hr />
      </section>
    </div>
  )
}

export default Timetable
