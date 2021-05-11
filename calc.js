// Initialize Constants
const number = /\d+/;
const operation = /[\u{215}\u{247}+-]/;
const endsWithOp = /\d+[\u{215}\u{247}+-]$/;
const endsWithNeg = /\d+[\u{215}\u{247}+-]-$/;

//display character styles
const one = <div><div className="right-top"/><div className="right-bottom"/></div>
const two = <div><div className="top-right-top"/><div className="top-bottom-left-bottom"/></div>
const three = <div><div className="top-right-top"/><div className="top-bottom-right-bottom"/></div>
const four = <div><div className="left-right-top"/><div className="top-right-bottom"/></div>
const five = <div><div className="top-left-top"/><div className="top-bottom-right-bottom"/></div>
const six = <div><div className="top-left-top"/><div className="all-bottom"/></div>
const seven = <div><div className="top-right-top"/><div className="right-bottom"/></div>
const eight = <div><div className="all-top"/><div className="all-bottom"/></div>
const nine = <div><div className="all-top"/><div className="top-right-bottom"/></div>
const zero = <div><div className="all-top"/><div className="bottom-left-right-bottom"/></div>
const digitKey = {"1":one, "2":two, "3":three, "4":four, "5":five, "6":six, "7":seven, "8":eight, "9":nine, "0":zero}

// Render the Buttons
class Buttons extends React.Component {
    render (){
        return(
            <div>
            <Button id="seven" onClick={this.props.numbers} value="7" className="numKey">7</Button>
            <Button id="eight" onClick={this.props.numbers} value="8" className="numKey">8</Button>
            <Button id="nine" onClick={this.props.numbers} value="9" className="numKey">9</Button>
            <Button id="allClear" onClick={this.props.allclear} value="AC" className="clearKey">AC</Button>
            <Button id="clearEntry" onClick={this.props.clear} value="CE" className="clearKey">CE</Button>
            <Button id="four" onClick={this.props.numbers} value="4" className="numKey">4</Button>
            <Button id="five" onClick={this.props.numbers} value="5" className="numKey">5</Button>
            <Button id="six" onClick={this.props.numbers} value="6" className="numKey">6</Button>
            <Button id="mult" onClick={this.props.operations} value="m" className="opKey">M</Button>
            <Button id="div" onClick={this.props.operations} value="d" className="opKey">D</Button>
            <Button id="one" onClick={this.props.numbers} value="1" className="numKey">1</Button>
            <Button id="two" onClick={this.props.numbers} value="2" className="numKey">2</Button>
            <Button id="three" onClick={this.props.numbers} value="3" className="numKey">3</Button>
            <Button id="add" onClick={this.props.operations} value="a" className="opKey">+</Button>
            <Button id="sub" onClick={this.props.operations} value="s" className="opKey">-</Button>
            <Button id="zero" onClick={this.props.numbers} value="0" className="numKey">0</Button>
            <Button id="decimal" onClick={this.props.decimal} value="." className="numKey">.</Button>
            <Button id="equal" onClick={this.props.solve} value="=" className="equalKey">=</Button>
            </div>
        )
    }
}

class FormulaDisplay extends React.Component {
    render() {
        const items = this.props.formula;
        return(
            <Fragment>
                {items.map(item => {digitKey[digitKey.filter(val => val === item)]})}
            </Fragment>
        )
    }
}

class SolutionDisplay extends React.Component {
    render() {
        const items = this.props.displayList
        return (
        <Fragment>
            {items.map(item => {digitKey[digitKey.filter(val=>val===item)]})}
        </Fragment>
        )
    }
}


class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            lastEntry: 0,
            currentEntry: 0,
            currentOp: null,
            isNegative: false,
            lastClicked: null,
            formula: '',
            displayList: [],
            currentDecimal: false,
        }
        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleOperations = this.handleOperations.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.handleSolve = this.handleSolve.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleAllClear = this.handleAllClear.bind(this);
    }
    handleNumbers(){
        const {total, currentEntry, formula, lastClicked, lastEntry} = this.state;
        const value = e.target.value;
        if(value === operation || value != number) return
        if (total==0) {
            if(value==0) return
            else {
                this.setState(total=value, currentEntry=value, formula=value, lastClicked=value, lastEntry=0)
            }
        }
        else if (currentEntry==0){
            this.setState(currentEntry=value, lastClicked=value, formula=formula.push(value), lastEntry=0)
        }
        else {
            this.setState(currentEntry=currentEntry.push(value), formula=formula.push(value), lastClicked=value)
        }
    }

    handleDecimal(){
        const {currentEntry, formula, lastClicked, currentDecimal} = this.state;
        if(currentDecimal == false) { return}
        else {
            this.setState=(currentEntry= currentEntry.concat('.'), formula.concat('.'), lastClicked=".", currentDecimal=true);
            
        }
    }

    handleOperations(){

    }
    handleSolve(){

    }
    handleClear(){
        const {currentEntry, lastEntry, currentOp, currentDecimal, formula, isNegative}= this.state;
        if (lastEntry[0]==='-'){
            this.setState(isNegative=true)
        }
        if (lastEntry.indexOf('.')) {
            this.setState(currentDecimal=true)
        }
        if (lastClicked.test(operation)) {
            var Newformula = formula.slice(0,-1)
            this.setState(formula=Newformula, currentEntry=0, currentOp=null,)
        } else {
            var newform = formula.slice(0, formula.length - currentEntry.length + 1)
            this.setState(currentEntry=0, formula=newform);
        }
    }
    handleAllClear(){

    }
    
    render() {
        return(
            <div>
                <FormulaDisplay formula={this.state.formula} />
                <SolutionDisplay value={this.state.displayList}/>
                <Buttons
                    numbers={this.handleNumbers}
                    operations={this.handleOperations}
                    decimal={this.handleDecimal}
                    solve={this.handleSolve}
                    clear={this.handleClear}
                    allClear={this.handleAllClear}
                    />
            </div>
        )
    }
}

ReactDOM.render(Calculator, document.getElementById('calculator'))