import { checkingAccount } from './account';

test('check constructor and methods', () => {
  expect(checkingAccount.getBalance()).toEqual(25);
  expect(checkingAccount.deposit(10)).toEqual(10);
  expect(checkingAccount.getBalance()).toEqual(35);
  expect(checkingAccount.withdraw(30)).toEqual(30);
  expect(checkingAccount.getBalance()).toEqual(5);
  expect(checkingAccount.withdraw(88)).toEqual(5);
  expect(checkingAccount.getBalance()).toEqual(0);
});
