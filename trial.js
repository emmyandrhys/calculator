import React, { Component } from 'react';
import './App.css';


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEntry: '',
      lastEntry: '',
      hasDecimal: false,
      formula: '',
      value: '',
      isPositive: true,
      solved: true
    }
    this.handleNum=this.handleNum.bind(this)
    this.handleOp=this.handleOp.bind(this)
    this.solve=this.solve.bind(this)
    this.handleClear=this.handleClear.bind(this)
    this.handleClearAll=this.handleClearAll.bind(this)
    this.handleDecimal=this.handleDecimal.bind(this)
    this.handleClick=this.handleClick.bind(this)
    this.formulaScreen=this.formulaScreen.bind(this)
    this.solutionScreen=this.solutionScreen.bind(this)
  }

  handleNum(i){
    var formula = this.state.formula;
    var last = this.state.lastEntry;
    var current = this.state.currentValue;
    const newValue = i;
    if (last==='+'|| last==='*' || last=='/' || last==='0') {
      last = newValue;
    } else if (last==='-' && current !='-') {
      last = newValue
    } else { last = last + newValue }
    this.setState({
      formula: formula + newValue,
      currentValue: current + newValue,
      lastEntry: last,
      solved: false
    })
  }

  handleOp(i){
    var formula = this.state.formula;
    const ops = /[-+*//]/
    var last = this.state.lastEntry;
    var current = this.state.currentValue;
    const newValue = i;
    let form;
    let cutCurrent;
    if(newValue==='-' && ops.test(last)) {
      this.setState({isPositive:false})
      form = formula + newValue
      current = '-'
    }
    else if(ops.test(last)) {
      form= formula.slice(0, -1) + newValue;
      current = ''
    } else {
      form = formula + newValue
      current = ''
    }
    this.setState({
      formula:form,
      lastEntry:newValue,
      currentValue:current,
      solved:false
    })
  }
  handleDecimal(){
    const current=this.state.currentEntry;
    const form=this.state.formula;
    if(this.state.hasDecimal) { return 
    } else {
      current = current + '.';
      form = form + '.';
      this.setState({
        formula: form,
        currentEntry: current,
        lastEntry: '.',
        hasDecimal: true,
        solved: false
        
      })

    }
  }
  solve(){
    const formula = this.state.formula;
    let solution = Math.round(10000000000 * eval(formula))/ 10000000000;
    if(this.state.solved===false) {
      this.setState({
        formula: solution.toString(),
        currentValue: solution.toString(),
        lastEntry: '',
        isPositive: true,
        hasDecimal: false,
        solved: true
      })
    }
  }

  handleClear(){
    const current = this.state.currentEntry;
    const form = this.state.formula.slice(0, current.length - 1);
    if(current[0]==='-') {this.setState({isPositive:true})}
    if(this.state.hasDecimal) {this.setState({hasDecimal:false})}
    this.setState({
      formula: form,
      currentEntry: current,
      lastEntry: '',
      solved: false
    })
  }

  handleClearAll(){
    this.setState({
      currentEntry: '',
      lastEntry: '',
      hasDecimal: false,
      formula: '',
      total: 0,
      value: '',
      isPositive: true,
      solved: true,
      formScreen: '0',
      solveScreen: '0'
    })
  }

  handleClick(i){
    if(this.props.currentEntry==='0' && i==='0') { return }
    switch (i) {
      case '=':
      if(this.state.solved===false) { 
      this.solve(i);
      } break;
      case 'AC':
        this.handleClearAll();
      case 'CE':
        this.handleClear();
        break;
      case '*':
      case '/':
      case '+':
      case '-':
        this.handleOp(i);
        break;
      case '.':
        this.handleDecimal();
        break;
      default:
        this.handleNum(i)
        break;
    }
    return
  }
  renderButton(i) {
    var keyType = ''
    switch (i) {
      case '+':
      case '-':
      case '*':
      case '/':
        keyType = 'opKey'        
        break;
      case 'AC':
      case 'CE':
        keyType = 'clearKey'
        break;
      case '=':
        keyType = 'equalKey'
        break;
      default:
        keyType = 'numberKey'
        break;
    }
    return (
      <button
        value={i}
        onClick={() => this.handleClick(i)}
        className={keyType}
      > {i} 
      </button>
    )
  }
  formulaScreen() {
    var screen = this.state.formula;
    if (screen.length > 10) {
      return (screen.slice(screen.length-11))
    }
    else {return screen}
  }
  solutionScreen() {
    var screen = this.state.currentEntry;
    if(screen.length > 10) {
      return (screen.slice(screen.length-11))
    } else {return screen}
  }
 
  render() {
    const form =this.state.formula;
    const solution = this.state.currentEntry;
    return (
      <div id="calculator">
        <div id="formulascreen">
          {this.formulaScreen()}
        </div>
        <div id="solutionscreen">
          {this.solutionScreen()}
        </div>
        <div className="buttons">
        <div className="topRow">
          {this.renderButton('7')}
          {this.renderButton('8')}
          {this.renderButton('9')}
          {this.renderButton('CE')}
          {this.renderButton('AC')}
        </div>
        <div className="secondRow">
          {this.renderButton('4')}
          {this.renderButton('5')}
          {this.renderButton('6')}
          {this.renderButton('*')}
          {this.renderButton('/')}
        </div>
        <div className="thirdRow">
          {this.renderButton('1')}
          {this.renderButton('2')}
          {this.renderButton('3')}
          {this.renderButton('+')}
          {this.renderButton('-')}
        </div>
        <div className="bottomRow">
          {this.renderButton('0')}
          {this.renderButton('.')}
          {this.renderButton('=')}
        </div>          
    </div>
      </div>
    )
  }
  
}

