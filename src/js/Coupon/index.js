import React from "react";

export default class Coupon extends React.Component {
  clearData = () => {
    localStorage.removeItem( "usedAnsweres" );
    localStorage.removeItem( "nextStep" );
    localStorage.removeItem( "questionsOK" );
    location.reload();
  }

  renderButton() {
    if ( this.props.debug ) {
      return ( <button className="btn" onClick={ this.clearData }>Wyczyść dane!</button> );
    }

    return null;
  }

  render() {
    return (
      <div className="flex flex-col justify-center h-full">
        <h1 className="mb-4 text-center uppercase">Hej udało ci się! trzymaj tu zniżkę na żarcie w naszym teleturnieju!</h1>
        { this.renderButton() }
      </div>
    );
  }
}
