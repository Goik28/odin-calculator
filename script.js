let num1 = 0;
let operator = "";
let num2 = 0;
let result = 0;

const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const bkspc = document.getElementById("bkspc");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");
let visor = document.getElementById("visor");

function getNumber(e) {
    if (visor.textContent == "0") {
        visor.textContent = "";
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
        visor.textContent = "0";
    }
}

function clearVisor() {
    visor.textContent = "0";
}

function getOperation(e) {
    if (num1 != 0) {
        num1 = parseInt(visor.textContent);
        operator = e.currentTarget.id;
        clearVisor();
    } else {
        num2 = parseInt(visor.textContent);
        equals();
        operator = e.currentTarget.id;
    }
}

function equals(e) {

}

numbers.forEach(element => {
    element.addEventListener("click", getNumber);
});

bkspc.addEventListener("click", backspace);

clear.addEventListener("click", clearVisor);

operators.forEach(element => {
    element.addEventListener("click", getOperation);
});

