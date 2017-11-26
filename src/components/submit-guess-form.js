import React, { Component } from 'react';

class SubmitGuessForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
          currentGuessedLetter: '',
      };
  }

  _handleChange(event){
    this.setState({currentGuessedLetter: event.target.value});
  }

  _handleSubmitAndClear(event){
    event.preventDefault();
    this.props.onSubmit(this.state.currentGuessedLetter);
    this.refs.letterForm.reset();
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

export default SubmitGuessForm;