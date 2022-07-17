import React from 'react'
import { Link } from 'react-router-dom'
import "./style.scss";
import landingImage from "../../recursos/imagenes/landing_page1.png"
const LandingPage = () => {
  return (
    <div className='landing_page'>
      <img src={landingImage} />
      <Link to={"/HOME"}>
        <h2>WELCOME</h2>
      </Link>
     
    </div>
  )
}

export default LandingPage