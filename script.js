var total = null;
var current = null;
var firstOperand = 0;
var secondOperand = 0;
var screenValue = 0;
var operatorValue = null;
const screen = document.getElementById('screen');
const operands = document.getElementsByClassName('operand');
const operators = document.getElementsByClassName('operator');
const operation = document.getElementById('operation');
const sign = document.getElementById('sign');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const decimal = document.getElementById('decimal');

//keyboard support
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[value='${e.key}']`);
    if (!isFinite(key)) {
        e.preventDefault(); 
        key.click();
    } else if (e.key == 13){
        e.preventDefault();
        calculate();
    } else {
        return 0;
    }
});
//---

for (let i = 0; i < operands.length; i++) {
    operands[i].addEventListener('click', function(e){current = e.target.value; setOperand(); display();});
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', function(e){setOperator(e)});
}

operation.addEventListener('click', function(e){calculate()});
sign.addEventListener('click', changeSign);
clear.addEventListener('click', function() {clearDisplay(); display()});
backspace.addEventListener('click', function() {backspaceInput(); display()});
decimal.addEventListener('click', decimalInput);

function setOperator(e) {
    if (total == null) {
        total = firstOperand;
    }
    if (secondOperand != null) calculate(); 
    secondOperand = 0;
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
            operatorValue = "=";
            calculate();
            break;
    
        default:
            break;
    }
    
}

function setOperand (newOperand) {
    if (total == null) {
        (newOperand == undefined) ? firstOperand = (`${firstOperand}` + `${current}`) - 0 : firstOperand = newOperand;
        screenValue = firstOperand;
    } else {
        if (newOperand == undefined) {
            firstOperand = total;
            secondOperand = (`${secondOperand}` + `${current}`) - 0;
            screenValue = secondOperand;
        } else {
            total = total * -1;
            secondOperand = newOperand;
            screenValue = secondOperand;
        }
    }
}

function calculate() {
    switch (operatorValue) {
        case "+":
            sum();
            display();
            break;
        case "-":
            subtract();
            display();
            break;
        case "*":
            multiply();
            display();
            break;
        case "/":
            division();
            display();
            break;
        case "operation":
            calculate();
            break;
    
        default:
            break;
    }
}

function sum() {
    total = firstOperand + secondOperand;
    screenValue = total;
}

function subtract() {
    total = firstOperand - secondOperand;
    screenValue = total;
}

function multiply () {
    total = firstOperand * secondOperand;
    screenValue = total;
};

function division () {
    if(secondOperand == 0) {
        screenValue = "MathError";
        screen.innerText = screenValue;
        total = 0;
    } else {
        total = firstOperand / secondOperand;
        screenValue = total;
    }
};

function display() {
    console.log("Total: " + total + " Operator: " + operatorValue + " Current: " + current + " 1Operando: " + firstOperand + " 2Operando: " + secondOperand);
    screen.innerText = screenValue;
    if(screenValue.toString().length > 7) {
        screen.innerText = screenValue.toString().substring(0, 7);
    }
}

function changeSign () {
    var newOperand = screenValue * -1;
    setOperand(newOperand);
    display();
}

function clearDisplay() {
    screenValue = 0;
    total = null;
    firstOperand = 0;
    secondOperand = 0;
    current = null;
    operatorValue = null;
}

function backspaceInput() {
    current = null;
    if (total == null) {
        firstOperand = (firstOperand.toString().slice(0,-1));
        screenValue = firstOperand;
    } else {
        secondOperand = (secondOperand.toString().slice(0, -1));
        screenValue = secondOperand;
    }
} 

function decimalInput() {
    if (screenValue.toString().includes(".")) {
        if (total == null) {
            Math.trunc(firstOperand);
            screenValue = firstOperand;
        } else {
            Math.trunc(secondOperand);
            screenValue = secondOperand;
        }
    } else {
        if (total == null) {
            firstOperand += ".";
            console.log(firstOperand);
            setOperand(firstOperand);
            screenValue = firstOperand;
        } else {
            secondOperand += ".";
            screenValue = secondOperand;
        }
    }
    display();
}