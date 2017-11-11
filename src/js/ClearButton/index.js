import React from "react";

const clearData = () => {
  localStorage.removeItem( "usedAnsweres" );
  localStorage.removeItem( "nextStep" );
  localStorage.removeItem( "questionsOK" );
  localStorage.removeItem( "isEnd" );
  location.reload();
};

export default () => ( <button className="btn" onClick={ clearData }>Wyczyść dane!</button> );
