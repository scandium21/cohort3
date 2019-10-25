export class Account {
  constructor(name, initbalance = 0) {
    this.name = name;
    this.balance = initbalance || 0;
  }

  deposit(amt) {
    this.balance += amt;
    return amt;
  }

  withdraw(amt) {
    let remaining = this.balance;
    if (amt >= remaining) {
      this.balance = 0;
      return remaining;
    }
    this.balance -= amt;
    return amt;
  }

  getBalance() {
    return this.balance;
  }
}

export class AccountController {
  constructor(holder = 'Default', accList = []) {
    this.holder = holder;
    this.accList = accList;
  }

  checkAccounts() {
    return this.accList;
  }

  addAccount(name, initbalance = 0) {
    let newAcc = new Account(name, initbalance);
    this.accList.push(newAcc);
    return newAcc;
  }

  removeAccount(name) {
    let toRemove = [];
    this.accList.forEach((acc, index) => {
      if (acc.name === name) toRemove.push(index, acc);
    });
    if (toRemove.length === 0) return 'Account not found';
    this.accList.splice(toRemove[0], 1);
    return toRemove[1];
  }

  getTotal() {
    let sum = this.accList.reduce((acc, b) => {
      return acc + b.getBalance();
    }, 0);
    return sum;
  }

  getHighestAcc() {
    if (this.accList.length === 0) {
      return 'No account found';
    }
    let max = 0;
    let accIndex = 0;
    this.accList.forEach((acc, index) => {
      if (acc.getBalance() > max) {
        max = acc.getBalance();
        accIndex = index;
      }
    });
    return this.accList[accIndex];
  }

  getLowestAcc() {
    if (this.accList.length === 0) {
      return 'No account found';
    }
    let min = this.accList[0].getBalance();
    let accIndex = 0;
    this.accList.forEach((acc, index) => {
      if (acc.getBalance() < min) {
        min = acc.getBalance();
        accIndex = index;
      }
    });
    return this.accList[accIndex];
  }
}
