import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import CurrentProgress from './components/current-progress';
import IncorrectGuesses from './components/incorrect-guesses';
import GuessesRemaining from './components/guesses-remaining';
import SubmitGuessFrom from './components/submit-guess-form';
import { resetGame, initializeCurrentProgress } from './modules/hangman.module';

const mapStateToProps = state => ({
  puzzle: state.puzzle,
  currentProgress: state.currentProgress,
  lettersGuessedIncorrectly: state.lettersGuessedIncorrectly,
  guessesRemaining: state.guessesRemaining,
});

const mapDispatchToProps = dispatch => ({
  initializeCurrentProgress: () => dispatch(initializeCurrentProgress()),
  resetGame: () => dispatch(resetGame()),
})

class App extends Component {

  componentDidMount() {
    this.props.initializeCurrentProgress();
  }

  componentWillUpdate(nextProps) {
    this.checkForWin(nextProps.currentProgress.split(' ').join(''));
    if (nextProps.guessesRemaining === 0) {
      alert('YOU LOSE!')
    }
  }

  checkForWin(currentProgress) {
    if (currentProgress === this.props.puzzle) {
      alert('WINNER!!')
      return;
    };
  }

  render() {
    const { currentProgress, lettersGuessedIncorrectly, guessesRemaining, resetGame } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hangman!</h1>
        </header>

        <CurrentProgress progress={currentProgress} />
        <IncorrectGuesses incorrectGuesses={lettersGuessedIncorrectly} />
        <GuessesRemaining guessesRemaining={guessesRemaining} />
        <SubmitGuessFrom />
        
        <p><button onClick={() => resetGame()}>Restart game!</button></p>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);