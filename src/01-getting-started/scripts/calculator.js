idInput.value = "0";
let numbers = document.querySelectorAll(".numkey");
let operators = document.querySelectorAll(".operator");
let num1, num2;

const functions = {

    addEventListeners: (arrayOfElements) => {
        for (let i = 0; i<arrayOfElements.length; i++) {
            arrayOfElements[i].addEventListener("click", () => {
                functions.changeInputValue(arrayOfElements[i]);
            });
        }
    },

    changeInputValue: (numkey) => {
        if (idInput.value.startsWith("0") && !idInput.value.includes(".")) idInput.value = "";
        idInput.value += numkey.textContent;
    },

    clear: () => {
        idInput.value = "0";
    },

    delete: () => { 
        idInput.value = idInput.value.slice(0,length-1);
    },

    add: (num) => {

    },

    operatorPressed: (operator) => {
        // save the first number
        num1 = parceFloat(idInput.value);
        // clear the input field
        idInput.value = "";
        // remembers the operator, after user's 2nd input, do calculation, callback function?
        
        // change the class on the operator pressed to change the button style
    }

}

functions.addEventListeners(numbers);
idClear.addEventListener("click", functions.clear);
idDelete.addEventListener("click", functions.delete);
idDot.addEventListener("click", ()=> {
    if (idInput.value.includes(".")) return;
    idInput.value += ".";
});
idInput.addEventListener("keydown", event => {
    if (event.keyCode === 13) {
        if (num1 != undefined && num2 != undefined) {}
    }
});
idEnter.addEventListener("click", () => {
    if (num1 != undefined && num2 != undefined) {
    
    }
});

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

