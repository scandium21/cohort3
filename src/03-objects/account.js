class Account {
  constructor(name = 'checkingAccount', balance = 0) {
    this.name = name;
    this.balance = balance;
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

let checkingAccount = new Account('checkingAccount', 25);

export { checkingAccount };
