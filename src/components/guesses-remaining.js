import React from 'react';

const GuessesRemaining = (props) => (
  <p> Number of incorrect guesses left: {props.guessesRemaining} </p>
);

export default GuessesRemaining;