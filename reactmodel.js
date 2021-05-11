/* global React, ReactDOM */
/* eslint-disable react/prop-types, react/no-multi-comp,
 no-eval, no-nested-ternary */

// eslint-disable-next-line no-unused-vars
const projectName = 'javascript-calculator';

// VARS:
const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /\d[x/+‑]{1}‑$/,

// COMPONENTS:
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEntry: '0',
      lastEntry: '0',
      formula: '',
      isPostive: true,
      lastClicked: ''
    };
    this.digitMaxWarning = this.digitMaxWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleSolve = this.handleEvaluate.bind(this);
    this.allClear = this.allClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleDigits = this.handleDigits.bind(this);
  }

  digitMaxWarning() {
    this.setState({
      currentEntry: 'Digit Limit Met',
      lastEntry: this.state.currentEntry
    });
    setTimeout(() => this.setState({ currentEntry: this.state.lastEntry }), 1000);
  }

  handleSolve() {
    if (!this.state.currentEntry.includes('Limit')) {
      let form = this.state.formula;
      while (endsWithOperator.test(form)) {
        form = form.slice(0, -1);
      }
      form = form
        .replace(/x/g, '*')
        .replace(/‑/g, '-')
        .replace('--', '+0+0+0+0+0+0+');
      let answer = Math.round(1000000000000 * eval(form)) / 1000000000000;
      this.setState({
        currentEntry: answer.toString(),
        formula:
          form
            .replace(/\*/g, '⋅')
            .replace(/-/g, '‑')
            .replace('+0+0+0+0+0+0+', '‑-')
            .replace(/(x|\/|\+)‑/, '$1-')
            .replace(/^‑/, '-') +
          '=' +
          answer,
        lastEntry: answer,
        solved: true
      });
    }
  }

  handleOperators(e) {
    if (!this.state.currentEntry.includes('Limit')) {
      const value = e.target.value;
      const { formula, lastEntry, solved } = this.state;
      this.setState({ currentEntry: value, solved: false });
      if (solved) {
        this.setState({ formula: lastEntry + value });
      } else if (!endsWithOperator.test(formula)) {
        this.setState({
          lastEntry: formula,
          formula: formula + value
        });
      } else if (!endsWithNegativeSign.test(formula)) {
        this.setState({
          formula:
            (endsWithNegativeSign.test(formula + value) ? formula :lastEntry) +
            value
        });
      } else if (value !== '‑') {
        this.setState({
          formula: lastEntry + value
        });
      }
    }
  }

  handleDigits(e) {
    if (!this.state.currentEntry.includes('Limit')) {
      const { currentEntry, formula, solved } = this.state;
      const value = e.target.value;
      this.setState({ solved: false });
      if (currentEntry.length > 21) {
        this.digitMaxWarning();
      } else if (solved) {
        this.setState({
          currentEntry: value,
          formula: value !== '0' ? value : ''
        });
      } else {
        this.setState({
          currentEntry:
            currentEntry === '0' || isOperator.test(currentEntry)
              ? value
              : currentEntry + value,
          formula:
            currentEntry === '0' && value === '0'
              ? formula === ''
                ? value
                : formula
              : /([^.0-9]0|^0)$/.test(formula)
              ? formula.slice(0, -1) + value
              : formula + value
        });
      }
    }
  }

  handleDecimal() {
    if (this.state.solved === true) {
      this.setState({
        currentEntry: '0.',
        formula: '0.',
        solved: false
      });
    } else if (
      !this.state.currentEntry.includes('.') &&
      !this.state.currentEntry.includes('Limit')
    ) {
      this.setState({ solved: false });
      if (this.state.currentEntry.length > 21) {
        this.digitMaxWarning();
      } else if (
        endsWithOperator.test(this.state.formula) ||
        (this.state.currentEntry === '0' && this.state.formula === '')
      ) {
        this.setState({
          currentEntry: '0.',
          formula: this.state.formula + '0.'
        });
      } else {
        this.setState({
          currentEntry: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
          formula: this.state.formula + '.'
        });
      }
    }
  }

  allClear() {
    this.setState({
      currentEntry: '0',
      lastEntry: '0',
      formula: '',
      isPostive: 'true',
      lastClicked: '',
      solved: false
    });
  }

  render() {
    return (
        <div className="calculator">
          <Formula formula={this.state.formula.replace(/x/g, '⋅')} />
          <Output currentValue={this.state.currentEntry} />
          <Buttons
            decimal={this.handleDecimal}
            solve={this.handleSolve}
            allClear={this.allClear}
            digits={this.handleDigits}
            operators={this.handleOperators}
          />
        </div>
    );
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div>
        <button id="seven" onClick={this.props.digits} value="7"> 7 </button>
        <button id="eight" onClick={this.props.digits} value="8"> 8 </button>
        <button id="nine" onClick={this.props.digits} value="9"> 9 </button>
        <button id="allClear" className="clearBtn" onClick={this.props.allClear} value="AC"> AC </button>
        <button id="clearEntry" className="clearBtn" onClick={this.props.clearEntry} value="CE"> CE </button>
        <button id="four" onClick={this.props.digits} value="4"> 4 </button>
        <button id="five" onClick={this.props.digits} value="5"> 5 </button>
        <button id="six" onClick={this.props.digits} value="6"> 6 </button>
        <button id="multiply" onClick={this.props.operators} style={operatorStyle} value="*"> x </button>
        <button id="divide" onClick={this.props.operators} style={operatorStyle} value="/"> / </button>
        <button id="one" onClick={this.props.digits} value="1"> 1 </button>
        <button id="two" onClick={this.props.digits} value="2"> 2 </button>
        <button id="three" onClick={this.props.digits} value="3"> 3 </button>
        <button id="add" onClick={this.props.operators} style={operatorStyle} value="+"> + </button>
        <button id="subtract" onClick={this.props.operators} style={operatorStyle} value="‑"> ‑ </button>
        <button className="jumbo" id="zero" onClick={this.props.digits} value="0"> 0 </button>
        <button id="decimal" onClick={this.props.decimal} value="."> . </button>
        <button id="equals" onClick={this.props.solve} value="="> = </button>
      </div>
    );
  }
}

class Output extends React.Component {
  render() {
    return (
      <div className="outputScreen" id="display">
        {this.props.currentValue}
      </div>
    );
  }
}

class Formula extends React.Component {
  render() {
    return <div className="formulaScreen">{this.props.formula}</div>;
  }
}

ReactDOM.render(<Calculator />, document.getElementById('calculator'));