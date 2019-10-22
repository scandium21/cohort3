import { Account, AccountController } from "./account";

let checkingAccount = new Account("checkingAccount", 25);
let accountControl = new AccountController("sc");

test("check Account constructor and methods", () => {
  expect(checkingAccount.getBalance()).toEqual(25);
  expect(checkingAccount.deposit(10)).toEqual(10);
  expect(checkingAccount.getBalance()).toEqual(35);
  expect(checkingAccount.withdraw(30)).toEqual(30);
  expect(checkingAccount.getBalance()).toEqual(5);
  expect(checkingAccount.withdraw(88)).toEqual(5);
  expect(checkingAccount.getBalance()).toEqual(0);
});

test("check AccountController constructor and methods", () => {
  expect(accountControl.checkAccounts()).toEqual([]);
  accountControl.addAccount("carfund", 5000);
  expect(accountControl.checkAccounts()).toEqual([
    new Account("carfund", 5000)
  ]);
  expect(accountControl.removeAccount("carfund")).toEqual(
    new Account("carfund", 5000)
  );
  expect(accountControl.checkAccounts()).toEqual([]);
  expect(accountControl.removeAccount()).toEqual("Account not found");
  accountControl.addAccount("carfund", 5000);
  accountControl.addAccount("saving", 2000);
  accountControl.addAccount("checking", 1000);
  expect(accountControl.checkAccounts()).toEqual([
    new Account("carfund", 5000),
    new Account("saving", 2000),
    new Account("checking", 1000)
  ]);
  expect(accountControl.getTotal()).toEqual(8000);
  expect(accountControl.getHighestAcc()).toEqual(new Account("carfund", 5000));
  expect(accountControl.getLowestAcc()).toEqual(new Account("checking", 1000));
});
