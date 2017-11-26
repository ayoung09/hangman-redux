import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import CurrentProgress from './components/current-progress';
import IncorrectGuesses from './components/incorrect-guesses';
import GuessesRemaining from './components/guesses-remaining';
import SubmitGuessFrom from './components/submit-guess-form';
import { resetGame } from './modules/hangman.module';

const mapStateToProps = state => ({
  puzzle: state.puzzle,
  currentProgress: state.currentProgress,
  lettersGuessedCorrectly: state.lettersGuessedCorrectly,
  lettersGuessedIncorrectly: state.lettersGuessedIncorrectly,
  guessesRemaining: state.guessesRemaining,
});

const mapDispatchToProps = dispatch => ({
  resetGame: () => dispatch(resetGame()),
})

class App extends Component {

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
    // if (this.state.lettersGuessedCorrectly.includes(letter) || this.state.lettersGuessedIncorrectly.includes(letter)) {
    //   alert('you already guessed this')
    // } else {
    //   if (this.state.puzzle.includes(letter)) {
    //     this.setState({ lettersGuessedCorrectly: [...this.state.lettersGuessedCorrectly, letter] })
    //   } else {
    //     if (this.state.guessesRemaining > 1){
    //       this.setState({ lettersGuessedIncorrectly: [...this.state.lettersGuessedIncorrectly, letter], guessesRemaining: this.state.guessesRemaining - 1 })
    //     } else {
    //       alert('YOU LOSE!');
    //       return
    //     }
    //   }
    // }
  }

  _handleRestart(e) {
    // e.preventDefault();
    // this.setState({
    //   ...initialState,
    //   puzzle: WORDS[Math.floor(Math.random()*WORDS.length)],
    // });
  }

  render() {
    const { currentProgress, lettersGuessedCorrectly, lettersGuessedIncorrectly, guessesRemaining, resetGame } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hangman!</h1>
        </header>

        <CurrentProgress progress={this.props.puzzle} />
        <IncorrectGuesses incorrectGuesses={lettersGuessedIncorrectly} />
        <GuessesRemaining guessesRemaining={guessesRemaining} />
        <SubmitGuessFrom onSubmit={this._handleSubmit.bind(this)} />
        
        <p><button onClick={() => resetGame()}>Restart game!</button></p>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);