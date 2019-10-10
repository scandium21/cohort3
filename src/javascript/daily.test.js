import functions from "./daily"

/*  10/7/19 daily exercise test from EvolveU cohort 3
    -------------------------------------------------
    Write a function that will receive two parameters. The function will compare the parameters and do the following:

    - if the two parameters are equal, log nothing and return true
    - if the two parameters are not equal, log to the console the following and return false:

    “ *** the two values are not the same” and also log the two parameters as follows:
        “p1-->” parameter 1
        “p2-->” parameter 2

*/

//----------------------------------------------------
/*	
	Write the function that will create this output:

*** the two values are not the same:
    p1--> a
    p2--> b
*** the two values are not the same:
    p1--> 1
    p2--> 2
*** the two values are not the same:
    p1--> 2
    p2--> 2
*/

test("Check function assertEquals", () => {
    expect(functions.assertEquals(1,2)).toBe(false);
    expect(functions.assertEquals(1,1)).toBe(true);
    expect(functions.assertEquals({},{})).toBe(false);
    expect(functions.assertEquals("2","2")).toBe(true);
    expect(functions.assertEquals(()=>{},()=>{})).toBe(false);
});

test("test testing", () => {
    console.log("hello world");
});


/*
    2019-10-09 daily exercise: Write a function to format an email based on an array.
*/

test('email builder from an array', () => {
    const name = ["first", "last"];
    expect(functions.makeEmailArr(name))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailArr(["First", "Last"]))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailArr(["Bill", "Smith"]))
        .toEqual("bill.smith@evolveu.ca");
});