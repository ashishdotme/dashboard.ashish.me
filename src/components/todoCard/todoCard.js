import dayjs from 'dayjs'

const TodoCard = ({ item }) => {
  return (
    <div className="list-item">
      <div className="list-item-content">
        <div className="list-item-title is-flex is-justify-content-space-between">
          <span>{item.content}</span>
          <span className="has-text-weight-normal has-text-grey">
            {' '}
            Completed on&nbsp;
            {item.completedDate && dayjs(item.completedDate).format('DD/MM/YYYY')}
          </span>
        </div>
        <div className="list-item-description">{dayjs(item.dueDate).format('DD/MM/YYYY')} </div>
      </div>
    </div>
  )
}

export default TodoCard
