// Write the function after this comment ---
const functions = {
  /*
      2019 - 10 -21 
      Write a function that will take an array and return an array of emails. 
      The new function you are writing today will call makeEmailObj that you have written in a previous exercise
    */
  loopStaff: arr => {
    let list = [];
    arr.forEach(item => {
      let email = functions.makeEmailObj(item);
      list.push(email);
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
      if (student.grade >= 90) student.grade = 'a';
      else if (student.grade >= 80) student.grade = 'b';
      else if (student.grade >= 70) student.grade = 'c';
      else if (student.grade >= 60) student.grade = 'd';
      else student.grade = 'f';
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
      if (student.grade >= 90) return { ...student, grade: 'a' };
      else if (student.grade >= 80) return { ...student, grade: 'b' };
      else if (student.grade >= 70) return { ...student, grade: 'c' };
      else if (student.grade >= 60) return { ...student, grade: 'd' };
      else return { ...student, grade: 'f' };
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
      Monica: 'chef',
      Rachel: 'Personal Buyer',
      Phoebe: 'Masseuse',
      Chandler: 'Manager',
      Ross: 'Paleontologist',
      Joey: 'Actor'
    },
    ['fire', 'earth', 'air', 'water'],
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
        newArr.push(item + '-');
      }
      return newArr;
    },
    function forInLoop(arr) {
      let newArr = [];
      for (let i in arr) {
        newArr.push(arr[i] + '_');
      }
      return newArr;
    }
  ],

  /*
    
	    2019-10-11 Write the function to format an email based on an object / map
    */
  makeEmailObj: name => {
    let names = [];
    names.push(name['fname'].toLowerCase());
    names.push(name['lname'].toLowerCase());
    let string = `${names[0]}.${names[1]}@evolveu.ca`;
    return string;
  },

  /* 
        2019 - 10 - 09 daily exercise
        Write a function that will receive an array. The first entree in the array is the first name, the second entree is the last name. The array only has one person in it. Create an evolveu email from the array. 
    */
  makeEmailArr: name => {
    let string =
      name[0].toLowerCase() + '.' + name[1].toLowerCase() + '@evolveu.ca';
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

functions.assertEquals('a', 'b');
functions.assertEquals('a', 'a');
functions.assertEquals(1, 2);
functions.assertEquals(2, 2);
functions.assertEquals('2', 2);
functions.assertEquals('This value', 'This value');

export default functions;