function  handleClick(i){
  if(this.state.currentEntry==='0' && i==='0') { return }
  switch (i) {
    case '=':
      this.solve(i);
    case 'AC':
      this.handleClearAll();
    case 'CE':
      this.handleClear();
      break;
    case '*':
    case '/':
    case '+':
    case '-':
      this.handleOp(i);
      break;
    case '.':
      this.handleDecimal();
      break;
    default:
      this.handleNum(i)
      break;
  }
  return
}
{/*class FormulaScreen extends React.Component {
  render () {  
    let form = {this.props.formula}.slice()
    if (this.props.length > 10) {
      let form = this.props.formula.slice(this.props.formula.length -1);
      return (
        <div>
          {form.map(num =>()=>{
              return (
                <div className="digit">
                  <div className="topdigit" id={num}/>
                  <div className="bottomdigit" id={num}/>
                </div>
              )
            })
          }
        </div>
      )
    } else {
      let blanks = 10 - form.length;
      let blank = Array(blanks).fill(<div class="blankdigit"/>)
      return (
        <div>
          {blank.map(num =>()=>{
            <div className="blankdigit"/>
          })}
          {form.map(num =>()=>{
              return (
                <div className="digit">
                  <div className="topdigit" id={num}/>
                  <div className="bottomdigit" id={num}/>
                </div>
              )
            })
          }
        </div>
        )
      }
    }
  }
  

  class SolutionScreen extends React.Component {
      render() {
        let form = this.props.currentEntry.slice()
      if (form > 10) {
        let form = form.slice(form.length -1);
        return (
          <div>
            {form.map(num =>()=>{
                return (
                  <div className="digit">
                    <div className="topdigit" id={num}/>
                    <div className="bottomdigit" id={num}/>
                  </div>
                )
              })
            }
          </div>
        )
      } else {
        let blanks = 10 - form.length;
        let blank = Array(blanks).fill(<div class="blankdigit"/>)
        return (
          <div>
            {blank.map(num =>()=>{
              <div className="blankdigit"/>
            })}
            {form.map(num =>()=>{
                return (
                  <div className="digit">
                    <div className="topdigit" id={num}/>
                    <div className="bottomdigit" id={num}/>
                  </div>
                )
              })
            }
          </div>
          )
        }
      }
    }
    
  */}

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}


export default App;
