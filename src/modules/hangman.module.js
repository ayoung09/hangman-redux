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

export const SET_CURRENT_GUESSED_LETTER = letter => ({
  type: SET_CURRENT_GUESSED_LETTER,
  letter,
});

export const SET_CURRENT_PROGRESS = progressToDisplay => ({
  type: SET_CURRENT_PROGRESS,
  progressToDisplay,
});

//INITIAL STATE
const initialState = {
  currentProgress: '',
  lettersGuessedCorrectly: [],
  lettersGuesedIncorrectly: [],
  guessesRemaining: 6,
  currentGuessedLetter: '',
}

//REDUCER