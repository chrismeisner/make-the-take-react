import React, { useState, useEffect } from 'react';
import { fetchTakes } from '../services/airtable';
import Slider from './Slider';

const TakeWidget = () => {
  const [takes, setTakes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedOption, setSelectedOption] = useState(null); // null, 'will', or 'wont'

  useEffect(() => {
	const loadTakes = async () => {
	  const data = await fetchTakes();
	  setTakes(data);
	};
	loadTakes();
  }, []);

  const handleSliderChange = (value) => {
	setSliderValue(value);
  };

  const handleNextTake = () => {
	if (currentIndex < takes.length - 1) {
	  setCurrentIndex(currentIndex + 1);
	  setSliderValue(50); // Reset slider
	  setSelectedOption(null); // Reset selection
	} else {
	  alert('No more takes!');
	}
  };

  const handleOptionClick = (option) => {
	setSelectedOption((prev) => (prev === option ? null : option));
  };

  if (takes.length === 0) {
	return <p className="text-center text-gray-500">Loading...</p>;
  }

  const currentTake = takes[currentIndex];
  const isStatusOpen = currentTake.status === 'Open'; // Check if "Status" is "Open"

  return (
	<div className="p-6 border rounded-lg shadow-lg max-w-md mx-auto bg-white text-center">
	  <h2 className="text-xl font-bold mb-2">{`"${currentTake.take}"`}</h2>
	  <p className="text-gray-500 italic mb-4">— {currentTake.author}</p>

	  {/* Conditionally show buttons if "Status" is "Open" */}
	  {isStatusOpen && (
		<div className="flex justify-center gap-4 my-4">
		  <button
			onClick={() => handleOptionClick('wont')}
			className={`px-4 py-2 rounded font-bold transition-colors ${
			  selectedOption === 'wont'
				? 'bg-red-500 text-white'
				: 'bg-gray-200 text-gray-700'
			}`}
		  >
			Won't Happen
		  </button>
		  <button
			onClick={() => handleOptionClick('will')}
			className={`px-4 py-2 rounded font-bold transition-colors ${
			  selectedOption === 'will'
				? 'bg-blue-500 text-white'
				: 'bg-gray-200 text-gray-700'
			}`}
		  >
			Will Happen
		  </button>
		</div>
	  )}

	  <Slider value={sliderValue} onChange={handleSliderChange} />

	  <button
		onClick={handleNextTake}
		className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
	  >
		Next Take
	  </button>
	</div>
  );
};

export default TakeWidget;
