import React from "react";

export default class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
    };
  }

  checkAnswer = ( e ) => {
    if ( this.input.value.toLowerCase() === this.props.answer.toLowerCase() ) {
      this.props.goToNextStep( true );
      this.props.changeView();
    } else {
      this.setState( {
        error: true,
      } );
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

  renderError = () => {
    if ( this.state.error ) {
      return ( <p className="text-red text-center uppercase mt-3">Niestety nie. Spróbuj ponownie</p> );
    }

    return null;
  }

  render() {
    return (
      <form onSubmit={ this.checkAnswer } className="flex flex-col justify-center h-full">
        <h1 className="mb-4 text-center uppercase">{ this.renderQuestion() }</h1>
        { this.renderInput() }
        { this.renderError() }
        <button className="shadow-md btn" type="submit">Odpowiedz</button>
      </form>
    );
  }
}
