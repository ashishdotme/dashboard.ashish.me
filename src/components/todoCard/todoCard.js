import dayjs from 'dayjs'
import axios from 'axios'
import { fetchTodos } from '../../slices/todosSlice'
import { useDispatch, useSelector } from 'react-redux'

const TodoCard = ({ item, isAdmin }) => {
  const dispatch = useDispatch()
  return (
    <div className="list-item">
      <div className="list-item-content">
        <div className="list-item-title is-flex is-justify-content-space-between">
          <span>
            <label className="checkbox mr-3">
              {isAdmin && (
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={async () => {
                    if (!item.completed) {
                      await axios.post(
                        `https://systemapi.prod.ashish.me/todos/${item.id}/completed/${item.todoId}`,
                      )
                      dispatch(fetchTodos())
                    }
                  }}
                />
              )}
            </label>
            {item.content ? item.content : item.event}
          </span>
        </div>
        {item.todoId &&
          (item.completedDate ? (
            <div className="list-item-description">
              Completed on&nbsp;
              {dayjs(item.completedDate).format('DD MMM YYYY')}{' '}
            </div>
          ) : (
            <div className="list-item-description">
              Added on&nbsp;
              {dayjs(item.dueDate).format('DD MMM YYYY')}{' '}
            </div>
          ))}
        {item.eventDate && (
          <div className="list-item-description">
            Added on&nbsp;
            {dayjs(item.eventDate).format('DD MMM')}
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoCard
