import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className="custom-container">
        <section className="hero is-link">
          <div className="hero-body">
            <p className="title">Home</p>
            <p className="subtitle"></p>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
