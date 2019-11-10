import functions from './daily';

/*
Sample data for the next few exercises.
*/

const people = [
  { fname: 'Alex', lname: 'Smith', province: 'BC', age: 33 },
  { fname: 'Angela', lname: 'Jones', province: 'AB', age: 61 },
  { fname: 'Anne', lname: 'Bird', province: 'SK', age: 35 },
  { fname: 'Brent', lname: 'Riddle', province: 'MN', age: 79 },
  { fname: 'Byron', lname: 'Cardenas', province: 'BC', age: 38 },
  { fname: 'Carrie', lname: 'Ramirez', province: 'AB', age: 89 },
  { fname: 'Cheryl', lname: 'Glenn', province: 'SK', age: 70 },
  { fname: 'Dima', lname: 'Curry', province: 'MN', age: 67 },
  { fname: 'Dustin', lname: 'Bullock', province: 'BC', age: 59 },
  { fname: 'Eva', lname: 'Keiths', province: 'AB', age: 24 },
  { fname: 'Faith', lname: 'Liu', province: 'SK', age: 46 },
  { fname: 'Fawad', lname: 'Bowman', province: 'MN', age: 69 },
  { fname: 'Forest', lname: 'Vaughn', province: 'BC', age: 52 },
  { fname: 'Giovanni', lname: 'Browning', province: 'AB', age: 32 },
  { fname: 'Greg', lname: 'Hogan', province: 'SK', age: 55 },
  { fname: 'Harpreet', lname: 'Ramsey', province: 'MN', age: 18 },
  { fname: 'Ian', lname: 'Fitzgerald', province: 'BC', age: 16 },
  { fname: 'James', lname: 'Kramer', province: 'AB', age: 57 },
  { fname: 'Jarvis', lname: 'Ortega', province: 'SK', age: 69 },
  { fname: 'Jawad', lname: 'Huerta', province: 'MN', age: 35 },
  { fname: 'Jinbong', lname: 'Robinson', province: 'BC', age: 26 },
  { fname: 'Jingnan', lname: 'Hatfield', province: 'AB', age: 71 },
  { fname: 'Joe', lname: 'Banks', province: 'SK', age: 37 },
  { fname: 'Kristina', lname: 'Dalton', province: 'MN', age: 73 },
  { fname: 'Latora', lname: 'Matthews', province: 'BC', age: 25 },
  { fname: 'Lauren', lname: 'McClure', province: 'AB', age: 42 },
  { fname: 'Licedt', lname: 'Rasmussen', province: 'SK', age: 30 },
  { fname: 'Linden', lname: 'Pierce', province: 'MN', age: 68 },
  { fname: 'Luis', lname: 'Price', province: 'BC', age: 23 },
  { fname: 'Marcela', lname: 'Perez', province: 'AB', age: 20 },
  { fname: 'Marilou', lname: 'Graham', province: 'SK', age: 32 },
  { fname: 'Matt', lname: 'Novak', province: 'MN', age: 29 },
  { fname: 'Monica', lname: 'Giles', province: 'BC', age: 34 },
  { fname: 'Niloufar', lname: 'Carson', province: 'AB', age: 29 },
  { fname: 'Omar', lname: 'Olson', province: 'SK', age: 69 },
  { fname: 'Roger', lname: 'Woodard', province: 'MN', age: 84 },
  { fname: 'Roman', lname: 'Swanson', province: 'BC', age: 21 },
  { fname: 'Seun', lname: 'Kelly', province: 'AB', age: 60 },
  { fname: 'Shane', lname: 'Frost', province: 'SK', age: 87 },
  { fname: 'Steven', lname: 'Haynes', province: 'MN', age: 47 },
  { fname: 'Thomas', lname: 'Hart', province: 'BC', age: 14 },
  { fname: 'Trent', lname: 'Kerr', province: 'AB', age: 12 },
  { fname: 'Darrell', lname: 'Koch', province: 'SK', age: 10 },
  { fname: 'Tylor', lname: 'Torres', province: 'MN', age: 98 }
];

const data = {
  staff: [
    { fname: 'Jane', lname: 'Smith', balance: 10 },
    { fname: 'Liam', lname: 'Henry', balance: 1000 },
    { fname: 'Emma', lname: 'Jones', balance: 1330 },
    { fname: 'Olivia', lname: 'Notly', balance: 310 },
    { fname: 'Noah', lname: 'Ho', balance: 503 },
    { fname: 'William', lname: 'Lee', balance: 520 },
    { fname: 'Benjamin', lname: 'Amis', balance: 150 }
  ],
  company: 'EvolveU',
  city: 'Calgary',
  prov: 'Alberta'
};

