import React from "react";
import QRReader from "../vendor/qrscan";

import "./scanner.sass";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result: "",
      iOS: [ "iPad", "iPhone", "iPod" ].indexOf( navigator.platform ) >= 0,
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
    QRReader.decoder.terminate();
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
      console.log( resultSplit[ resultSplit.length - 1 ] );


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
    if ( this.props.debug ) {
      return `Idź tam ${ this.props.currentStep.desc } (${ this.props.currentStep.id })`;
    }
    return `Idź tam ${ this.props.currentStep.desc }`;
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
          </div>
        </div>
      </main>
    );
  }
}
