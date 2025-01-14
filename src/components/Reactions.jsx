import React, { useState } from 'react';

const Reactions = () => {
  const [reactions, setReactions] = useState({
	agree: 0,
	disagree: 0,
	shocked: 0,
	interesting: 0,
	humorous: 0,
  });

  const handleReaction = (type) => {
	setReactions({ ...reactions, [type]: reactions[type] + 1 });
  };

  return (
	<div className="mt-4 flex justify-around">
	  <button onClick={() => handleReaction('agree')} className="text-xl">👍</button>
	  <button onClick={() => handleReaction('disagree')} className="text-xl">👎</button>
	  <button onClick={() => handleReaction('shocked')} className="text-xl">😲</button>
	  <button onClick={() => handleReaction('interesting')} className="text-xl">🤔</button>
	  <button onClick={() => handleReaction('humorous')} className="text-xl">😂</button>
	</div>
  );
};

export default Reactions;
