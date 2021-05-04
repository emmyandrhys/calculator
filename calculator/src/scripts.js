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