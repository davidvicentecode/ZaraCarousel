import React from 'react'
import { useState } from 'react'
import Slide from './Slide'
import '../css/Slider.css'

const Slider = ( {slides, onSlideChange} ) => {
	const maxTranslate = (slides.length - 1) / slides.length * 100

	// Initialize states
	const [index, setIndex] = useState(0)
	const [offset, setOffset] = useState(0)

	const slidesStyle = {
		width: slides.length*100 + 'vw',
		transform: 'translateX(-' + Math.min((index * 100 + offset) / slides.length, maxTranslate) + '%)'
	}

	/* Methods */
	const goNextSlide = () => {
		goToSlide(index + 1)
	}

	const goPreviousSlide = () => {
		goToSlide(index - 1)
	}

	const goToSlide = (index) => {
		setIndex(Math.min(Math.max(index, 0), slides.length - 1))
		setOffset(0)
		onSlideChange(slides[index])
	}

	const swapSlides = (event) => {
		// If mouse clicked
		if (event.buttons === 1) {
			let percentage = event.movementX / window.screen.width * 100
			setOffset(offset - percentage * 3)
		}
	}

	const swapEnd = (event) => {
		if (offset > 10) {
			goNextSlide()
		} else if (offset < -10) {
			goPreviousSlide()
		}

		setOffset(0)
	}


  return (
    <div class="slider" style={{color:slides[index].color}}>
        <div class="slides" style={slidesStyle} onMouseMove={swapSlides} onMouseUp={swapEnd}>
            {slides.map((slide) => {
                return <Slide slide={slide}></Slide>
            })}
        </div>
				
				<div class={`slider-arrow-left ${index === 0 ? "slider-arrow-hide" : ""}`} onClick={goPreviousSlide}>
					{slides[Math.max(index-1, 0)].name}
				</div>
        
				<div class={`slider-arrow-right ${index === slides.length-1 ? "slider-arrow-hide" : ""}`} onClick={goNextSlide}>
					{slides[Math.min(index+1, slides.length-1)].name}
				</div>
    </div>
  )
}

export default Slider