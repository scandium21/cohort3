export class Account {
  constructor(name, initbalance = 0, id) {
    this.name = name;
    this.balance = initbalance || 0;
    this.id = id;
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

  getAccID() {
    return this.id;
  }
}

export class AccountController {
  constructor(holder = 'Default', accList = []) {
    this.holder = holder;
    this.accList = accList;
  }

  makeCopy() {
    return new AccountController(this.holder, this.accList);
  }

  getAccByID(id) {
    return this.accList.filter(acc => acc.id === id)[0];
  }

  checkAccounts() {
    return this.accList;
  }

  addAccount(name, initbalance = 0, id) {
    let newAcc = new Account(name, initbalance, id);
    this.accList.push(newAcc);
  }

  removeAccount(id) {
    let toRemove = [];
    this.accList.forEach((acc, index) => {
      if (acc.id === id) {
        toRemove.push(acc, index);
      }
    });
    if (toRemove.length === 0) return null;
    this.accList.splice(toRemove[1], 1);
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
