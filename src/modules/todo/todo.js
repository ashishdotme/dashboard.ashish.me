import { useEffect, useState, userSelector } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  fetchTodos,
  selectAllTodos,
  saveTodo,
  fetchStats,
  selectAllStats,
} from '../../slices/todosSlice'
import { exportData } from '../../services/todo'
import TodoCard from '../../components/todoCard/todoCard'
import { Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import ReactPaginate from 'react-paginate'
import { useAuth0 } from '@auth0/auth0-react'
import Form from './form'

const TodoGrid = ({ completedTodos, isAdmin }) => {
  return (
    <>
      {completedTodos &&
        completedTodos.map((item, index) => {
          return <TodoCard item={item} key={index} isAdmin={isAdmin} />
        })}
    </>
  )
}

const Todos = () => {
  const dispatch = useDispatch()
  const todos = useSelector(selectAllTodos)
  const chartData = useSelector((state) => state.todos.stats)
  const currentTodos = todos.filter((x) => !x.completedDate)
  const completedTodos = todos.filter((x) => x.completedDate)
  let itemsPerPage = 6
  const status = useSelector((state) => state.todos.status)
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [timeData, setTimeData] = useState({})

  const initChartData = async () => {
    // Permet de recuperer les donnees pour construire le graphique
    const res = await axios.get('http://localhost:8000/todos/stats')
    // TODO: Trouver pourquoi il faut utiliser JSON.parse sur cette reponse specifiquement
  }

  const formatChartData = (initialData) => {
    // Cette fonction mets les donnees du portfolio dans le format que la librairie pour les graphiques en a besoin
    /*
    Exemple de donnees:
    const data = [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
    ]
    */
    console.log(initialData)
    let data1 = []
    let months = [
      'january',
      'februrary',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ]
    months.forEach((date) => {
      const monthwise = initialData.monthWise
      if (monthwise[date]) {
        data1.push(monthwise[date].length)
      } else {
        data1.push(0)
      }
    })
    console.log(months)
    console.log(data1)
    return {
      labels: months,
      datasets: [
        {
          label: 'Time spent in app',
          data: data1,
          backgroundColor: ['lightblue'],
          borderWidth: 4,
        },
      ],
    }
  }

  const chart = () => {
    setTimeData({
      labels: [
        'january',
        'februrary',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
      ],
      datasets: [
        {
          label: 'Time spent in app',
          data: [
            1,
            2,
            3,
            1,
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december',
          ],
          backgroundColor: ['lightblue'],
          borderWidth: 4,
        },
      ],
    })
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % completedTodos.length
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
  }

  const loadCommitHistory = async (event, inputValue) => {
    event.preventDefault()
    if (inputValue !== '') {
      dispatch(
        saveTodo({
          content: inputValue,
        }),
      )
    }
  }

  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchTodos())
      dispatch(fetchStats())
    }
    let formattedData = null
    if (chartData.monthWise) {
      formattedData = formatChartData(chartData)
    }
    setTimeData(formattedData)
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
        <section className="hero is-info">
          <div className="hero-body">
            <p className="title">Welcome Ashish Patel!</p>
            <p className="subtitle">find all todos here</p>
          </div>
        </section>
        <div className="section has-background-light p-5">
          <div className="container">
            {isAdmin && (
              <>
                <Form addTodo={(event, inputValue) => loadCommitHistory(event, inputValue)} />
                <div className="box">
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
                  {timeData && timeData.labels && timeData.labels.length > 0 && (
                    <div className="charts-container">
                      <div className="chart chart--time">
                        <Bar
                          data={timeData}
                          height={200}
                          options={{ maintainAspectRatio: false }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="box" id="messages" data-example>
              <h1 className="title is-4 mb-2"> Todos</h1>

              <div className="list has-hoverable-list-completedTodos has-overflow-ellipsis">
                {currentTodos && currentTodos.length > 0 && (
                  <>
                    <TodoGrid completedTodos={currentTodos} isAdmin={isAdmin} />
                  </>
                )}
              </div>
            </div>
            <div className="box" id="messages" data-example>
              <h1 className="title is-4 mb-2">Completed Todos</h1>

              <div className="list has-hoverable-list-completedTodos has-overflow-ellipsis">
                {completedTodos && completedTodos.length > 0 && (
                  <>
                    <TodoGrid completedTodos={currentItems} />
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
                pageRangeDisplayed={5}
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
        </div>
      </div>
    </>
  )
}

export default Todos
