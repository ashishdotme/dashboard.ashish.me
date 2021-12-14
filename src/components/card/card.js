import CustomLink from '../custom-link/CustomLink'

const Card = ({ item }) => {
  return (
    <div className="column is-one-third">
      <CustomLink to={`/course/${item.id}`} colorStart="#1f1f1f" colorHover="#382fe0">
        <div className="card">
          <div className="card-content">
            <div className="title is-5">{item.title}</div>
            <div className="subtitle is-6 mt-3">{item.description}</div>
          </div>
          <footer className="card-footer">
            <div className="card-footer-item"></div>
          </footer>
        </div>
      </CustomLink>
    </div>
  )
}

export default Card
