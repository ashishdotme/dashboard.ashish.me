import CustomLink from '../custom-link/CustomLink'

const ShowCard = ({ item }) => {
  return (
    <div className="column is-half">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
                  alt="Image"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{item.name}</p>
              <p className="subtitle is-6">
                <b> Admission Year :- </b> {item.year}
              </p>
            </div>
          </div>
          <div className="content">
            <p>
              <small>
                <b>Mobile No:- </b> {item.mobile}
              </small>
              <br />
              <small>
                <b> Course :- </b> {item.course}
              </small>
              <br />
              <small>
                <b> City :- </b> {item.city}
              </small>
              <small>
                <b> Website :- </b> {item.web}
              </small>
              <br />
              <small>
                <b> Linkedin :- </b> {item.linkedin}
              </small>
              <br />
              <small>
                <b> Twitter :- </b> {item.twitter}
              </small>
              <small>
                <b> Youtube :- </b> {item.youtube}
              </small>
              <br />
              <small>
                <b> Instagram :- </b> {item.instagram}
              </small>
              <br />

              <small>
                <b> Github :- </b> {item.github}
              </small>
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item" aria-label="reply">
                <span className="icon is-small">
                  <i className="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" aria-label="retweet">
                <span className="icon is-small">
                  <i className="fas fa-retweet" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" aria-label="like">
                <span className="icon is-small">
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default ShowCard
