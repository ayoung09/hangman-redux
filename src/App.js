import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WORDS from './words/words'

const initialState = {
  currentGuessedLetter: '',
  lettersGuessedCorrectly: [],
  lettersGuessedIncorrectly: [],
  guessesRemaining: 6,
};

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      ...initialState,
      puzzle: WORDS[Math.floor(Math.random()*WORDS.length)]
    }
  }

  _handleChange(event){
    this.setState({currentGuessedLetter: event.target.value});
  }

  _handleSubmit(event){
    if (this.state.lettersGuessedCorrectly.includes(this.state.currentGuessedLetter) || this.state.lettersGuessedIncorrectly.includes(this.state.currentGuessedLetter)) {
      alert('you already guessed this')
    } else {
      if (this.state.puzzle.includes(this.state.currentGuessedLetter)) {
        this.setState({ lettersGuessedCorrectly: [...this.state.lettersGuessedCorrectly, this.state.currentGuessedLetter] })
      } else {
        if (this.state.guessesRemaining > 1){
          this.setState({ lettersGuessedIncorrectly: [...this.state.lettersGuessedIncorrectly, this.state.currentGuessedLetter], guessesRemaining: this.state.guessesRemaining - 1 })
        } else {
          alert('YOU LOSE!');
          return
        }
      }
    }

    event.preventDefault();
    this.refs.letterForm.reset()
  }

  _displayProgress(){
    let output = '';

    this.state.puzzle.split('').map((letter) => {
      if (this.state.lettersGuessedCorrectly.includes(letter)) {
        output += `${letter }`
      } else {
        output += '- '
      }
    });

    let finished = true;

    this.state.puzzle.split('').map( (letter) => {
      if (this.state.lettersGuessedCorrectly.includes(letter) === false) {
        finished = false
      }
    });

    if (finished === true){
      alert('winner!!')
      return;
    };

    return output;
  }

  _handleRestart(e) {
    e.preventDefault();
    this.setState({
      ...initialState,
      puzzle: WORDS[Math.floor(Math.random()*WORDS.length)],
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hangman!</h1>
        </header>

        <p> Current Progress: { this._displayProgress() } </p>
        <p> Incorrect Guesses: { this.state.lettersGuessedIncorrectly } </p>
        <p> Number of Incorrect Guesses Left: { this.state.guessesRemaining } </p>

        <form onSubmit={this._handleSubmit.bind(this)} ref="letterForm">
          <label>
            Enter letter: <input onChange={this._handleChange.bind(this)} type="text" name="currentGuessedLetter" />
          </label>
          <input type="submit" />
        </form>
        <p><button onClick={this._handleRestart.bind(this)}>Restart game!</button></p>

      </div>
    );
  }
}

export default App;