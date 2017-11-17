import React from "react";
import ReactDOM from "react-dom";
import Scanner from "./Scanner/";
import Question from "./Question/";
import Coupon from "./Coupon/";
import End from "./End/";

import setup from "./setup.json";
import "./main.sass";

const { debug } = setup;

const stepsRequired = 4;
const steps = [
  {
    id: "qyGyz",
    desc: "Tu zasiadają Ziemscy bogowie, jacy są tego człowiek się dowie, w on czas gdy jeden w bramy zapuka, drugi zaś słowa liche wyduka",
    question: "Angielskiego królowej z domu nazwisko, które czernią, grozą i strachem napełniało wszystko swoją wymową, choć w trzydziestej drugiej sali, uczniowie lingwistkę młodą zawżdy uwielbiali.",
    answer: "Mroczek",
  }, {
    id: "drbqw",
    desc: "„Nie starczy ust do wymówienia przelotnych imion twoich, wodo.”",
    question: "Na tym piętrze mieszka zacny człowiek, po którego wieczystym zamknięciu powiek, przybyło na Zamek jego centrum rubinowe, pod Zygmunta czujne oczy brązowe",
    answer: "Tadeusz Kościuszko",
  }, {
    id: "ZVCkh",
    desc: "„Przenosi delikatną stopę nad żelaznym wałem. Niczym nieosłonięta kroczy wśród półnagich wysilonych mężczyzn o lśniących ramionach.”",
    question: "O chorobie zakaźnej jest mowa, której nieznośnie, szerokie ramiona, we znaki się dają tutaj wokoło, choć liter ma tylko czworo",
    answer: "AIDS",
  }, {
    id: "GXZTH",
    desc: "„Podziwiano ją i wielbiono, ale z daleka; nikt bowiem nie chciał narażać się na przykrą odmowę”",
    question: "Na Amaltei skórze napis widnieje: o tym jak szkoła jest wielka opowiada dzieje. I choć lakoniczność tekstu uderza w człowieka, to pracowano na niego od niemal ćwierćwieka. ",
    answer: "Szkoła sukcesu",
  }, {
    id: "wEVKl",
    desc: "Tam skąd Zefir przybywa pójdź człowiecze, Tam gdzie prawo strzału i lassa prym wiedzie. Weź swój kapelusz i konia i przybądź, gdzie wyceniona jest głowa twoja.",
    question: "Dzisiaj przybrane są w większości klasy, choć codzień otwierają je nauczyciele., dziś uczestników bawią maturalne asy, a jak na tym piętrze teleturniejów jest wiele?",
    answer: "4",
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
      // view: "question",
      questionCount: +localStorage.getItem( "questionsOK" ),
      isEnd: localStorage.getItem( "isEnd" ) === "true",
    };

    if ( this.state.questionCount >= stepsRequired ) {
      this.state.view = "coupon";
    }
  }

  goToNextStep = ( isValid ) => {
    const newCount = isValid ? this.state.questionCount + 1 : this.state.questionCount;
    localStorage.setItem( "questionsOK", newCount );

    if ( newCount >= stepsRequired ) {
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
          scanMagic={ this.state.questionCount >= stepsRequired }
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
