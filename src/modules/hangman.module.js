import WORDS from '../words/words';

//ACTION TYPES
const ADD_CORRECT_GUESS = "ADD_CORRECT_GUESS";
const ADD_INCORRECT_GUESS = "ADD_INCORRECT_GUESS";
const SET_CURRENT_GUESSED_LETTER = "SET_CURRENT_GUESSED_LETTER";
const INITIALIZE_CURRENT_PROGRESS = "INITIALIZE_CURRENT_PROGRESS";
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

export const initializeCurrentProgress = () => ({
  type: INITIALIZE_CURRENT_PROGRESS,
});

export const resetGame = () => ({
  type: RESET_GAME,
});


//INITIAL STATE
const initialState = {
  puzzle: WORDS[Math.floor(Math.random()*WORDS.length)],
  currentProgress: '',
  lettersGuessedCorrectly: [],
  lettersGuessedIncorrectly: [],
  guessesRemaining: 6,
  currentGuessedLetter: '',
}


//REDUCER
const reducer = (prevState = initialState, action) => {
  let newState = {...prevState};

  switch (action.type) {
    case ADD_CORRECT_GUESS:
      newState.lettersGuessedCorrectly = [...newState.lettersGuessedCorrectly, action.letter];
      newState.currentProgress = updateCurrentProgressDisplay(newState.puzzle, newState.lettersGuessedCorrectly);
      return newState;
    case ADD_INCORRECT_GUESS:
      newState.lettersGuessedIncorrectly = [...newState.lettersGuessedIncorrectly, action.letter];
      newState.guessesRemaining = prevState.guessesRemaining - 1;
      return newState;
    case SET_CURRENT_GUESSED_LETTER:
      newState.currentGuessedLetter = action.letter;
      return newState;
    case INITIALIZE_CURRENT_PROGRESS:
      newState.currentProgress = updateCurrentProgressDisplay(newState.puzzle);
      return newState;
    case RESET_GAME:
      newState = {...initialState, puzzle: WORDS[Math.floor(Math.random()*WORDS.length)]};
      newState.currentProgress = updateCurrentProgressDisplay(newState.puzzle);
      return newState;
    default:
      return prevState;
  }
}

function updateCurrentProgressDisplay(puzzle, lettersGuessedCorrectly = []) {
  return puzzle.split('').map(letter => {
    return lettersGuessedCorrectly.includes(letter) ? letter : '_';
  }).join(' ');
}

export default reducer;