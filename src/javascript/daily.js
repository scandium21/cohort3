/*  10/7/19 daily exercise from EvolveU cohort 3
    Write a function that will receive two parameters. The function will compare the parameters and do the following:

    - if the two parameters are equal, log nothing and return true
    - if the two parameters are not equal, log to the console the following and return false:

    “ *** the two values are not the same” and also log the two parameters as follows:
        “p1-->” parameter 1
        “p2-->” parameter 2

*/

//------------------------------------------------------
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

// Write the function after this comment ---
const functions = {
    assertEquals: (p1, p2) => {
        if (p1 === p2) return true;
        let string = `*** the two values are not the same:\n\tp1--> ${p1}\n\tp2--> ${p2}\n`;
        console.log(string);
        return false;
    },


    /* 
        2019 - 10 - 09 daily exercise
        Write a function that will receive an array. The first entree in the array is the first name, the second entree is the last name. The array only has one person in it. Create an evolveu email from the array. 
    */
    makeEmailArr: (name) => {
        let string = name[0].toLowerCase() + "." + name[1].toLowerCase() + "@evolveu.ca";
        return string;
    }
} 

// and before this comment ---

functions.assertEquals("a","b");
functions.assertEquals("a","a");
functions.assertEquals(1,2);
functions.assertEquals(2,2);
functions.assertEquals("2",2);
functions.assertEquals("This value","This value");

export default functions;