const staffEmailList = [
  'jane.smith@evolveu.ca',
  'liam.henry@evolveu.ca',
  'emma.jones@evolveu.ca',
  'olivia.notly@evolveu.ca',
  'noah.ho@evolveu.ca',
  'william.lee@evolveu.ca',
  'benjamin.amis@evolveu.ca'
];

const testArrLoopFunc = (
  testMessage,
  testFunc,
  testResult = staffEmailList
) => {
  let staffEmailListGen = testFunc(data.staff);
  test(testMessage, () => {
    expect(staffEmailListGen.length).toBe(testResult.length);
    for (let i in staffEmailList) {
      expect(staffEmailListGen[i]).toEqual(testResult[i]);
    }
  });
};

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

expect.extend({
  toBeABorBC(received) {
    const pass = received === 'AB' || received === 'BC';
    if (pass)
      return {
        message: () => `expected ${received} to be either 'AB' or 'BC'`,
        pass: true
      };
    else
      return {
        message: () => `expected ${received} to be either 'AB' or 'BC'`,
        pass: false
      };
  }
});

test('2019-11-08 testing general func getBCandAB()', () => {
  const callback = item => item;
  expect(functions.getBCandAB(people, callback).length).toEqual(22);
  functions.getBCandAB(people, callback).forEach(item => {
    expect(item.province).toBeABorBC();
  });
});

test('2019-11-08 testing getFullName()', () => {
  expect(functions.getFullName(people[0])).toEqual('Alex Smith');
  expect(functions.getFullName(people[2])).toEqual('Anne Bird');
  expect(functions.getFullName(people[5])).toEqual('Carrie Ramirez');
});

test('2019-11-08 testing getBCanAB() with the getFullName() callback', () => {
  expect(functions.getBCandAB(people, functions.getFullName).length).toEqual(
    22
  );
  expect(functions.getBCandAB(people, functions.getFullName)).toEqual([
    'Alex Smith',
    'Angela Jones',
    'Byron Cardenas',
    'Carrie Ramirez',
    'Dustin Bullock',
    'Eva Keiths',
    'Forest Vaughn',
    'Giovanni Browning',
    'Ian Fitzgerald',
    'James Kramer',
    'Jinbong Robinson',
    'Jingnan Hatfield',
    'Latora Matthews',
    'Lauren McClure',
    'Luis Price',
    'Marcela Perez',
    'Monica Giles',
    'Niloufar Carson',
    'Roman Swanson',
    'Seun Kelly',
    'Thomas Hart',
    'Trent Kerr'
  ]);
});

/* 
    2019 - 11- 05
    create a new array for balances >= 1000 from the staff data. 
*/
test('testing getBalAbove()', () => {
  expect(functions.getBalAbove(data.staff).length).toEqual(2);
  expect(functions.getBalAbove(data.staff)).toEqual([
    { fname: 'Liam', lname: 'Henry', balance: 1000 },
    { fname: 'Emma', lname: 'Jones', balance: 1330 }
  ]);
});

/*
  2019 - 10 -29
  Use only the JavaScript built-in functions listed below 
  to complete this exercise. Make sure you write your tests first.

  1. write a function to receive the same array (staff) 
  and return the total of balances
  2. write a function to receive the same array (staff) 
  and return the average the balances

*/

test('testing getTotalBal()', () => {
  expect(functions.getTotalBal(data.staff)).toEqual(3823);
});

test('testing getAvgBal()', () => {
  expect(functions.getAvgBal(data.staff)).toEqual(546.14);
});

/*
    2019 - 10 -25
    loopStaff each / map 
    Do the same assignment again, but this time use callback functions. Use the ‘forEach’ and ‘map’ built-in functions.
*/

// Write your tests here
testArrLoopFunc('testing loopStaffForEach()', functions.loopStaffForEach);
// Write your tests here
testArrLoopFunc('testing loopStaffMap()', functions.loopStaffMap);

/*
  2019 - 10 - 24
  Do the same assignment as the last one using the two forms of the “for” statement. Create your own tests but use the function names that are provided below.
*/
testArrLoopFunc('testing loopStaffIn()', functions.loopStaffIn);
testArrLoopFunc('testing loopStaffOf()', functions.loopStaffOf);

