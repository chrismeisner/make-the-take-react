// File: src/components/EmojiBurst.jsx

import React from 'react';
import { motion } from 'framer-motion';

const EmojiBurst = ({ bursts }) => {
  return (
	<div
	  className="emoji-burst-container"
	  style={{
		position: 'relative',
		width: '100%',
		height: '100%',
	  }}
	>
	  {bursts.map((burst) => (
		<motion.div
		  key={burst.id}
		  initial={{
			y: 0,
			opacity: 1,
			scale: burst.scale * 0.5, // Start at half of the final scale
		  }}
		  animate={{
			y: -80,
			opacity: 0,
			scale: burst.scale,       // Grow to the final scale
			transition: {
			  duration: 1,
			  ease: 'linear', // single smooth motion
			},
		  }}
		  style={{
			position: 'absolute',
			left: burst.x,
			bottom: 0, // start near the slider track
			transform: 'translateX(-50%)',
			fontSize: '3rem',
			pointerEvents: 'none',
			userSelect: 'none',
		  }}
		>
		  {burst.emoji}
		</motion.div>
	  ))}
	</div>
  );
};

export default EmojiBurst;
