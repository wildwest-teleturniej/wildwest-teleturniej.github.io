import React from "react";
import ReactDOM from "react-dom";
import Scanner from "./Scanner/";
import Question from "./Question/";
import Coupon from "./Coupon/";
import End from "./End/";

import setup from "./setup.json";
import "./main.sass";

const { steps, debug } = setup;

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
      // view: "question",
      questionCount: +localStorage.getItem( "questionsOK" ),
      isEnd: localStorage.getItem( "isEnd" ) === "true",
    };

    if ( this.state.questionCount >= 2 ) {
      this.state.view = "coupon";
    }
  }

  goToNextStep = ( isValid ) => {
    const newCount = isValid ? this.state.questionCount + 1 : this.state.questionCount;
    localStorage.setItem( "questionsOK", newCount );

    if ( newCount >= 2 ) {
      this.setState( {
        view: "coupon",
        questionCount: newCount,
      } );

      localStorage.setItem( "nextStep", -1 );
      return;
    }

    steps.find( ( { id } ) => id === this.state.currentStep.id ).answered = true;

    const availableAnswers = steps.filter( ( { answered } ) => !answered );

    localStorage.setItem( "usedAnsweres", JSON.stringify( steps.filter( ( { answered } ) => answered ).map( ( ( { id } ) => id ) ) ) );

    const newStep = getRandomEl( availableAnswers );

    localStorage.setItem( "nextStep", newStep.id );

    this.setState( {
      currentStep: newStep,
      questionCount: newCount,
    } );

    this.changeView();
  }

  changeView = () => {
    this.setState( {
      view: ( this.state.view === "scan" ) ? "question" : "scan",
    } );
  }

  endThis = () => {
    localStorage.setItem( "isEnd", true );

    this.setState( {
      isEnd: true,
    } );
  }

  render() {
    if ( this.state.isEnd ) {
      return (
        <End
          debug={ this.state.debug }
        />
      );
    }

    if ( this.state.view === "coupon" ) {
      return (
        <Coupon
          debug={ this.state.debug }
          changeView={ this.changeView }
        />
      );
    }

    if ( this.state.view === "scan" ) {
      return (
        <Scanner
          debug={ this.state.debug }
          currentStep={ this.state.currentStep }
          changeView={ this.changeView }
          scanMagic={ this.state.questionCount >= 2 }
          endThis={ this.endThis }
        />
      );
    }

    if ( this.state.view === "question" ) {
      return (
        <Question
          debug={ this.state.debug }
          question={ this.state.currentStep.question }
          answer={ this.state.currentStep.answer }
          goToNextStep={ this.goToNextStep }
        />
      );
    }

    return null;
  }
}

ReactDOM.render( <App />, document.getElementById( "app" ) );
