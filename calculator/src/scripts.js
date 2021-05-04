    var Calculator = {
        value: '0',
        currentEntry: '',
        currentNegative: false,
        currentOperation: '',
        history: [],
        display: '0'
    }
    
    // Operation Functions
    // Determine Numeric Value and Decimal Place value
    function placeValue(num) {
        var decIndex = num.indexOf('.');
        if (decIndex == -1 || decIndex == (num.length-1)) {
            decIndex = 0;
        }
        else {
            decIndex = num.length - decIndex - 1;
        }
        return [number(num), decIndex]
    }
    // Determine number of Digits to shift for completing rounding;
    function roundingValue() {
        var numValue = placeValue(Calculator.value);
        var numNew = placeValue(Calculator.currentEntry);
        var divideBack = () => {numValue[1] >= numNew[1] ? numValue[1] : numNew[1]}
        return divideBack
    }
    // Addition
    function addition() {
        var divideBack = roundingValue()
        if(Calculator.currentNegative == true) {
            return (Math.round(numValue[0] * 10 ** divideBack - numNew[0] * 10 ** divideBack))/10 ** divideBack;
        }
        return (Math.round(numValue[0] * 10 ** divideBack + numNew[0] * 10 ** divideBack))/10 ** divideBack;
    }
    // Subtraction
    function subtraction() {
        var divideBack = roundingValue()
        if(Calculator.currentNegative == true) {
            return (Math.round(numValue[0] * 10 ** divideBack + numNew[0] * 10 ** divideBack))/10 ** divideBack;
        }
        return (Math.round(numValue[0] * 10 ** divideBack - numNew[0] * 10 ** divideBack))/10 ** divideBack;
    }
    //Multiplication
    function multiplication() {
        var divideBack = roundingValue()
        if(Calculator.currentNegative == true) {
            return (Math.round(numValue[0] * 10 ** divideBack) * -1 * (numNew[0] * 10 ** divideBack))/10 ** (2 * divideBack);
        }
        return (Math.round(numValue[0] * 10 ** divideBack) * (numNew[0] * 10 ** divideBack))/10 ** (2 * divideBack);
    }
    //Division
    function division() {
        var digits = Calculator.value.length + Calculator.currentEntry.length
        if (digits < 5) { digits = 5};
        if (Calculator.currentNegative == true){ 
            return (-1 * (Number(Calculator.value))/(Number.Calculator.currentEntry)).toPrecision(digits)
        }
        return ((Number(Calculator.value))/(Number.Calculator.currentEntry)).toPrecision(digits)
    }

    // Clearing Functions
    function clearEntry() {
        Calculator.currentEntry = '';
        Calculator.currentNegative = false;
        Calculator.currentOperation = ''
        Calculator.display = '0'
    }    
    function clearAll() {
        Calculator.history = [];
        Calculator.value = '0';
        clearEntry;
    }

    // Performs Called Operation on hitting Equals or Another Operation
    function equal() {
        switch (Calculator.currentOperation) {
            case 'add':
                Calculator.value = addition.toString();
                Calculator.display = Calculator.value;
                break;
            case 'subtract':
                Calculator.value = subtraction.toString();
                Calculator.display = Calculator.value;
                break;
            case 'multiply':
                Calculator.value = multiplication.toString();
                Calculator.display = Calculator.value;
                break;
            case 'divide':
                Calculator.value = division.toString();
                Calculator.display = Calculator.value;
                break;
            default:
                Calculator.display = Calculator.value;
                break;
        }
    }





    // store current entered value, display current entered value
    // perform operations when called and return value
    // accept decimal until tenths place
    // won't accept multiple zeroes at beginning of number
    // won't accept two decimal points
    // if 2 or more operands entered ignores all unless 
    // immediate execution or scientific
    // relative precision with rounding







import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import Button from 'react-bootstrap/Button'

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            history: [],
            currentEntry:0,
            currentNegative: false
        };
    }

    // Operation Functions
    // Addition







    // store current entered value, display current entered value
    // perform operations when called and return value
    // clear all 
    // clear last entry
    // accept decimal until tenths place
    // won't accept multiple zeroes at beginning of number
    // won't accept two decimal points
    // if 2 or more operands entered ignores all unless 
    // immediate execution or scientific
    // relative precision with rounding
}