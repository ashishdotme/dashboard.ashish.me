import { useEffect, useState, userSelector } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTodos,
  selectAllTodos,
  saveTodo,
  fetchStats,
  selectAllStats,
} from '../../slices/todosSlice'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { fetchTimetables, selectAllTimetables } from '../../slices/timetablesSlice'
import { exportData } from '../../services/todo'
import TodoCard from '../../components/todoCard/todoCard'
import { Line, Bar } from 'react-chartjs-2'
import ReactPaginate from 'react-paginate'
import { useAuth0 } from '@auth0/auth0-react'
import Form from './form'

const ItemGrid = ({ items, isAdmin }) => {
  return (
    <>
      {items &&
        items.length > 0 &&
        items.map((item, index) => {
          return <TodoCard item={item} key={index} isAdmin={isAdmin} />
        })}
    </>
  )
}

const Todos = () => {
  const dispatch = useDispatch()
  const todos = useSelector(selectAllTodos)
  const events = useSelector(selectAllTimetables)
  const chartData = useSelector((state) => state.todos.stats)
  console.log(chartData)
  const currentTodos = todos.filter((x) => !x.completedDate)
  const completedTodos = todos.filter((x) => x.completedDate)
  let itemsPerPage = 6
  const status = useSelector((state) => state.todos.status)
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [recommendations, setRecommendations] = useState({ recommendedMovies: [] })

  const formatChartData = (initialData) => {
    let data1 = []
    let months = [
      'January',
      'Februrary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    months.forEach((month) => {
      const monthwise = initialData.monthWise
      if (monthwise[month.toLowerCase()]) {
        data1.push(monthwise[month.toLowerCase()].length)
      } else {
        data1.push(0)
      }
    })
    return {
      labels: months,
      datasets: [
        {
          label: 'Tasks completed',
          data: data1,
          backgroundColor: ['lightblue'],
          borderWidth: 4,
        },
      ],
    }
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % completedTodos.length
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
  }

  const saveTodoHandler = async (event, inputValue) => {
    event.preventDefault()
    if (inputValue !== '') {
      dispatch(
        saveTodo({
          content: inputValue,
        }),
      )
    }
  }

  const getRecommendations = async () => {
    let recommendedMovies = []
    let movie = {}
    const moviesResponse = await axios.get('https://systemapi.prod.ashish.me/movies')
    const movies = moviesResponse.data
    if (movies && movies.length > 0) {
      movie = movies[0]
      recommendedMovies = await axios.get(
        `https://systemapi.prod.ashish.me/movies/recommendations/${movies[0].title}`,
      )
    }
    setRecommendations({ movie, recommendedMovies: recommendedMovies.data })
    console.log({ movie, recommendedMovies: recommendedMovies.data })
  }

  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchTodos())
      dispatch(fetchStats())
      dispatch(fetchTimetables())
    }
    if (recommendations.recommendedMovies && recommendations.recommendedMovies.length == 0) {
      getRecommendations()
    }
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading completedTodos from ${itemOffset} to ${endOffset}`)
    setCurrentItems(completedTodos.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(completedTodos.length / itemsPerPage))
  }, [dispatch, status, itemOffset, itemsPerPage])

  const [inputValue, setInputValue] = useState('')
  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async (event) => {
    //props.addTodo(event, inputValue)
    event.preventDefault()
    exportData({ email: inputValue })
    setInputValue('')
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
        <section className="hero is-info main-hero">
          <div className="hero-body">
            <p className="title">Welcome Ashish Patel!</p>
            <p className="subtitle">dashboard.ashish.me</p>
          </div>
        </section>
        <div className="section has-background-light p-5">
          <div className="container">
            {isAdmin && (
              <Form addTodo={(event, inputValue) => saveTodoHandler(event, inputValue)} />
            )}
            <div className="box" id="messages" data-example>
              <h1 className="title is-4 mb-2"> Todos</h1>

              <div className="list has-hoverable-list-completedTodos has-overflow-ellipsis">
                {currentTodos && currentTodos.length > 0 && (
                  <>
                    <ItemGrid items={currentTodos} isAdmin={isAdmin} />
                  </>
                )}
              </div>
            </div>
            {chartData.monthWise && chartData.monthWise.january.length > 0 && (
              <section className="info-tiles mb-5">
                <div className="tile is-ancestor has-text-centered">
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">{chartData.currentMonth.length}</p>
                      <p className="subtitle has-text-grey-light">tasks completed this month</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">{chartData.previousMonth.length}</p>
                      <p className="subtitle has-text-grey-light">tasks completed previous month</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">{chartData.currentYear.length}</p>
                      <p className="subtitle has-text-grey-light">tasks completed this year</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">{chartData.previousYear.length}</p>
                      <p className="subtitle has-text-grey-light">tasks completed previous year</p>
                    </article>
                  </div>
                </div>
              </section>
            )}
            <div className="box">
              {isAdmin && (
                <form onSubmit={(event) => handleSubmit(event)}>
                  <label className="label is-large">Export excel</label>
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        name="title"
                        type="text"
                        className="input"
                        placeholder="What's your email?"
                        onChange={handleChange}
                        value={inputValue}
                      />
                    </div>
                    <div className="control">
                      <input type="submit" value="Add" className="button is-info" />
                    </div>
                  </div>
                </form>
              )}
              {chartData.monthWise && chartData.monthWise.january.length > 0 && (
                <>
                  <div className="charts-container">
                    <div className="chart chart--time">
                      <Bar
                        data={formatChartData(chartData)}
                        height={200}
                        options={{ maintainAspectRatio: false }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="columns">
              <div className="column">
                <div className="box" id="messages" data-example>
                  <h1 className="title is-4 mb-2">Completed Todos</h1>

                  <div className="list has-hoverable-list-completedTodos has-overflow-ellipsis">
                    {completedTodos && completedTodos.length > 0 && (
                      <>
                        <ItemGrid items={currentItems} />
                      </>
                    )}
                  </div>
                </div>
                <nav
                  className="pagination is-centered mt-5 mb-5"
                  role="navigation"
                  aria-label="pagination"
                >
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageLinkClassName="pagination-link"
                    containerClassName={'pagination-list'}
                    previousLinkClassName={'pagination-next'}
                    nextLinkClassName={'pagination-previous'}
                    disabledClassName={'is-disabled'}
                    activeClassName={'is-current'}
                    activeLinkClassName="is-current"
                    breakClassName="pagination-ellipsis"
                  />
                </nav>
              </div>
              <div className="column">
                <div className="box" id="messages" data-example>
                  <h1 className="title is-4 mb-2">Important dates</h1>

                  <div className="list has-hoverable-list-completedTodos has-overflow-ellipsis">
                    {events && events.length > 0 && (
                      <>
                        <ItemGrid items={events.slice(0, 5)} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {recommendations.recommendedMovies && recommendations.recommendedMovies.length > 0 && (
              <div className="column">
                <div className="box" id="messages" data-example>
                  <h1 className="title is-4 mb-2">
                    Recommended Movies based on last movie you watched "
                    {recommendations.movie && recommendations.movie.title}"
                  </h1>

                  <div className="list has-hoverable-list-completedTodos has-overflow-ellipsis">
                    {recommendations.recommendedMovies &&
                    recommendations.recommendedMovies.length > 0 ? (
                      recommendations.recommendedMovies.slice(1, 6).map((item, index) => {
                        return (
                          <div className="list-item">
                            <div className="list-item-content">
                              <div className="list-item-title is-flex is-justify-content-space-between">
                                {item}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <p>No movies found</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Todos
