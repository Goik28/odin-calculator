let num1 = undefined;
let operator = "";
let num2 = undefined;
let result = 0;
let clearVisor = true;
let chain = false;
let doubleOperator = false;
let doubleEqual = false;

const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const logList = document.querySelectorAll("li");
const bkspc = document.getElementById("bkspc");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");
let visor = document.getElementById("visor");

function getNumber(e) {
    if (clearVisor) {
        visor.textContent = "";
        clearVisor = false;
    }
    if (visor.textContent.length < 8) {
        if (e.currentTarget.textContent == "." && visor.textContent.indexOf(".") != -1) {
            return;
        }
        visor.textContent = visor.textContent + e.currentTarget.textContent;
    }
    doubleOperator = false;
    doubleEqual = false;
}

function backspace() {
    if (visor.textContent == "overflow") {
        clearVisor = true;
        visor.textContent = "0";
        return;
    }
    visor.textContent = visor.textContent.substring(0, visor.textContent.length - 1);
    if (visor.textContent == "") {
        clearVisor = true;
        visor.textContent = "0";
    }
}

function clearAll() {
    num1 = undefined;
    operator = "";
    num2 = undefined;
    result = 0;
    clearVisor = true;
    chain = false;
    doubleOperator = false;
    doubleEqual = false;
    clearLog();
    visor.textContent = "0";
}

function getOperation(e) {
    if (!chain) {
        num1 = parseInt(visor.textContent);
        operator = e.currentTarget.id;
        if (operator == "sqr") {
            equals();
            return;
        }
        clearVisor = true;
        doubleOperator = true;
        chain = true;
    } else if (doubleOperator) {
        operator = e.currentTarget.id;
        if (operator == "sqr") {
            num1 = parseInt(visor.textContent);
            equals();
            return;
        }
    } else {
        equals();
        getOperation(e);
    }
    doubleEqual = false;
}

function operate() {
    switch (operator) {
        case "pow":
            result = num1 ** num2;
            logOperation(num1, num2, "^", result);
            break;
        case "sqr":
            result = Math.sqrt(num1);
            logOperation("√", num1, "", result);
            break;
        case "div":
            result = num1 / num2;
            logOperation(num1, num2, "/", result);
            break;
        case "mult":
            result = num1 * num2;
            logOperation(num1, num2, "*", result);
            break;
        case "min":
            result = num1 - num2;
            logOperation(num1, num2, "-", result);
            break;
        case "plus":
            result = num1 + num2;
            logOperation(num1, num2, "+", result);
            break;
        default:
            return ("return");
    }
}

function equals(e) {
    if (!doubleEqual) {
        num2 = parseInt(visor.textContent);
    } else {
        num1 = result;
    }    
    doubleOperator = false;
    if (operate() == "return") {
        return;
    }
    if (result > 99999999 || result == Infinity || result == -Infinity) {
        clearAll();
        visor.textContent = "overflow";
        return;
    }
    visor.textContent = result.toString().substring(0, 8);
    chain = false;
    doubleOperator = false;
    doubleEqual = true;
    clearVisor = true;
}

function logOperation(num1, num2, operation, result) {
    logList[3].textContent = logList[2].textContent;
    logList[2].textContent = logList[1].textContent;
    logList[1].textContent = logList[0].textContent;
    logList[0].textContent = `${num1} ${operation} ${num2} =
     ${result.toString().substring(0, 8)}`;
}

function clearLog() {
    for (let index = 0; index < logList.length; index++) {
        logList[index].textContent = "";

    }
}

//create listeners for keyboard

numbers.forEach(element => {
    element.addEventListener("click", getNumber);
});

bkspc.addEventListener("click", backspace);

clear.addEventListener("click", clearAll);

equal.addEventListener("click", equals);

operators.forEach(element => {
    element.addEventListener("click", getOperation);
});