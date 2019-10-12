let numArr = [];
let defaultMessage = "Message Area";

const workArrFunc = {

    displayMessage: (string) => {
        idArrMessageArea.textContent = string;
    },

    // check if the input is a number, if it is push the number to array, else return nothing.
    // in both cases display the message
    checkNPush: (idArrInput) => {
        let input = idArrInput.value;
        if (input === "") {
            workArrFunc.displayMessage(`Please input some value ~`);
            return;
        }
        if(!workArrFunc.checkNumeric(input)) {
            workArrFunc.clearInput();
            workArrFunc.displayMessage(`${input} is not a valid number :)`);
            return;
        }
        numArr.push(parseFloat(input));
        workArrFunc.clearInput();
        workArrFunc.displayMessage(`${input} is added to the array :)`);
        return numArr;
    },

    checkNumeric: (string) => {
        for(let c of string) {
            if (c < '0' || c > '9') return false;
        }
        return true;
    },

    // clear input value
    clearInput: () => {
        idArrInput.value = "";
    },

    // show the content of the array
    show: (numArr) => {
        workArrFunc.clearInput();
        workArrFunc.displayMessage(defaultMessage);
        let string = "[";
        for (let i =0; i < numArr.length; i += 1) {
            if (i === numArr.length - 1) string = string + numArr[i];
            else string = string + numArr[i] + " ";
        }
        string += "]";
        workArrFunc.displayMessage("Current array: " + string);
    },

    // calculate the sum of all array elements
    total: (numArr) => {
        let sum = 0;
        for (let num of numArr) {
            sum += num;
        }
        workArrFunc.displayMessage(`Sum of all array elements: ${sum}`);
        return sum;
    },

    // clear the array
    clearArray: () => {
        numArr = [];
        workArrFunc.displayMessage(defaultMessage);
        return numArr;
    }
}

let btns = document.querySelectorAll(".arrBtns");
for (let i = 0; i < btns.length; i+=1) {
    btns[i].addEventListener("click", () => {
        if (btns[i].textContent === "Add") {
            workArrFunc.checkNPush(idArrInput);
        } else if (btns[i].textContent === "Show") {
            workArrFunc.show(numArr);
        } else if (btns[i].textContent === "Total") {
            workArrFunc.total(numArr);
        } else {
            workArrFunc.clearArray();
        }
    })
}


