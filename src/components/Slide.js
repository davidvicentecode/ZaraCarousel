import React from 'react'
import '../css/Slide.css'

const Slide = ({ slide }) => {
  return (
    <div class="slide">
        <img class="slide-image" src={slide.src} alt={slide.name}></img>
    </div>
  )
}

export default Slide