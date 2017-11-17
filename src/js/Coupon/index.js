import React from "react";

export default ( { changeView } ) =>
  (
    <div className="flex flex-col justify-center h-full">
      <h1 className="mb-4 text-center uppercase">
„Zamknij świat na klucz i wróć do mnie <br />
Żal za siebie rzuć i wróć do mnie <br />
Wygnaj z serca chłód i wróć do mnie <br />
Jak najkrótszą z dróg wróć do mnie – Sheriffa swojego” <br />
      </h1>
      <button className="btn" onClick={ changeView }>Zeskanuj kod</button>
    </div>
  );
