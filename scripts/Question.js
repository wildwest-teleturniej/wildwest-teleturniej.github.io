import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import QUESTIONS from './questions.js'

function getQuestion() {
  const url = window.location.href
  const getReq = url.split('?')[1]
  let questionIndex
  eval(getReq) // XD
  return QUESTIONS[questionIndex - 1]
}
console.log(1);

export default class Question extends React.Component {
  state = {input: '', question: getQuestion()}
  getType = () =>
  typeof this.state.question.answer === 'number' ?
  'number':
  'text'
  render = () =>
      <div>
        <label htmlFor="textField">
          <h2>{this.state.question.question}</h2>
        </label>
        <TextField type={this.getType()} id='textField'/>
        <RaisedButton label="Primary" primary={true}/>
      </div>
}
