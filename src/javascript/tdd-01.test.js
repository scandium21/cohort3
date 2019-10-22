import functions from "./tdd-01.js";

test('hello world console.log1', () => {
    console.log("Hello World 1");
});

test('check an array see if it is the same', () => {
    expect([1, 2, 3, 4]).toEqual([1, 2, 3, 4]);
});

test('test emailBuilder', () => {
    expect(functions.emailBuilder('larry', 'shumlich')).toEqual('l.shumlich@evolveu.ca');
});

