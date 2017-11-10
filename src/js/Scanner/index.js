import React from "react";
import QRReader from "../vendor/qrscan";

import "./scanner.sass";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result: "",
      iOS: [ "iPad", "iPhone", "iPod" ].indexOf( navigator.platform ) >= 0,
      // iOS: true,
    };
  }

  componentDidMount() {
    QRReader.init( this.video, this.frame, this.state.iOS );

    if ( !this.state.iOS ) {
      setTimeout( () => {
        this.scan();
      }, 1000 );
    }
  }

  componentWillUnmount() {
    QRReader.stop();
  }

  onInputChange = ( e ) => {
    if ( e.target && e.target.files.length > 0 ) {
      this.frame.src = URL.createObjectURL( e.target.files[ 0 ] );

      this.scan();
    }
  }

  scan() {
    QRReader.scan( ( result ) => {
      const resultSplit = result.split( "/" );

      this.setState( {
        result,
      } );

      if ( +resultSplit[ resultSplit.length - 1 ] === this.props.currentStep.id ) {
        this.props.changeView();
      }

      if ( !this.state.iOS ) {
        setTimeout( () => {
          this.scan();
        }, 1000 );
      }
    } );
  }

  nextstepFormatter() {
    let text = `Idź tam ${ this.props.currentStep.desc }`;
    if ( this.props.debug ) {
      text += ` (${ this.props.currentStep.id })`;
    }

    return text;
  }

  renderContent() {
    if ( this.state.iOS ) {
      return [
        <input
          key="camera"
          type="file"
          capture="camera"
          onChange={ this.onInputChange }
          ref={ ( el ) => { this.img = el; } }
        />,
        <img
          alt="QR captured by user"
          key="frame"
          ref={ ( el ) => { this.frame = el; } }
        />,
      ];
    }
    return [
      <video
        className="fullscreen-cont__video"
        autoPlay
        key="camera"
        ref={ ( el ) => { this.video = el; } }
      /> ];
  }

  render() {
    return (
      <main>
        <div className="fullscreen-cont">
          { this.renderContent() }
          <div className="fullscreen-cont__text">
            <p className="debug fullscreen-cont__text__qr">
              { this.state.result }
            </p>
            <p className="fullscreen-cont__text__goto">
              { this.nextstepFormatter() }
            </p>
            <p>
              I zeskanuj tam kod QR
            </p>
          </div>
        </div>
      </main>
    );
  }
}
