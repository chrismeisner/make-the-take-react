import React from 'react';
import './ToggleSwitch.css'; // Custom styles for the toggle

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
	<div className="toggle-switch">
	  <label className="switch">
		<input
		  type="checkbox"
		  checked={isOn}
		  onChange={handleToggle}
		/>
		<span className="slider round"></span>
	  </label>
	  <span className="toggle-label">{isOn ? 'Will Happen' : 'Won\'t Happen'}</span>
	</div>
  );
};

export default ToggleSwitch;
