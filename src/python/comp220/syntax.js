/*
    define attributes / variables
        number
        string
        boolean
        array
        dictionary / objects
        undefined
    sample if / else
    functions
        parameters
        returns
    arrays
        add to the front
        add to the end
        update values
    loops 
        for
        for/in
        while
        do while
        forEach (with array and function)
    Objects / Dictionaries
        declare object
        lookup key to retrieve value
*/

const functions = {

    // add, subtract, divide, and multiply to test the number types
    add: (p1, p2) => {
        return p1+p2;
    },

    subtract: (p1,p2) => {
        return p1-p2;
    },

    divide: (p1,p2) => {
        return p1/p2;
    },
    
    multiply: (p1,p2) => {
        return p1*p2;
    },

    // return the length of a string
    stringLen: (s) => {
        return s.length;
    },

    // understanding boolean
    ifLargerThanFive: (num) => {
        return num>5;
    },

    // understanding if/else and boolean
    toggleTrueFalse: (OnOrOff) => {
        if (OnOrOff) OnOrOff = !OnOrOff;
        return OnOrOff;
    },

    // understanding declared but not initialized variable
    undefinedVar: () => {
        let a;
        return (typeof a);
    },

    // if a function has no return value, it returns undefined
    undefinedReturn: () => {
        console.log("This function returns undefined");
    },

    // add new item to front of array
    arrayAddToFront: (item, arr) => {
        arr.unshift(item);
        return arr[0];
    },

    // add new item to end of array
    arrayAddToEnd: (item, arr) => {
        arr.push(item);
        return arr[-1];
    },

    // how to update the value of an array item at given index
    arrayUpdateValue: (arr, index, newValue) => {
        arr.splice(index,1,newValue);
        return functions.ArrayToString(arr);
    },

    // for loop
    ArrayToString: (arr) => {
        let ArrString = "[";
        for (let i =0; i<arr.length; i++) {
            ArrString += arr[i];
            ArrString += " ";
        }
        ArrString += "]";
        return ArrString;
    },

    // object + for...in... loop
    printObjProperties: (obj) => {
        let string = "";
        for (let proper in obj) {
            string += obj[proper];
        }
        return string;
    },

    // while and do.. while ... loops
    whileAndDoWhile: (num) => {
        let counter = 0;
        let doWhile = false;
        if (counter >= num) {
            do {
                doWhile = true;
                counter += 1;
            } while (counter < num)
        } else {
            while (counter < num) {
                doWhile = false;
                counter += 200;
            }
        }
            
        return doWhile? "DoWhileRun":"WhileRun";
    }
};

export default functions;

/* 
    steps:
        write a stub
        write a test that fails
        write the code for the test to pass
        run the test
        repeat
        refactoring
*/