import CustomLink from '../custom-link/CustomLink'
import * as dayjs from 'dayjs'

const BookCard = ({ item }) => {
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-name">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{item.title}</p>
              </div>
            </div>
            <div className="content">
              {item.description}
              <br />
              <br />
              <b>Completed on: </b> {dayjs(item.completedDate).format('DD MMMM YYYY')}
              <br />
              <b>Genre: </b> {item.genre}
              <br />
              <b>Author: </b> {item.author}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard
