import React from 'react';

const Slider = ({ value, onChange }) => {
  return (
	<div className="slider-container mt-4">
	  <div className="flex justify-between text-sm font-bold mb-2">
		<span className="text-blue-500">Cold Take</span>
		<span className="text-red-500">Hot Take</span>
	  </div>
	  <input
		type="range"
		min="0"
		max="100"
		value={value}
		onChange={(e) => onChange(Number(e.target.value))}
		className="w-full h-2 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-lg appearance-none"
		style={{ accentColor: 'transparent' }} // Removes browser default styling
	  />
	  <p className="mt-2 text-sm font-bold">{`${value}%`}</p>
	</div>
  );
};

export default Slider;
