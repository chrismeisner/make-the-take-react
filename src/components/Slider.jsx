// File: src/components/Slider.jsx

import React, { useState, useRef, useLayoutEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EmojiBurst from './EmojiBurst';

const Slider = ({ value, onChange }) => {
  const [bursts, setBursts] = useState([]);
  const sliderRef = useRef(null);

  // Track the slider's width so we can place the emoji horizontally
  const [sliderWidth, setSliderWidth] = useState(0);

  useLayoutEffect(() => {
	const measureSlider = () => {
	  if (sliderRef.current) {
		setSliderWidth(sliderRef.current.getBoundingClientRect().width);
	  }
	};
	measureSlider();
	window.addEventListener('resize', measureSlider);
	return () => window.removeEventListener('resize', measureSlider);
  }, []);

  const handleSliderChange = (e) => {
	const newValue = Number(e.target.value);
	onChange(newValue);

	// 1) Pick which emoji to display based on the slider value
	let chosenEmoji;
	if (newValue <= 25) {
	  chosenEmoji = '🥶';
	} else if (newValue <= 50) {
	  chosenEmoji = '❄️';
	} else if (newValue <= 75) {
	  chosenEmoji = '🔥';
	} else {
	  chosenEmoji = '☄️';
	}

	// 2) Compute how big the emoji should be:
	// At 50%, scale = 1; at 0% or 100%, scale = 3
	// This grows linearly the farther we get from 50.
	const distanceFromMid = Math.abs(newValue - 50); // range 0..50
	const scaleFactor = 1 + 2 * (distanceFromMid / 50); 
	//  => (distanceFromMid / 50) = fraction 0..1
	//  => multiplied by 2 = 0..2
	//  => plus 1 = 1..3

	// 3) Calculate the slider handle's x-position in pixels
	const max = Number(e.target.max) || 100;
	const ratio = newValue / max;
	const handleX = ratio * sliderWidth;

	// 4) Create and store the new "burst"
	const newBurst = {
	  id: uuidv4(),
	  emoji: chosenEmoji,
	  x: handleX,
	  scale: scaleFactor,
	};

	setBursts((prev) => [...prev, newBurst]);

	// 5) Remove the burst after 1 second (matching the animation duration)
	setTimeout(() => {
	  setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
	}, 1000);
  };

  return (
	<div className="slider-container mt-4">
	  <div className="flex justify-between text-sm font-bold mb-2">
		<span className="text-blue-500">Cold Take</span>
		<span className="text-red-500">Hot Take</span>
	  </div>

	  <div style={{ position: 'relative' }}>
		<input
		  ref={sliderRef}
		  type="range"
		  min="0"
		  max="100"
		  value={value}
		  onChange={handleSliderChange}
		  className="w-full h-2 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-lg appearance-none"
		  style={{ accentColor: 'transparent' }}
		/>

		<div
		  style={{
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: 0,
			pointerEvents: 'none',
		  }}
		>
		  <EmojiBurst bursts={bursts} />
		</div>
	  </div>

	  <p className="mt-2 text-sm font-bold">{`${value}%`}</p>
	</div>
  );
};

export default Slider;
