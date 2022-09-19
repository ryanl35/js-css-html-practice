let runningTotal = 0;

let buffer = "0";

let equation = "";
let currOperand = "";

let previousOperator = null;


const screen = document.querySelector('.calc-screen');

const ul = document.querySelector('.history-container ul');

function buttonClick(value) {
    if (isNaN(value)) {
        //this is a not number
        handleSymbol(value);
    } else {
        handleNumber(value);
    }

    history.innerText = equation;

    if (buffer.length > 13) {
        screen.innerText = buffer.substring(buffer.length - 13);
    } else if (buffer.length <= 13) {
        screen.innerText = buffer;
    }

}

function handleSymbol(symbol) {

    switch (symbol) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));

            equation += buffer + ' = ' +  runningTotal;
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(equation));
            ul.appendChild(li);

            // reset
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            equation = '';
            currOperand = '';
            break;
        case '←':
            buffer = handleBackspace(buffer);
            break;
        case "+":
        case "-":
        case "x":
        case "÷":
            handleMath(symbol);
            break;
    }
}

function handleBackspace(buffer) {
    // as long as there isn't only one digit left
    if (buffer.length > 1) {
        newBuffer  = buffer.substring(0, buffer.length -1);
    } else if (buffer.length === 1) {
        newBuffer = '0';
    }

    return newBuffer;
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    } 

    // handle current operand and adding to equation
    currOperand = buffer + " " + symbol;
    equation += currOperand + " ";

    const intBuffer = parseInt(buffer);
    // const intBuffer = +buffer; // (same thing)

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0';
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case 'x':
            runningTotal *= intBuffer;
            break;
        case '÷':
            runningTotal /= intBuffer;
            break;
    }
}


function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init () {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}

init();