import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { setCurrentGuessedLetter, addCorrectGuess, addIncorrectGuess } from '../modules/hangman.module';

const mapStateToProps = state => ({
  puzzle: state.puzzle,
  lettersGuessedCorrectly: state.lettersGuessedCorrectly,
  lettersGuessedIncorrectly: state.lettersGuessedIncorrectly,
});

const mapDispatchToProps = dispatch => ({
  setCurrentGuessLetter: letter => dispatch(setCurrentGuessedLetter(letter)),
  addCorrectGuess: letter => dispatch(addCorrectGuess(letter)),
  addIncorrectGuess: letter => dispatch(addIncorrectGuess(letter)),
});

class SubmitGuessForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
          currentGuessedLetter: '',
      };
      console.log('props: ', this.props);
      console.log('state: ', store.getState())
  }

  _handleChange(event){
    this.setState({currentGuessedLetter: event.target.value});
  }

  _handleSubmitAndClear(event){
    event.preventDefault();

    const { props: { puzzle, addCorrectGuess, addIncorrectGuess }, state: { currentGuessedLetter }} = this;
    
    if (this.userAlreadyGuessedLetter(currentGuessedLetter)) {
      alert('You already guessed this');
    } else if (puzzle.includes(currentGuessedLetter)) {
      addCorrectGuess(currentGuessedLetter);
    } else {
      addIncorrectGuess(currentGuessedLetter);
    }

    this.refs.letterForm.reset();
  }

  userAlreadyGuessedLetter(letter) {
    return this.props.lettersGuessedCorrectly.includes(letter) || this.props.lettersGuessedIncorrectly.includes(letter);
  }

  render () {
      return (
        <form onSubmit={this._handleSubmitAndClear.bind(this)} ref="letterForm">
        <label>
          Enter letter: <input onChange={this._handleChange.bind(this)} type="text" name="currentGuessedLetter" />
        </label>
        <input type="submit" />
      </form>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitGuessForm);