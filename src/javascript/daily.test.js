import assertEquals from "./daily"

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
    expect(assertEquals(1,2)).toBe(false);
    expect(assertEquals(1,1)).toBe(true);
    expect(assertEquals({},{})).toBe(false);
    expect(assertEquals("2","2")).toBe(true);
    expect(assertEquals(()=>{},()=>{})).toBe(false);
});