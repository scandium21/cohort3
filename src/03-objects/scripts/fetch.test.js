import { getFirstName } from './fetch.js';

const data = [
  {
    name: 'Victoria',
    surname: 'Friedrichs',
    gender: 'female',
    region: 'Germany'
  },
  { name: 'Lili', surname: 'Bratu', gender: 'female', region: 'Romania' },
  { name: 'Sinan', surname: 'Asan', gender: 'male', region: 'Turkey' },
  { name: 'Mario', surname: 'Silva', gender: 'male', region: 'Colombia' },
  { name: 'Θρασύβουλος', surname: 'Βάμβας', gender: 'male', region: 'Greece' },
  { name: 'Jordan', surname: 'Michel', gender: 'male', region: 'Belgium' },
  { name: 'Santiago de', surname: 'León', gender: 'male', region: 'Mexico' },
  { name: 'Goke', surname: 'Kabir', gender: 'male', region: 'Nigeria' },
  { name: 'Adriana', surname: 'Quezada', gender: 'female', region: 'Mexico' },
  { name: 'Sinan', surname: 'Yılmaz', gender: 'male', region: 'Turkey' }
];

const dataName = [
  'Victoria',
  'Lili',
  'Sinan',
  'Mario',
  'Θρασύβουλος',
  'Jordan',
  'Santiago de',
  'Goke',
  'Adriana',
  'Sinan'
];

test('test getFirstName()', () => {
  expect(getAllFirstNames(data)).toEqual(dataName);
});
