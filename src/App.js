import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrentProgress from './components/current-progress';
import IncorrectGuesses from './components/incorrect-guesses';
import GuessesRemaining from './components/guesses-remaining';
import SubmitGuessFrom from './components/submit-guess-form';
import WORDS from './words/words';

const initialState = {
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

  _displayProgress(){
    const output = this.state.puzzle.split('').map(letter => {
      return this.state.lettersGuessedCorrectly.includes(letter) ? letter : '_';
    });
    this.checkForWin(output);
    return output.join(' ');
  }

  checkForWin(output) {
    if (output.join('') === this.state.puzzle) {
      alert('winner!!')
      return;
    };
  }

  _handleSubmit(letter){
    if (this.state.lettersGuessedCorrectly.includes(letter) || this.state.lettersGuessedIncorrectly.includes(letter)) {
      alert('you already guessed this')
    } else {
      if (this.state.puzzle.includes(letter)) {
        this.setState({ lettersGuessedCorrectly: [...this.state.lettersGuessedCorrectly, letter] })
      } else {
        if (this.state.guessesRemaining > 1){
          this.setState({ lettersGuessedIncorrectly: [...this.state.lettersGuessedIncorrectly, letter], guessesRemaining: this.state.guessesRemaining - 1 })
        } else {
          alert('YOU LOSE!');
          return
        }
      }
    }
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

        <CurrentProgress progress={this._displayProgress()} />
        <IncorrectGuesses incorrectGuesses={this.state.lettersGuessedIncorrectly} />
        <GuessesRemaining guessesRemaining={this.state.guessesRemaining} />
        <SubmitGuessFrom onSubmit={this._handleSubmit.bind(this)} />
        
        <p><button onClick={this._handleRestart.bind(this)}>Restart game!</button></p>

      </div>
    );
  }
}

export default App;