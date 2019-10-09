let numbers = document.querySelectorAll(".numkey");
let operators = document.querySelectorAll(".operator");
let num1, num2;
let funcToRun = "";
let startNewCalc = true;

const functions = {

    addEventListeners: (arrayOfElements) => {
        for (let i = 0; i<arrayOfElements.length; i++) {
            arrayOfElements[i].addEventListener("click", () => {
                functions.changeInputValue(arrayOfElements[i]);
            });
        }
    },

    changeInputValue: (numkey) => {
        if (startNewCalc) {
            idInput.value = "";
            startNewCalc = false;
        }
        if (idInput.value.startsWith("0") && !idInput.value.includes(".")) idInput.value = "";
        idInput.value += numkey.textContent;
    },

    clear: () => {
        idInput.value = "";
        startNewCalc = true;
    },

    delete: () => { 
        idInput.value = idInput.value.slice(0,length-1);
    },

    calculations: {
        add: (num1, num2) => num1 + num2,

        subtract: (num1, num2) => num1 - num2,

        multiply: (num1,num2) => num1 * num2,

        divide: (num1, num2) => {
            if (num2 === 0)  { alert("Can't divide by ZERO!"); return; }
            return num1 / num2;
        },
    },

    operatorPressed: (operator) => {
        if (idInput.value === "" || idInput.value ===".") return;
        // save the first number
        num1 = parseFloat(idInput.value);
        // clear the input field
        functions.clear();
        // remembers the operator, after user's 2nd input, do calculation
        if (operator.textContent === "+") { funcToRun = "add"; }
        if (operator.textContent === "-") { funcToRun = "subtract"; }
        if (operator.textContent === "*") { funcToRun = "multiply"; }
        if (operator.textContent === "/") { funcToRun = "divide"; }
        // change the class on the operator pressed to change the button style
        operator.classList.add("pressed");
    },

    enterPressed: () => {
        if (idInput.value != "" && idInput.value != ".") {
            num2 = parseFloat(idInput.value);
        }
        if (num1 === undefined || num2 === undefined) { return; }
        let result = functions.calculations[funcToRun](num1,num2);
        idInput.value = Math.round(result*100000)/100000; 
        // reset operator button style
        let opPressed = document.querySelectorAll(".pressed");
        opPressed[0].classList.remove("pressed");
        startNewCalc = true;
        num1 = undefined;
        num2 = undefined;
    },

}

functions.addEventListeners(numbers);
idClear.addEventListener("click", functions.clear);
idDelete.addEventListener("click", functions.delete);
idDot.addEventListener("click", ()=> {
    if (idInput.value.includes(".")) return;
    idInput.value += ".";
});
idInput.addEventListener("keydown", event => {

    // + pressed 
    if (event.keyCode === 187 && event.shiftKey) {
        if (idInput.value === "" || idInput.value ===".") return;
        // save the first number
        num1 = parseFloat(idInput.value);
        // clear the input field
        idInput.value = "";
        funcToRun = "add";
        idPlus.classList.add("pressed");
    }
    // - pressed 
    if (event.keyCode === 189) {
        if (idInput.value === "" || idInput.value ===".") return;
        // save the first number
        num1 = parseFloat(idInput.value);
        // clear the input field
        idInput.value = "";
        funcToRun = "subtract";
        idSubtract.classList.add("pressed");
    }

    // / divide 
    if (event.keyCode === 191) {
        if (idInput.value === "" || idInput.value ===".") return;
        // save the first number
        num1 = parseFloat(idInput.value);
        // clear the input field
        idInput.value = "";
        funcToRun = "divide";
        idDivide.classList.add("pressed");
    }

    // shift + 8 === *
    //document.onkeydown = functions.keydown;
    if (event.keyCode === 56 && event.shiftKey) {
        if (idInput.value === "" || idInput.value ===".") return;
        // save the first number
        num1 = parseFloat(idInput.value);
        // clear the input field
        idInput.value = "";
        funcToRun = "multiply";
        idMultiply.classList.add("pressed");
    }

    
    if (event.keyCode === 13) {
        if (idInput.value != "" && idInput.value != ".") {
            num2 = parseFloat(idInput.value);
        }
        if (num1 === undefined || num2 === undefined) { return; }
        let result = functions.calculations[funcToRun](num1,num2);
        idInput.value = Math.round(result*100000)/100000;
        // reset operator button style
        let opPressed = document.querySelectorAll(".pressed");
        opPressed[0].classList.remove("pressed");
        startNewCalc = true;
        num1 = undefined;
        num2 = undefined;
    }
});
idEnter.addEventListener("click", () => {
    functions.enterPressed();
});
for (let i = 0; i<operators.length; i++) {
    operators[i].addEventListener("click", () => {
        functions.operatorPressed(operators[i]);
    });
}

// code from: https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
      });
    });
  }
  
  // Restrict input to digits and '.' by using a regular expression filter.
  setInputFilter(document.getElementById("idInput"), function(value) {
    return /^\d*\.?\d*$/.test(value);
  });

