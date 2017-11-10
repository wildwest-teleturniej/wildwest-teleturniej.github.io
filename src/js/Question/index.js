import React from "react";

export default class Question extends React.Component {
  checkAnswer = ( e ) => {
    this.props.goToNextStep( this.input.value === this.props.answer );
    this.props.changeView();

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
      <form onSubmit={ this.checkAnswer } className="flex flex-col justify-center h-full">
        <h1 className="mb-4 text-center uppercase">{ this.renderQuestion() }</h1>
        { this.renderInput() }
        <button className="shadow-md btn" type="submit">Odpowiedz</button>
      </form>
    );
  }
}
