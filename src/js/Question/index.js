import React from "react";

export default class Question extends React.Component {
  checkAnswer = () => {
    this.props.goToNextStep();
    this.props.changeView();
  }

  render() {
    return (
      <div>
        <p>{ this.props.question }</p>
        <button onClick={ this.checkAnswer }>Answer</button>
      </div>
    );
  }
}
