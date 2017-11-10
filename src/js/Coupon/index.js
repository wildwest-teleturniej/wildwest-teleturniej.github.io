import React from "react";

export default class Coupon extends React.Component {
  clearData = () => {
    localStorage.removeItem( "usedAnsweres" );
    location.reload();
  }

  renderButton() {
    if ( this.props.debug ) {
      return ( <button onClick={ this.clearData }>Wyczyść dane!</button> );
    }

    return null;
  }

  render() {
    return (
      <div>
        <p>Hej udało ci się! trzymaj tu zniżkę na żarcie w naszym teleturnieju!</p>
        { this.renderButton() }
      </div>
    );
  }
}
