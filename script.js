let num1 = 0;
let operator = "";
let num2 = 0;
let result = 0;
let clearVisor = true;
let chain = false;

const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
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
}

function backspace() {
    visor.textContent = visor.textContent.substring(0, visor.textContent.length - 1);
    if (visor.textContent == "") {
        clearVisor = true;
        visor.textContent = "0";
    }
}

function clearAll() {
    num1 = 0;
    operator = "";
    num2 = 0;
    result = 0;
    clearVisor = true;
    visor.textContent = "0";
}

function getOperation(e) {    
    if (!chain){
        num1 = parseInt(visor.textContent);
        operator = e.currentTarget.id;
        if (operator == "sqr") {
            equals();
            return;
        }
        clearVisor = true;
        chain = true;
    }else {
        equals();
        getOperation(e);
    }

}

function equals(e) {
    num2 = parseInt(visor.textContent);
    switch (operator) {
        case "pow":
            result = num1 ** num2;
            break;
        case "sqr":
            result = Math.sqrt(num1);
            break;
        case "div":
            result = num1 / num2;
            break;
        case "mult":
            result = num1 * num2;
            break;
        case "min":
            result = num1 - num2;
            break;
        case "plus":
            result = num1 + num2;
            break;
        default:
            return;
            break;
    }
    if (result > 99999999) {
        clearAll();
        visor.textContent = "overflow";
        return;
    }
    visor.textContent = result.toString().substring(0, 8);
    chain = false;
    clearVisor = true;
}

numbers.forEach(element => {
    element.addEventListener("click", getNumber);
});

bkspc.addEventListener("click", backspace);

clear.addEventListener("click", clearAll);

equal.addEventListener("click", equals);

operators.forEach(element => {
    element.addEventListener("click", getOperation);
});

