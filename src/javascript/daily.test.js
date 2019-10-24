import functions from "./daily";

/*
Sample data for the next few exercises.
*/

const data = {
  staff: [
    { fname: "Jane", lname: "Smith", balance: 10 },
    { fname: "Liam", lname: "Henry", balance: 1000 },
    { fname: "Emma", lname: "Jones", balance: 1330 },
    { fname: "Olivia", lname: "Notly", balance: 310 },
    { fname: "Noah", lname: "Ho", balance: 503 },
    { fname: "William", lname: "Lee", balance: 520 },
    { fname: "Benjamin", lname: "Amis", balance: 150 }
  ],
  company: "EvolveU",
  city: "Calgary",
  prov: "Alberta"
};

const staffEmailList = [
  "jane.smith@evolveu.ca",
  "liam.henry@evolveu.ca",
  "emma.jones@evolveu.ca",
  "olivia.notly@evolveu.ca",
  "noah.ho@evolveu.ca",
  "william.lee@evolveu.ca",
  "benjamin.amis@evolveu.ca"
];

const testArrLoop = (textMessage, testFunc) => {
  let staffEmailListGen = testFunc(data.staff);
  test(textMessage, () => {
    expect(staffEmailListGen.length).toBe(staffEmailList.length);
    for (let i in staffEmailList) {
      expect(staffEmailList[i]).toEqual(staffEmailListGen[i]);
    }
  });
};

/*
  2019 - 10 - 24
  Do the same assignment as the last one using the two forms of the “for” statement. Create your own tests but use the function names that are provided below.
*/
testArrLoop("testing loopStaffIn()", functions.loopStaffIn);
testArrLoop("testing loopStaffOf()", functions.loopStaffOf);

// Write your tests here

/*	
  2019 - 10 -21 Write the function to build email addresses for the company.
*/
testArrLoop("testing loopStaffOf()", functions.loopStaff);

/* 2019 - 10 - 16,17 test array functions: map(), filter(), reduce()  */
test("more arr functions", () => {
  let arr = ["fire", "earth", "air", "water"];
  let arr2 = ["Monica", "Rachel", "Phoebe", "Chandler", "Ross", "Joey"];
  expect(functions.arrSlice1to3(arr)).toEqual(["earth", "air"]);
  expect(functions.arrSliceLastTwo(arr)).toEqual(["air", "water"]);
  expect(functions.arrSpliceInsertOne(arr2, 3, "SC")).toEqual([
    "Monica",
    "Rachel",
    "Phoebe",
    "SC",
    "Chandler",
    "Ross",
    "Joey"
  ]);
  expect(functions.arrSpliceChangeVal(arr2, 0, "SC")).toEqual([
    "SC",
    "Rachel",
    "Phoebe",
    "SC",
    "Chandler",
    "Ross",
    "Joey"
  ]);
});

test("testing map, filter, reduce, and sort functions", () => {
  const studentGrades = [
    { name: "Joe", grade: 88 },
    { name: "Jen", grade: 94 },
    { name: "Steph", grade: 77 },
    { name: "Allen", grade: 60 },
    { name: "Gina", grade: 54 }
  ];
  const studentLetterGrades = [
    { name: "Joe", grade: "b" },
    { name: "Jen", grade: "a" },
    { name: "Steph", grade: "c" },
    { name: "Allen", grade: "d" },
    { name: "Gina", grade: "f" }
  ];
  const studentAboveF = [
    { name: "Joe", grade: 88 },
    { name: "Jen", grade: 94 },
    { name: "Steph", grade: 77 },
    { name: "Allen", grade: 60 }
  ];
  const grades = [60, 55, 80];
  expect(functions.arrMap(studentGrades)).toEqual(studentLetterGrades);
  expect(functions.arrFilter(studentGrades)).toEqual(studentAboveF);
  expect(functions.arrForEachModify(studentGrades)).toEqual(
    studentLetterGrades
  );
  expect(functions.arrReduce(grades)).toEqual(195);
  expect(functions.arrSort(grades)).toEqual([55, 60, 80]);
});

/* 2019 - 10 - 15 test array basic loop functions  */
test("basic loop funcs for arrays", () => {
  let arr = ["fire", "earth", "air", "water"];
  expect(functions.arrLoopsFuncs[2](arr)).toEqual(["fire", "air"]);
  expect(functions.arrLoopsFuncs[3](arr)).toEqual(["earth", "water"]);
  expect(functions.arrLoopsFuncs[4](arr)).toEqual(["fire", "air"]);
  expect(functions.arrLoopsFuncs[5](arr)).toEqual([
    "fire-",
    "earth-",
    "air-",
    "water-"
  ]);
  expect(functions.arrLoopsFuncs[6](arr)).toEqual([
    "fire_",
    "earth_",
    "air_",
    "water_"
  ]);
});

/*
    2019 - 10 - 11
	Write the function to format an email based on an object / map
*/

test("email builder from an object / map", () => {
  const name = { fname: "first", lname: "last" };
  expect(functions.makeEmailObj(name)).toEqual("first.last@evolveu.ca");
  expect(functions.makeEmailObj({ fname: "First", lname: "Last" })).toEqual(
    "first.last@evolveu.ca"
  );
  expect(functions.makeEmailObj({ fname: "Bill", lname: "Smith" })).toEqual(
    "bill.smith@evolveu.ca"
  );
});

/*
    2019-10-09 daily exercise: Write a function to format an email based on an array.
*/

test("email builder from an array", () => {
  const name = ["first", "last"];
  expect(functions.makeEmailArr(name)).toEqual("first.last@evolveu.ca");
  expect(functions.makeEmailArr(["First", "Last"])).toEqual(
    "first.last@evolveu.ca"
  );
  expect(functions.makeEmailArr(["Bill", "Smith"])).toEqual(
    "bill.smith@evolveu.ca"
  );
});

/*  2019 - 10 -07 daily exercise test from EvolveU cohort 3
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
  expect(functions.assertEquals(1, 2)).toBe(false);
  expect(functions.assertEquals(1, 1)).toBe(true);
  expect(functions.assertEquals({}, {})).toBe(false);
  expect(functions.assertEquals(NaN, 0 / 0)).toBe(false);
  expect(functions.assertEquals("2", "2")).toBe(true);
  expect(functions.assertEquals(() => {}, () => {})).toBe(false);
});

test("test testing", () => {
  console.log("hello world");
});
