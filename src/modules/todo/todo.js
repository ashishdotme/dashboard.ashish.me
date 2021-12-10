import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchTodos, selectAllTodos } from '../../slices/todosSlice'
import TodoCard from '../../components/todoCard/todoCard'

const TodoGrid = ({ items }) => {
  return (
    <div className="columns is-7 is-multiline">
      {items.map((item, index) => {
        return <TodoCard item={item} key={index} />
      })}
    </div>
  )
}

const Todos = () => {
  const dispatch = useDispatch()
  const todos = useSelector(selectAllTodos)
  const status = useSelector((state) => state.todos.status)
  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchTodos())
    }
  }, [dispatch, status])
  return (
    <>
      <div className="custom-container">
        <section className="hero is-link">
          <div className="hero-body">
            <p className="title">Todoss</p>
            <p className="subtitle">find all todos here</p>
          </div>
        </section>
        <div className="section has-background-light p-5">
          <div className="columns">
            <div className="column is-one-third">
              <TodoGrid items={todos} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todos
