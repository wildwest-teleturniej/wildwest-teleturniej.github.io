import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import QRCodeReader from './QRCodeReader.js'
const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar title="Wild West Teleturniej - IIIF"/>
      <QRCodeReader/>
    </div>
  </MuiThemeProvider>
);

export default App;
