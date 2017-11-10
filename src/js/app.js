import React from "react";
import ReactDOM from "react-dom";
import Scanner from "./Scanner/";
import Question from "./Question/";
import Coupon from "./Coupon/";
import Shit from "./Shit/";
import "./main.sass";

const debug = false;
const steps = [
  {
    id: 1,
    desc: "gdzie zło się dzieje",
    question: "Ile jest portretów na 2 piętrze?",
    answer: "12",
  }, {
    id: 2,
    desc: "gdzie nigdy nie zachodzi słońce",
    question: "Dokąd tupta nocą jeż?",
    answer: "Do monopolowego",
  },
];

try {
  JSON.parse( localStorage.getItem( "usedAnsweres" ) ).forEach( ( usedId ) => {
    steps.find( ( { id } ) => id === usedId ).answered = true;
  } );
} catch ( e ) {
  if ( e.message !== "Cannot read property 'forEach' of null" ) {
    console.error( e );
  }
}

const getRandomEl = arr => arr[ Math.floor( Math.random() * arr.length ) ];

class App extends React.Component {
  constructor() {
    super();
    const availableAnswers = steps.filter( ( { answered } ) => !answered );

    const currentStep = steps.find( ( { id } ) => id === +localStorage.getItem( "nextStep" ) ) || getRandomEl( availableAnswers );

    this.state = {
      debug: window.location.hash === "#tusiepacz" || debug,
      currentStep,
      view: "scan",
      questionCount: +localStorage.getItem( "questionsOK" ),
    };
  }

  goToNextStep = ( isValid ) => {
    steps.find( ( { id } ) => id === this.state.currentStep.id ).answered = true;

    const availableAnswers = steps.filter( ( { answered } ) => !answered );

    localStorage.setItem( "usedAnsweres", JSON.stringify( steps.filter( ( { answered } ) => answered ).map( ( ( { id } ) => id ) ) ) );

    const newStep = getRandomEl( availableAnswers );

    if ( newStep ) {
      localStorage.setItem( "nextStep", newStep.id );
    } else {
      localStorage.setItem( "nextStep", -1 );
    }

    const newCount = isValid ? this.state.questionCount + 1 : this.state.questionCount;
    localStorage.setItem( "questionsOK", newCount );

    this.setState( {
      currentStep: newStep,
      questionCount: newCount,
    } );
  }

  changeView = () => {
    this.setState( {
      view: ( this.state.view === "scan" ) ? "question" : "scan",
    } );
  }

  render() {
    if ( this.state.questionCount >= 2 ) {
      return (
        <Coupon
          debug={ this.state.debug }
        />
      );
    }

    const availableAnswers = steps.filter( ( { answered } ) => !answered );
    if ( availableAnswers.length <= 0 ) {
      return (
        <Shit
          debug={ this.state.debug }
        />
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
    }

    if ( this.state.view === "question" ) {
      return (
        <Question
          debug={ this.state.debug }
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
