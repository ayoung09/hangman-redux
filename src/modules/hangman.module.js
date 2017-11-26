import WORDS from '../words/words';

//ACTION TYPES
const ADD_CORRECT_GUESS = "ADD_CORRECT_GUESS";
const ADD_INCORRECT_GUESS = "ADD_INCORRECT_GUESS";
const SET_CURRENT_GUESSED_LETTER = "SET_CURRENT_GUESSED_LETTER";
const SET_CURRENT_PROGRESS = "SET_CURRENT_PROGRESS";
const RESET_GAME = "RESET_GAME";


//ACTION CREATORS
export const addCorrectGuess = letter => ({
  type: ADD_CORRECT_GUESS,
  letter,
});

export const addIncorrectGuess = letter => ({
  type: ADD_INCORRECT_GUESS,
  letter,
});

export const setCurrentGuessedLetter = letter => ({
  type: SET_CURRENT_GUESSED_LETTER,
  letter,
});

export const setCurrentProgress = progressToDisplay => ({
  type: SET_CURRENT_PROGRESS,
  progressToDisplay,
});

export const resetGame = () => ({
  type: RESET_GAME,
});


//INITIAL STATE
const initialState = {
  puzzle: WORDS[Math.floor(Math.random()*WORDS.length)],
  currentProgress: '',
  lettersGuessedCorrectly: [],
  lettersGuesedIncorrectly: [],
  guessesRemaining: 6,
  currentGuessedLetter: '',
}


//REDUCER
const reducer = (prevState = initialState, action) => {
  let newState = {...prevState};

  switch (action.type) {
    case ADD_CORRECT_GUESS:
      newState.lettersGuesedCorrectly = [...prevState.lettersGuessedCorrectly, action.letter];
      newState.guessesRemaining = prevState.guessesRemaining - 1;
      return newState;
    case ADD_INCORRECT_GUESS:
      newState.lettersGuesedIncorrectly = [...prevState.lettersGuesedIncorrectly, action.letter];
      newState.guessesRemaining = prevState.guessesRemaining - 1;
      return newState;
    case SET_CURRENT_GUESSED_LETTER:
      newState.currentGuessedLetter = action.letter;
      return newState;
    case SET_CURRENT_PROGRESS:
      newState.currentProgress = action.progressToDisplay;
      return newState;
    case RESET_GAME:
      newState = {...initialState, puzzle: WORDS[Math.floor(Math.random()*WORDS.length)]};
      return newState;
    default:
      return prevState;
  }
}

export default reducer;