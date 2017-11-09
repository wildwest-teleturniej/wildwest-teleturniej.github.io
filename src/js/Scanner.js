import React from "react";
import QRReader from "./vendor/qrscan";

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

  onInputChange = ( e ) => {
    if ( e.target && e.target.files.length > 0 ) {
      this.frame.className = "app__overlay";
      this.frame.src = URL.createObjectURL( e.target.files[ 0 ] );

      this.scan();
    }
  }

  scan() {
    this.setState( {
      result: "",
    } );

    QRReader.scan( ( result ) => {
      console.log( result );
      this.setState( {
        result,
      } );

      if ( !this.state.iOS ) {
        setTimeout( () => {
          this.scan();
        }, 1000 );
      }
    } );
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
        autoPlay
        key="camera"
        ref={ ( el ) => { this.video = el; } }
      /> ];
  }

  render() {
    return (
      <main>
        <span>{ this.state.result }</span>
        { this.renderContent() }
      </main>
    );
  }
}
