import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchTodos, selectAllTodos } from '../../slices/todosSlice'
import TodoCard from '../../components/todoCard/todoCard'
import ReactPaginate from 'react-paginate'

const TodoGrid = ({ items }) => {
  return (
    <>
      {items &&
        items.map((item, index) => {
          return <TodoCard item={item} key={index} />
        })}
    </>
  )
}

const Todos = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectAllTodos)
  let itemsPerPage = 6
  const status = useSelector((state) => state.todos.status)
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
  }
  useEffect(() => {
    dispatch(fetchTodos())
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    setCurrentItems(items.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(items.length / itemsPerPage))
  }, [dispatch, status, itemOffset, itemsPerPage])
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
            <div className="box" id="messages" data-example>
              <h1 className="title is-4 mb-2">Completed Todos</h1>

              <div className="list has-hoverable-list-items has-overflow-ellipsis">
                {items && items.length > 0 && (
                  <>
                    <TodoGrid items={currentItems} />
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
