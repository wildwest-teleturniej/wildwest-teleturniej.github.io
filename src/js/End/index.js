import React from "react";
import ClearButton from "../ClearButton/";

export default class End extends React.Component {
  renderButton() {
    if ( this.props.debug ) {
      return ( <ClearButton /> );
    }

    return null;
  }

  render() {
    return (
      <div className="flex flex-col justify-center h-full">
        <h1 className="mb-4 text-center uppercase">Dzięki za grę!<br />Weź teraz kupon od szeryfa.</h1>
        { this.renderButton() }
      </div>
    );
  }
}
