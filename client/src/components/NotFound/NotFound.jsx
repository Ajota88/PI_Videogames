import React from 'react'
import { Link } from 'react-router-dom'
import "./styles.scss"
const NotFound = () => {
  return (
    <div className='not-found'>
      <h2>Page Not Found</h2>
      <Link to="/HOME">
      <button className='not-found-btn'>BACK HOME</button>
      </Link>
      
    </div>
  )
}

export default NotFound