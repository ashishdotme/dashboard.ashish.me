import dayjs from 'dayjs'
import axios from 'axios'
import { fetchTodos } from '../../slices/todosSlice'
import { useDispatch, useSelector } from 'react-redux'

const TodoCard = ({ item }) => {
  const dispatch = useDispatch()
  return (
    <div className="list-item">
      <div className="list-item-content">
        <div className="list-item-title is-flex is-justify-content-space-between">
          <span>
            <label className="checkbox mr-3">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={async () => {
                  if (!item.completed) {
                    await axios.post(
                      `https://systemapi.ashish.me/todos/${item.id}/completed/${item.todoId}`,
                    )
                    dispatch(fetchTodos())
                  }
                }}
              />
            </label>
            {item.content}
          </span>
          <span className="has-text-weight-normal has-text-grey">
            {' '}
            {dayjs(item.dueDate).format('DD/MM/YYYY')}
          </span>
        </div>
        {item.completedDate && (
          <div className="list-item-description">
            Completed on&nbsp;
            {dayjs(item.completedDate).format('DD/MM/YYYY')}{' '}
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoCard
