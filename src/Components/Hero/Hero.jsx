import React from 'react'
import './Hero.css'
import hero_page from '../Assets/Hero_page.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-img">
        <img src={hero_page} alt="" />
      </div>
    </div>
  )
}

export default Hero
