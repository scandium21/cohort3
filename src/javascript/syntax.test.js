import functions from "./syntax"

test('Check function add, subtract, divide and multiply', () => {
    // this set of tests are for number and string data types
    expect(functions.add(1,4)).toBe(5); 
    expect(functions.divide(4,2)).toBe(2); 
    expect(functions.multiply(3,7)).toBe(21); 
    expect(functions.subtract(1,4)).toBe(-3); 
    expect(functions.add("1","4")).toBe("14");
});

test('Check functions about strings, if/else conditional and undefined', () => {
    // test the understanding of boolean, undefined, string and if/else statement
    expect(functions.stringLen("hi there")).toBe(8);
    expect(functions.ifLargerThanFive(18)).toBe(true);
    expect(functions.toggleTrueFalse(true)).toBe(false);
    expect(functions.undefinedVar()).toBe("undefined");
    expect(functions.undefinedReturn()).toBe(undefined);
});

test('Check functions on array', () => {
    let testArray = [null, undefined, 1, ()=> {}];
    let testArray2 = ["a", 23, true];
    let testArr2String = "[hi 23 true ]";
    expect(functions.arrayAddToFront("hi there", testArray)).toBe(testArray[0]);
    expect(functions.arrayAddToEnd("hi there", testArray )).toBe(testArray[-1]);
    expect(functions.arrayUpdateValue(testArray2,0,"hi")).toBe(testArr2String);
});

test('Check functions on loop and object', () => {
    let obj = { a:3, b:5, c:9};
    // used for ... in ... loop
    expect(functions.printObjProperties(obj)).toBe("359");
    // while and do.. while... loop. 
    // if argument passed to func > 0, while loop gets run, else (do... while...) gets run
    expect(functions.whileAndDoWhile(-3)).toBe("DoWhileRun");
    expect(functions.whileAndDoWhile(3)).toBe("WhileRun");
});

test('Check functions on maps', () => {
    let myMap = new Map();
    let keyString = "a string", 
        keyObj = {},
        keyFunc = () => {};
    // setting the values
    myMap.set(keyString, "value associated with 'a string'");
    myMap.set(keyObj, 'value associated with keyObj');
    myMap.set(keyFunc, 'value associated with keyFunc');

    expect(myMap.size).toBe(3);
    expect(myMap.get(keyString)).toBe("value associated with 'a string'");
    expect(myMap.get(keyObj)).toBe("value associated with keyObj");
    expect(myMap.get(keyFunc)).toBe("value associated with keyFunc");
    // because keyString === 'a string'
    expect(myMap.get('a string')).toBe("value associated with 'a string'");
    // undefined, because keyObj !== {}
    expect(myMap.get({})).toBe(undefined);
    // undefined, because keyFunc !== function () {}
    expect(myMap.get(function() {})).toBe(undefined);
});