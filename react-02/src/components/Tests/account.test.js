import { AccountController } from '../Accounts/account';

test('testing AccountController', () => {
  const accC = new AccountController();
  accC.addAccount('checking', 234, 1);
  expect(accC.checkAccounts().length).toBe(1);
  console.log(accC);
});
