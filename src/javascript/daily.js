// Write the function after this comment ---
function sortAlphabet(a, b) {
  return a.str > b.str ? 1 : a.str === b.str ? 0 : -1;
}
const sortReverseAlphabet = (a, b) =>
  a.origin > b.origin ? -1 : a.origin < b.origin ? 1 : 0;

const functions = {
  /*
    2019 - 11 - 22
    Write 3 functions:  1) Anonymous function 2) Named function, 3) Arrow function.
    Write these functions to complete the following exercise.  
    Sort the array:
      1. By number ascending, using anonymous function
      2. By fruit alphabetic, using named function
      3. By origin reverse alphabetic, using arrow function

    let myArray = [
      {num: 5,str: "apples", origin:"BC"},
      {num: 7,str: "oranges", origin:"Florida"},
      {num: 2,str: "lemons", origin:"Mexico"},
      {num: 8,str: "bananas", origin:"Ecuador"},
      {num: 6,str: "avocados", origin:"Mexico"},
      {num: 4,str: "pineapple", origin:"Brazil"},
      {num: 3,str: "blueberries", origin:"Chile"},
      {num: 9,str: "pears", origin:"Oregon"},
      {num: 1,str: "cantaloupe", origin:"California"}
    ];
    //
    // Do the statements below 3 times, one for each type of function
    //
    myArray.sort(.....enter code here
    );
    console.log("myArray = ", myArray);
  */

  anonymousNumAscending: arr => arr.sort((a, b) => a.num - b.num),
  namedAlphabetic: arr => arr.sort(sortAlphabet),
  arrowReverseAlphabetic: arr => arr.sort(sortReverseAlphabet),
  /*
    2019 - 11- 21
    Based on callback exercise, part 1, now write a function using the generic callback function
     which returns an object of the total number of people, total age, and the average age of people from BC and Alberta only. 
  */

  getCalcData: arr => {
    return {
      totalAge: arr.reduce((acc, i) => acc + i.age, 0),
      avgAge: arr.reduce((acc, i) => acc + i.age, 0) / arr.length,
      totalPop: arr.length
    };
  },

  // another way to write the generic func:
  getBCandAB2: (arr, callback) =>
    callback(arr.filter(i => i.province === "AB" || i.province === "BC")),
  /*
    2019 - 11 - 08

    Hypothetically; You are working for a private company who looks after demographics of people 
    living in BC and Alberta only.  The data you received is from the 4 Western provinces. 
    You want to write a generalized function that loops through the data and only does a 
    “callback” for the people from BC or Alberta.

    Write two functions: 
    1. a generic function to process all of the people from the Western 4 provinces and only
    “callback” for people from BC or Alberta.  
    This is a generic function that will be used over and over again. How will we test this?

    2. a function that will be the “callback” function that will create an array of 
    full names (first and last together). How will we test this?

    Your tests should ensure each function works on it’s own and then that they 
    work properly together.

*/
  getBCandAB: (arr, callback) => {
    const result = [];
    arr.forEach(item => {
      if (item.province === "BC" || item.province === "AB")
        result.push(callback(item));
    });
    return result;
  },

  getFullName: item => {
    return `${item.fname} ${item.lname}`;
  },
  /* 
    2019 - 11- 05
    create a new array for balances >= 1000 from the staff data. 
  */
  getBalAbove: arr => {
    return arr.filter(item => item.balance >= 1000);
  },

  /*
  2019 - 10 -29
  Use only the JavaScript built-in functions listed below 
  to complete this exercise. Make sure you write your tests first.

  1. write a function to receive the same array (staff) 
  and return the total of balances
  2. write a function to receive the same array (staff) 
  and return the average the balances

  */

  getTotalBal: arr => {
    return arr.reduce((acc, i) => acc + i.balance, 0);
  },
  getAvgBal: arr => {
    return Math.round((functions.getTotalBal(arr) / arr.length) * 100) / 100;
  },

  /*
    2019 - 10 -25
    loopStaff each / map 
    Do the same assignment again, but this time use callback functions. Use the ‘forEach’ and ‘map’ built-in functions.
  */

  loopStaffForEach: arr => {
    let list = [];

    arr.forEach(item => {
      list.push(functions.makeEmailObj(item));
    });

    return list;
  },

  loopStaffMap: arr => {
    let list = arr.map(item => {
      return functions.makeEmailObj(item);
    });
    return list;
  },

  /*
  2019 - 10 -24
    Do the same assignment as the last one using the two forms of the “for” statement. Create your own tests but use the function names that are provided below.
  */

  loopStaffIn: arr => {
    let list = [];
    for (let index in arr) {
      let email = functions.makeEmailObj(arr[index]);
      list.push(email);
    }
    return list;
  },

  loopStaffOf: arr => {
    let list = [];
    for (let item of arr) {
      let email = functions.makeEmailObj(item);
      list.push(email);
    }
    return list;
  },

  /*
      2019 - 10 -21 
      Write a function that will take an array and return an array of emails. 
      The new function you are writing today will call makeEmailObj that you have written in a previous exercise
    */
  loopStaff: arr => {
    let list = arr.map(item => {
      return functions.makeEmailObj(item);
    });

    return list;
  },

  /*  2019 - 10 - 16-17
        Read the documentation on the following and create examples of each one:
            slice
            splice

            forEach
            map
            reduce
            filter
            sort
    */
  // slice: arr.slice([begin[, end]])
  arrSlice1to3: arr => {
    return arr.slice(1, 3);
  },

  arrSliceLastTwo: arr => {
    return arr.slice(-2);
  },

  // splice:
  // var arrDeletedItems = array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
  arrSpliceInsertOne: (arr, index, newValue) => {
    arr.splice(index, 0, newValue);
    return arr;
  },

  arrSpliceChangeVal: (arr, index, newValue) => {
    arr.splice(index, 1, newValue);
    return arr;
  },

  // forEach()
  // arr.forEach(callback(currentValue [, index [, array]])[, thisArg]);
  arrForEachModify: arr => {
    arr.forEach(student => {
      if (student.grade >= 90) student.grade = "a";
      else if (student.grade >= 80) student.grade = "b";
      else if (student.grade >= 70) student.grade = "c";
      else if (student.grade >= 60) student.grade = "d";
      else student.grade = "f";
    });
    return arr;
  },

  // map():
  /* var new_array = arr.map(function callback(currentValue[, index[, array]]) {
        //Return element for new_array
       }[, thisArg])
    */
  arrMap: arr => {
    let newArr = arr.map(student => {
      if (student.grade >= 90) return { ...student, grade: "a" };
      else if (student.grade >= 80) return { ...student, grade: "b" };
      else if (student.grade >= 70) return { ...student, grade: "c" };
      else if (student.grade >= 60) return { ...student, grade: "d" };
      else return { ...student, grade: "f" };
    });
    return newArr;
  },

  // filter():
  // var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
  arrFilter: arr => {
    let newArr = arr.filter(student => {
      return student.grade >= 60;
    });
    return newArr;
  },

  // reduce()
  // arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
  arrReduce: arr => {
    const total = arr.reduce((acc, item) => acc + item);
    return total;
  },

  // sort()
  //
  arrSort: arr => {
    arr.sort((a, b) => a - b);
    return arr;
  },

  /*
        2019 - 10 - 15
        Basics
            for
            while
            do while
        Next Level
            for in
            for of
    */
  arrLoopsFuncs: [
    {
      Monica: "chef",
      Rachel: "Personal Buyer",
      Phoebe: "Masseuse",
      Chandler: "Manager",
      Ross: "Paleontologist",
      Joey: "Actor"
    },
    ["fire", "earth", "air", "water"],
    function forFunc(arr) {
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) newArr.push(arr[i]);
      }
      return newArr;
    },
    function whileFunc(arr) {
      let newArr = [];
      let counter = 0;
      while (counter < arr.length) {
        if (counter % 2 === 1) newArr.push(arr[counter]);
        counter += 1;
      }
      return newArr;
    },
    function doWhileFunc(arr) {
      let newArr = [];
      let counter = 0;
      do {
        if (counter % 2 === 0) newArr.push(arr[counter]);
        counter += 1;
      } while (counter < arr.length);
      return newArr;
    },
    function forOfLoop(arr) {
      let newArr = [];
      for (let item of arr) {
        newArr.push(item + "-");
      }
      return newArr;
    },
    function forInLoop(arr) {
      let newArr = [];
      for (let i in arr) {
        newArr.push(arr[i] + "_");
      }
      return newArr;
    }
  ],

  /*
    
	    2019-10-11 Write the function to format an email based on an object / map
    */
  makeEmailObj: name => {
    let names = [];
    names.push(name["fname"].toLowerCase());
    names.push(name["lname"].toLowerCase());
    let string = `${names[0]}.${names[1]}@evolveu.ca`;
    return string;
  },

  /* 
        2019 - 10 - 09 daily exercise
        Write a function that will receive an array. The first entree in the array is the first name, the second entree is the last name. The array only has one person in it. Create an evolveu email from the array. 
    */
  makeEmailArr: name => {
    let string =
      name[0].toLowerCase() + "." + name[1].toLowerCase() + "@evolveu.ca";
    return string;
  },

  /*  2019 - 10 - 7 daily exercise from EvolveU cohort 3
    Write a function that will receive two parameters. The function will compare the parameters and do the following:

    - if the two parameters are equal, log nothing and return true
    - if the two parameters are not equal, log to the console the following and return false:

    “ *** the two values are not the same” and also log the two parameters as follows:
        “p1-->” parameter 1
        “p2-->” parameter 2

    */
  assertEquals: (p1, p2) => {
    if (p1 === p2) return true;
    let string = `*** the two values are not the same:\n\tp1--> ${p1}\n\tp2--> ${p2}\n`;
    console.log(string);
    return false;
  }
};

// and before this comment ---

functions.assertEquals("a", "b");
functions.assertEquals("a", "a");
functions.assertEquals(1, 2);
functions.assertEquals(2, 2);
functions.assertEquals("2", 2);
functions.assertEquals("This value", "This value");

export default functions;