// Write your tests here

/*	
  2019 - 10 -21 Write the function to build email addresses for the company.
*/
testArrLoopFunc('testing loopStaff()', functions.loopStaff);

/* 2019 - 10 - 16,17 test array functions: map(), filter(), reduce()  */
test('more arr functions', () => {
  let arr = ['fire', 'earth', 'air', 'water'];
  let arr2 = ['Monica', 'Rachel', 'Phoebe', 'Chandler', 'Ross', 'Joey'];
  expect(functions.arrSlice1to3(arr)).toEqual(['earth', 'air']);
  expect(functions.arrSliceLastTwo(arr)).toEqual(['air', 'water']);
  expect(functions.arrSpliceInsertOne(arr2, 3, 'SC')).toEqual([
    'Monica',
    'Rachel',
    'Phoebe',
    'SC',
    'Chandler',
    'Ross',
    'Joey'
  ]);
  expect(functions.arrSpliceChangeVal(arr2, 0, 'SC')).toEqual([
    'SC',
    'Rachel',
    'Phoebe',
    'SC',
    'Chandler',
    'Ross',
    'Joey'
  ]);
});

test('testing map, filter, reduce, and sort functions', () => {
  const studentGrades = [
    { name: 'Joe', grade: 88 },
    { name: 'Jen', grade: 94 },
    { name: 'Steph', grade: 77 },
    { name: 'Allen', grade: 60 },
    { name: 'Gina', grade: 54 }
  ];
  const studentLetterGrades = [
    { name: 'Joe', grade: 'b' },
    { name: 'Jen', grade: 'a' },
    { name: 'Steph', grade: 'c' },
    { name: 'Allen', grade: 'd' },
    { name: 'Gina', grade: 'f' }
  ];
  const studentAboveF = [
    { name: 'Joe', grade: 88 },
    { name: 'Jen', grade: 94 },
    { name: 'Steph', grade: 77 },
    { name: 'Allen', grade: 60 }
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
test('basic loop funcs for arrays', () => {
  let arr = ['fire', 'earth', 'air', 'water'];
  expect(functions.arrLoopsFuncs[2](arr)).toEqual(['fire', 'air']);
  expect(functions.arrLoopsFuncs[3](arr)).toEqual(['earth', 'water']);
  expect(functions.arrLoopsFuncs[4](arr)).toEqual(['fire', 'air']);
  expect(functions.arrLoopsFuncs[5](arr)).toEqual([
    'fire-',
    'earth-',
    'air-',
    'water-'
  ]);
  expect(functions.arrLoopsFuncs[6](arr)).toEqual([
    'fire_',
    'earth_',
    'air_',
    'water_'
  ]);
});

/*
    2019 - 10 - 11
	Write the function to format an email based on an object / map
*/

test('email builder from an object / map', () => {
  const name = { fname: 'first', lname: 'last' };
  expect(functions.makeEmailObj(name)).toEqual('first.last@evolveu.ca');
  expect(functions.makeEmailObj({ fname: 'First', lname: 'Last' })).toEqual(
    'first.last@evolveu.ca'
  );
  expect(functions.makeEmailObj({ fname: 'Bill', lname: 'Smith' })).toEqual(
    'bill.smith@evolveu.ca'
  );
});

/*
    2019-10-09 daily exercise: Write a function to format an email based on an array.
*/

test('email builder from an array', () => {
  const name = ['first', 'last'];
  expect(functions.makeEmailArr(name)).toEqual('first.last@evolveu.ca');
  expect(functions.makeEmailArr(['First', 'Last'])).toEqual(
    'first.last@evolveu.ca'
  );
  expect(functions.makeEmailArr(['Bill', 'Smith'])).toEqual(
    'bill.smith@evolveu.ca'
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

test('Check function assertEquals', () => {
  expect(functions.assertEquals(1, 2)).toBe(false);
  expect(functions.assertEquals(1, 1)).toBe(true);
  expect(functions.assertEquals({}, {})).toBe(false);
  expect(functions.assertEquals(NaN, 0 / 0)).toBe(false);
  expect(functions.assertEquals('2', '2')).toBe(true);
  expect(functions.assertEquals(() => {}, () => {})).toBe(false);
});

test('test testing', () => {
  console.log('hello world');
});
