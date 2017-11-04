import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Question from './Question.js'
import QRCodeReader from './QRCodeReader.js'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Switch} from 'react-router'
const App = () =>
<Router>
  <MuiThemeProvider>
    <div>
    <Route exact path='/' component={QRCodeReader}/>
    <Route exact path='/question' component={Question}/>
    </div>
  </MuiThemeProvider>
</Router>

export default App;
