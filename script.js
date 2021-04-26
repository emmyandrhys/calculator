const one = document.querySelector('key 1');
const two = document.querySelector('key 2');
const three = document.querySelector('key 3');
const four = document.querySelector('key 4');
const five = document.querySelector('key 5');
const six = document.querySelector('key 6');
const seven = document.querySelector('key 7');
const eight = document.querySelector('key 8');
const nine = document.querySelector('key 9');
const zero = document.querySelector('key 0');

//make digits for display
/*  combined digit formations
    right == top-right, bottom-right    1 == right
    center == top, middle, bottom       2 == center, rightleft
    left == top-left, bottom-left       3 == center, right
    rightleft == top-right, bottom-left 4 == right, top-left, middle
                                        5 == center, rightleft
                                        6 == center, left, bottom-right
                                        7 == right, top
                                        8 == center, right, left
                                        9 == center, right, top-left
                                        0 == right, left, top, bottom */
const right = 'border-right: 4px solid black;';
const left = 'border-left: 4px solid black;';
const centert = 'border-top: 4px solid black; border-bottom:4px solid black;';
const centerb = 'border-bottom: 4px solid black;';

const dis1 =`<div style="${right}"></div><div style="${right}"></div>`;
const dis2 =`<div style="${centert} ${right}"></div><div style="${left} ${centerb}"></div>`;
const dis3 =`<div style="${centert} ${right}"></div><div style="${right} ${centerb}"></div>`;
const dis4 =`<div style="${centerb} ${right} ${left}"></div><div style="${right}"></div>`;
const dis5 =`<div style="${centert} ${left}"></div><div style="${right} ${centerb}"></div>`;
const dis6 =`<div style="${centert} ${left}"></div><div style="${left} ${centerb} ${right}"></div>`;
const dis7 =`<div style="border-top: 4px solid black ${right}"></div><div style="${left} ${centert} ${right}"></div>`;
const dis8 =`<div style="${centert} ${left} ${right}"></div><div style="${left} ${centerb} ${right}"></div>`;
const dis9 =`<div style="${centert} ${left} ${right}"></div><div style="${centerb} ${right}"></div>`;
const dis0 =`<div style="border-top: 4px solid black; ${right} ${left}"></div><div style="${left} ${centerb} ${right}"></div>`;




//get user input until operation key is pressed
const number1 = 
//determine operation selected

//get user input until equal sign is pressed
const number 2 = 

//compute the selected arithmatic

//display solution on display



