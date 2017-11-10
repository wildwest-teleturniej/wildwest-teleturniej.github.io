import React from "react";
import QRReader from "../vendor/qrscan";

import "./scanner.sass";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result: "",
      warningVisible: false,
      iOS: [ "iPad", "iPhone", "iPod" ].indexOf( navigator.platform ) >= 0,
      noCamera: false,
      // iOS: true,
    };
  }

  componentDidMount() {
    QRReader.init( this.video, this.frame, this.state.iOS, this.errorHandler );

    if ( !this.state.iOS ) {
      setTimeout( () => {
        this.scan();
      }, 1000 );
    }
  }

  componentWillUnmount() {
    QRReader.stop();
    clearTimeout( this.timeout );
  }

  onInputChange = ( e ) => {
    if ( e.target && e.target.files.length > 0 ) {
      this.frame.src = URL.createObjectURL( e.target.files[ 0 ] );

      this.scan();
    }
  }

  errorHandler = ( err ) => {
    console.error( err );
    console.error( "Unable to open the camera, provide permission to access the camera" );

    if ( !this.state.noCamera ) {
      QRReader.stop();
      this.setState( {
        iOS: true,
        noCamera: true,
      } );
      QRReader.init( this.video, this.frame, this.state.iOS, this.errorHandler );
    }
  }

  scan() {
    QRReader.scan( ( result ) => {
      const resultSplit = result.split( "#" );

      this.setState( {
        result: "Ups! To chyba nie tu.",
        warningVisible: true,
      } );

      if ( this.timeout ) {
        clearTimeout( this.timeout );
      }

      this.timeout = setTimeout( () => {
        this.setState( {
          warningVisible: false,
        } );
      }, 3000 );

      if ( +resultSplit[ resultSplit.length - 1 ] === this.props.currentStep.id ) {
        this.props.changeView();
      } else {
        console.log( result );
      }

      if ( !this.state.iOS ) {
        setTimeout( () => {
          this.scan();
        }, 1000 );
      }
    } );
  }

  nextstepFormatter() {
    let text = `${ this.props.currentStep.desc }`;
    if ( this.props.debug ) {
      text += ` (${ this.props.currentStep.id })`;
    }

    return text;
  }

  renderContent() {
    if ( this.state.iOS ) {
      return (
        <div className="input-cont">
          <input
            key="camera"
            id="camera"
            type="file"
            capture="camera"
            onChange={ this.onInputChange }
            ref={ ( el ) => { this.img = el; } }
          />

          <img
            alt=""
            key="frame"
            ref={ ( el ) => { this.frame = el; } }
          />

          <label
            htmlFor="camera"
            className="btn"
          >{ this.state.noCamera ? "Załaduj plik" : "Użyj aparatu"}</label>
        </div>
      );
    }
    return [
      <video
        className="fullscreen-cont__video"
        autoPlay
        key="camera"
        ref={ ( el ) => { this.video = el; } }
      /> ];
  }

  renderWaring = () => {
    let classes = "fullscreen-cont__text__warn";

    if ( this.state.warningVisible ) {
      classes += " fullscreen-cont__text__warn--visible";
    }

    return (
      <p className={ classes }>
        { this.state.result }
      </p>
    );
  }

  render() {
    return (
      <main className={ !this.state.iOS ? "fullscreen-cont" : "flex flex-col justify-between h-full" }>
        { this.renderContent() }
        <div className="fullscreen-cont__text">
          { this.renderWaring() }
          <p>
            <small>
              zeskanuj kod qr tam,
            </small>
          </p>
          <p className="fullscreen-cont__text__goto">
            { this.nextstepFormatter() }
          </p>
        </div>
      </main>
    );
  }
}
