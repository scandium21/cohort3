import { Account, AccountController } from "./account.js";

export const ao = {
  // define UI var
  leftPanel: document.querySelector(".left-panel"),
  rightPanel: document.querySelector(".right-panel"),
  addAcc: document.querySelector("#add-acc"),
  select: document.querySelector("#accounts"),
  accCtrl: new AccountController(),
  // create h2 elem
  createH2: text => {
    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(`${text}`));
    return h2;
  },

  // create div with the passed classname
  createDiv: (className, id) => {
    let div = document.createElement("div");
    div.className = className;
    div.id = id;
    return div;
  },

  // create button with the passed classname
  createButton: id => {
    let btn = document.createElement("button");
    btn.id = id;
    let name = id.charAt(0).toUpperCase() + id.slice(1);
    btn.appendChild(document.createTextNode(name));
    return btn;
  },

  // create label
  createLabel: text => {
    let l = document.createElement("label");
    l.textContent = text;
    return l;
  },

  // create input field of certain id
  createInput: (id, type) => {
    let input = document.createElement("input");
    input.id = id;
    input.type = type;
    return input;
  },

  // create right card
  createRightCard: text => {
    // create generic wrapper
    let rc = ao.createDiv("new-acc", "new-acc");
    rc.appendChild(ao.createH2(text));
    rc.appendChild(ao.createLabel("Account Name: "));
    rc.appendChild(ao.createInput("new-acc-name", "text"));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(ao.createLabel("Initial Deposit: "));
    rc.appendChild(ao.createInput("new-acc-init-bal", "number"));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(ao.createButton("submit"));
    rc.appendChild(ao.createButton("cancel"));
    ao.rightPanel.appendChild(rc);
    return rc;
  },

  // get account by name
  getAccByName: accName => {
    return ao.accCtrl.checkAccounts().filter(acc => {
      return acc.name === accName;
    })[0];
  },

  // create right card to display account info
  createRightCardShow: accounts => {
    // get account
    let accToShow = ao.getAccByName(
      accounts.options[accounts.selectedIndex].text
    );
    // create generic wrapper
    let rc = ao.createDiv("show-acc-r", "show-acc-r");
    rc.appendChild(
      ao.createH2(`${accounts.options[accounts.selectedIndex].text}`)
    );
    rc.appendChild(ao.createLabel(`Current balance: `));
    ao.rightPanel.appendChild(rc);
    return rc;
  },

  // show/hide elements
  toggleHidden: () => {
    let hidden = true;
    let hiddenElems = document.querySelectorAll(".hidden");
    if (ao.accCtrl.checkAccounts().length === 0) {
      hiddenElems.forEach(item => {
        item.style.display = "none";
      });
      hidden = true;
    } else {
      hiddenElems.forEach(item => {
        item.style.display = "block";
      });
      hidden = false;
    }
    return hidden;
  },

  // populate select once accounts are added
  populateSelect: accCtrl => {
    let accnts = ao.leftPanel.querySelector("#accounts");
    let acc = accCtrl.checkAccounts()[accCtrl.checkAccounts().length - 1];
    let opt = document.createElement("option");
    opt.text = acc.name;
    opt.value = acc.name.replace(/\s/g, "");
    accnts.insertBefore(opt, accnts.children[0]);
    return opt;
  },

  // remove right side once user submit new acc info
  removeRightSide: rightPanel => {
    while (rightPanel.firstChild) {
      rightPanel.removeChild(rightPanel.firstChild);
    }
  },

  // check repeated names
  duplicateAccName: accname => {
    let dup = false;
    ao.accCtrl.checkAccounts().forEach(item => {
      if (item.name.toLowerCase() === accname.toLowerCase()) {
        dup = true;
      }
    });
    return dup;
  },

  toggleDisableAdd: add => {
    if (add.disabled) {
      add.disabled = false;
    } else {
      add.disabled = true;
    }
    return add.disabled;
  },

  // store user input to create new account
  storeAccInfo: btn => {
    let accName = btn.parentElement.querySelector("#new-acc-name");
    let accInitBal = btn.parentElement.querySelector("#new-acc-init-bal");
    if (accName.value === "") {
      alert("Must enter valid name!");
      return;
    }
    // check duplicate acc name
    if (ao.duplicateAccName(accName.value)) {
      alert("Account name already exists, please choose another one.");
      return;
    }
    if ((parseFloat(accInitBal.value) || 0) < 0) {
      alert(`Can't go negative on balance!`);
      return;
    }
    ao.accCtrl.addAccount(accName.value, parseFloat(accInitBal.value) || 0);
    ao.populateSelect(ao.accCtrl);
    ao.toggleHidden();
    // remove right portion
    ao.removeRightSide(ao.rightPanel);
    ao.toggleDisableAdd(ao.addAcc);
    return ao.accCtrl;
  },

  // delete selected account
  delAcc: accounts => {
    let accName = accounts.options[accounts.selectedIndex].text;
    // let confirmed = window.confirm(
    //   `Are you sure to delete the account: ${accName}?`
    // );
    // if (!confirmed) return;
    ao.removeRightSide(ao.rightPanel);
    accounts.removeChild(accounts.options[accounts.selectedIndex]);
    let removedAcc = ao.accCtrl.removeAccount(accName);
    ao.toggleHidden();
    return removedAcc;
  }
};
