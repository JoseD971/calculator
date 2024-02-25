var total = null;
var current = null;
var firstTemporal = 0;
var secondTemporal = 0;
var screenValue = 0;
var operatorValue = null;
const screen = document.getElementById('screen');
const operands = document.getElementsByClassName('operand');
const operators = document.getElementsByClassName('operator');
const operation = document.getElementById('operation');

//keyboard support
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[value='${e.key}']`);
    if (isNaN(key) || key === ' ') {
        e.preventDefault(); 
        key.click();
    } else if (e.key == 13){
        calculate();
    } else {
        return 0;
    }
});

for (let i = 0; i < operands.length; i++) {
    operands[i].addEventListener('click', function(e){current = e.target.value; setOperand(); display();});
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', function(e){setOperator(e)});
}

operation.addEventListener('click', function(e){calculate()});

function setOperator(e) {
    if (total == null) {
        total = firstTemporal;
    }
    if (secondTemporal != null) calculate(); 
    secondTemporal = 0;
    var operation = e.target.id;

    switch (operation) {
        case "sum":
            operatorValue = "+";
            break;
        case "subtract":
            operatorValue = "-";
            break;
        case "multiply":
            operatorValue = "*";
            break;
        case "division":
            operatorValue = "/";
            break;
        case "operation":
            calculate();
            break;
    
        default:
            break;
    }
    
}

function setOperand () {
    if (total == null) {
        firstTemporal = parseInt(`${firstTemporal}` + `${current}`);
    } else {
        firstTemporal = total;
        secondTemporal = parseInt(`${secondTemporal}` + `${current}`);
    }
}

function calculate() {
    switch (operatorValue) {
        case "+":
            operatorValue = "="
            sum();
            display();
            break;
        case "-":
            operatorValue = "=";
            subtract();
            display();
            break;
        case "multiply":
            operatorValue = "*";
            break;
        case "division":
            operatorValue = "/";
            break;
        case "operation":
            calculate();
            break;
    
        default:
            break;
    }
}

function sum() {
    total = firstTemporal + secondTemporal;
}

function subtract() {
    total = firstTemporal - secondTemporal;
}

const multiply = function (array) {
    return array.reduce((product, current) => product * current)
};

function display() {
    console.log("Total: " + total + " Operator: " + operatorValue + " Current: " + current + " 1Temporal: " + firstTemporal + " 2Temporal: " + secondTemporal);
    if (operatorValue == "=") {
        screenValue = total;
    } else if (operatorValue != null) {
        screenValue = secondTemporal;
    } else if (current != null){ 
        screenValue = screenValue + `${current}`;
    } else {
        screenValue = total;
    }
    screen.innerText = parseInt(screenValue).toString();
}