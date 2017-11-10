import React from "react";

export default class Question extends React.Component {
  checkAnswer = ( e ) => {
    if ( this.input.value === this.props.answer ) {
      this.props.goToNextStep();
      this.props.changeView();
    }

    e.preventDefault();
    return false;
  }

  renderQuestion = () => {
    let text = this.props.question;
    if ( this.props.debug ) {
      text += ` (Odpowiedź to „${ this.props.answer }”)`;
    }

    return text;
  }

  renderInput = () => {
    let defaultValue = "";

    if ( this.props.debug ) {
      defaultValue = this.props.answer;
    }

    return (
      <input type="text" ref={ ( el ) => { this.input = el; } } defaultValue={ defaultValue } />
    );
  }

  render() {
    return (
      <form onSubmit={ this.checkAnswer }>
        <p>{ this.renderQuestion() }</p>
        { this.renderInput() }
        <button type="submit">Answer</button>
      </form>
    );
  }
}
