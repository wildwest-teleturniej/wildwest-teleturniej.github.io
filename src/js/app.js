import React from "react";
import ReactDOM from "react-dom";
import Scanner from "./Scanner/";
import Question from "./Question/";

const steps = [
  {
    id: 1,
    desc: "gdzie zło się dzieje",
    question: "Ile jest portretów na 2 piętrze?",
  }, {
    id: 2,
    desc: "gdzie nigdy nie zachodzi słońce",
    question: "Dokąd tupta nocą jeż?",
  },
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      debug: true,
      currentStep: steps[ Math.floor( Math.random() * steps.length ) ],
      view: "scan",
      questionCount: 0,
    };
  }

  goToNextStep = () => {
    this.setState( {
      currentStep: steps[ ( this.state.currentStep.id === 1 ) ? 1 : 0 ],
      questionCount: this.state.questionCount + 1,
    } );
  }

  changeView = () => {
    this.setState( {
      view: ( this.state.view === "scan" ) ? "answer" : "scan",
    } );
  }

  render() {
    if ( this.state.questionCount >= 2 ) {
      return (
        <p>Hej udało ci się! trzymaj tu zniżkę na żarcie w naszym teleturnieju!</p>
      );
    }

    if ( this.state.view === "scan" ) {
      return (
        <Scanner
          debug={ this.state.debug }
          currentStep={ this.state.currentStep }
          changeView={ this.changeView }
        />
      );
    } else if ( this.state.view === "answer" ) {
      return (
        <Question
          question={ this.state.currentStep.question }
          answer={ this.state.currentStep.answer }
          changeView={ this.changeView }
          goToNextStep={ this.goToNextStep }
        />
      );
    }

    return null;
  }
}

ReactDOM.render( <App />, document.getElementById( "app" ) );
