import React from "react";

export default ( { changeView } ) =>
  (
    <div className="flex flex-col justify-center h-full">
      <h1 className="mb-4 text-center uppercase">Hej udało ci się! Idź teraz do naszego szeryfa i odbierz kupon skanując kod QR na jego biurku</h1>
      <button className="btn" onClick={ changeView }>Zeskanuj kod</button>
    </div>
  );
