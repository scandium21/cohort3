import { ao } from "./accOps.js";

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", ao.toggleHidden);
  ao.leftPanel.addEventListener("click", e => {
    switch (e.target.id) {
      case "add-acc":
        e.target.disabled = true;
        ao.createRightCard("Creating New Account");
        break;
      case "del-acc":
        ao.delAcc(e.target.parentElement.querySelector("#accounts"));
        break;
      case "show-acc":
        ao.createRightCardShow(
          e.target.parentElement.querySelector("#accounts")
        );
        break;
    }
  });

  ao.rightPanel.addEventListener("click", e => {
    switch (e.target.id) {
      case "submit":
        ao.storeAccInfo(e.target);
        break;
      case "cancel":
        ao.removeRightSide(ao.rightPanel);
        ao.addAcc.disabled = false;
        break;
    }
  });
}
