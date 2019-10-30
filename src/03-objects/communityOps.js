import { City, Community } from "./city_community.js";

export const co = {
  // define UI var
  leftPanel: document.querySelector(".left-panelc"),
  rightPanel: document.querySelector(".right-panelc"),
  addCity: document.querySelector("#add-city"),
  select: document.querySelector("#cities"),
  lastKey: 0,
  // key-city pair for server
  keys: [],
  cityCtrl: new Community(),
  url: "http://localhost:5000/",
  // show/hide starting UI elements
  toggleHidden: () => {
    let hidden = true;
    let hiddenElems = co.leftPanel.querySelectorAll(".hidden2");
    if (co.cityCtrl.getNumOfCities() === 0) {
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
  //retrieve and process server data
  async retrieveData() {
    let initdata = await co.postData(co.url + "all");
    // initdata operation
    /* data format :  
    [ 
      {
        city: 
        {
          name: 'Beijing', 
          latitude: 39.913818, 
          longitude: 116.363625, 
          population: 20035455 
        },
        key: 1,
      }
   ]
    */
    if (initdata.length !== 0) {
      // getting the cities
      initdata.forEach((item, index) => {
        co.cityCtrl.createCity(
          item.city["name"],
          item.city["latitude"],
          item.city["longitude"],
          item.city["population"]
        );
        co.populateSelect(co.cityCtrl);
        co.keys.push({
          [item.key]: Community.createCityFromClass(
            item.city["name"],
            item.city["latitude"],
            item.city["longitude"],
            item.city["population"]
          )
        });
        co.lastKey = item.key;
        console.log(co.keys[co.keys.length - 1]);
      });
      co.createRightCardShow(co.select.options[co.select.selectedIndex]);
      co.cityCtrl.changeCommunityName("Group 1");
    }
    console.log(co.cityCtrl);
    //console.log(co.keys);
    return co.cityCtrl;
  },

  async postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    // parses JSON response into native JavaScript objects
    const json = await response.json();
    json.status = response.status;
    json.statusText = response.statusText;
    // console.log(json, typeof(json));
    return json;
  },

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

  // create label
  createLabel: text => {
    let l = document.createElement("label");
    l.id = text.split(" ").reduce((acc, item) => {
      if (item.charAt(0) < `A` || item.charAt(0) > `z`) {
        return (acc += "");
      } else {
        return (acc += item.toLowerCase().replace(":", ""));
      }
    }, "");
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

  // create button with the passed classname
  createButton: id => {
    let btn = document.createElement("button");
    btn.id = `${id}${
      co.rightPanel.querySelectorAll(`#${id}`).length > 0
        ? co.rightPanel.querySelectorAll(`#${id}`).length
        : ""
    }`;
    let name = id.charAt(0).toUpperCase() + id.slice(1);
    btn.appendChild(document.createTextNode(name));

    return btn;
  },

  createAddCityUI(text) {
    // HTML creating element functions have all been tested by running this func
    let rc = co.createDiv("new-city", "new-city");
    co.rightPanel.appendChild(rc);
    rc.appendChild(co.createH2(text));
    rc.appendChild(co.createLabel("Name: "));
    rc.appendChild(co.createInput("in-name", "text"));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(co.createLabel("Latitude: "));
    rc.appendChild(co.createInput("in-lat", "number"));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(co.createLabel("Longitude: "));
    rc.appendChild(co.createInput("in-long", "number"));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(co.createLabel("Population: "));
    rc.appendChild(co.createInput("in-pop", "number"));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(co.createButton("submit"));
    rc.appendChild(co.createButton("cancel"));
  },

  // check repeated names
  duplicateCity: city => {
    let dup = false;
    co.cityCtrl.getCities().forEach(item => {
      if (item.show() === city.show()) {
        dup = true;
      }
    });
    return dup;
  },

  // populate select once accounts are added
  populateSelect: cityCtrl => {
    let cityList = co.leftPanel.querySelector("#cities");
    let city = cityCtrl.getCities()[cityCtrl.getCities().length - 1];
    let opt = document.createElement("option");
    opt.text = city.getName();
    opt.value = city.getName().replace(/\s/g, "");
    opt.id = co.createOptID(city);
    cityList.insertBefore(opt, cityList.children[0]);
    cityList.children[0].selected = "selected";
    return opt;
  },

  // remove right side once user submit new acc info
  removeRightSide: rightPanel => {
    while (rightPanel.firstChild) {
      rightPanel.removeChild(rightPanel.firstChild);
    }
  },

  toggleDisableAdd: add => {
    if (add.disabled) {
      add.disabled = false;
    } else {
      add.disabled = true;
    }
    return add.disabled;
  },

  async storeCityInfo(right) {
    let cityName = right.querySelector("#in-name");
    let cityLat = right.querySelector("#in-lat");
    let cityLong = right.querySelector("#in-long");
    let cityPop = right.querySelector("#in-pop");
    let newCity = new City(
      cityName.value,
      parseFloat(cityLat.value) || 0,
      parseFloat(cityLong.value) || 0,
      parseFloat(cityPop.value) || 0
    );
    if (cityName.value === "") {
      alert("Must enter valid name!");
      return;
    }
    // check duplicate cities
    if (co.duplicateCity(newCity)) {
      alert("City already exists!");
      return;
    }
    if ((parseFloat(cityPop.value) || 0) < 0) {
      alert(`Can't go negative on population!`);
      return;
    }
    co.cityCtrl.createCity(
      cityName.value,
      parseFloat(cityLat.value) || 0,
      parseFloat(cityLong.value) || 0,
      parseFloat(cityPop.value) || 0
    );
    co.populateSelect(co.cityCtrl);
    co.toggleHidden();
    // remove right portion
    co.removeRightSide(co.rightPanel);
    co.toggleDisableAdd(co.addCity);
    let cityAdded = co.cityCtrl.getCities()[co.cityCtrl.getCities().length - 1];
    // write to server
    co.saveToServer(co.cityCtrl, cityAdded);
    console.log(co.keys);
    return co.cityCtrl;
  },

  async saveToServer(cityCtrl, lastCity) {
    //console.log(lastCity);
    let toSave = { key: ++co.lastKey, city: lastCity };
    //console.log(toSave);
    await co.postData(co.url + "add", toSave);
  },

  // get account by name
  getCityByOptID: optID => {
    return co.cityCtrl.getCities().filter(city => {
      let id = co.createOptID(city);
      return id === optID;
    })[0];
  },

  // create right card to display account info
  createRightCardShow: cityOpt => {
    // get account
    let cityToShow = co.getCityByOptID(cityOpt.id);
    // create generic wrapper
    let rc = co.createDiv("show-city-r", "show-city-r");
    co.rightPanel.appendChild(rc);
    rc.appendChild(co.createH2(`${cityOpt.text}`));
    rc.appendChild(co.createLabel(`Latitude: ${cityToShow.getLat()}`));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(co.createLabel(`Longitude: ${cityToShow.getLong()}`));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(co.createLabel(`Population: ${cityToShow.getPop()}`));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(co.createLabel(`Move out: `));
    rc.appendChild(co.createInput("city-out-num", "number"));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(co.createButton("confirm"));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(co.createLabel(`Move in: `));
    rc.appendChild(co.createInput("city-in-num", "number"));
    //rc.appendChild(document.createElement('br'));
    rc.appendChild(document.createElement("br"));
    rc.appendChild(co.createButton("confirm"));
    return rc;
  },

  // update single acc bal
  async updateCityPop(input, optID) {
    let city = co.getCityByOptID(optID);
    let popLabel = co.rightPanel.querySelector("#population");
    let amt = parseFloat(input.value) || 0;
    if (amt <= 0 || !Number.isInteger(amt)) {
      alert("Please enter valid amount!");
      return;
    }
    if (input.id === "city-in-num") {
      popLabel.textContent = `Population: ${city.movedIn(amt)}`;
    }
    if (input.id === "city-out-num") {
      let pop = city.getPop();
      city.movedOut(amt);
      if (amt > pop) {
        let newL = co.createLabel(``);
        co.rightPanel.appendChild(document.createElement("br"));
        co.rightPanel.appendChild(document.createElement("br"));
        co.rightPanel.appendChild(newL);
        newL.textContent = `Entire population moved out!`;
      }
      popLabel.textContent = `Population: ${city.getPop()}`;
    }
    input.value = "";
    // reset city id
    let cityopt = co.select.options[co.select.selectedIndex];
    cityopt.id = co.createOptID(city);
    // update pop in the server
    await co.updatePopToServer(optID, city);
    return city.getPop();
  },

  // update population info to server
  async updatePopToServer(optID, cityOfChange) {
    let keyToChange = co.getKeyByCityOptID(optID);
    let uContent = { key: keyToChange, city: cityOfChange };
    await co.postData(co.url + "update", uContent);
  },

  // get key of the city in the server
  getKeyByCityOptID(optID) {
    // locate city and its key value
    let ckey = co.keys.filter(item => {
      let city = Object.values(item)[0];
      let cID = co.createOptID(city);
      return cID === optID;
    });
    let keyToRetrieve = parseInt(Object.keys(ckey[0])[0]);
    return keyToRetrieve;
  },

  // delete selected account
  async delCity(cities) {
    let cID = cities.options[cities.selectedIndex].id;
    let cityR = co.getCityByOptID(cID);
    let keyToRemove = co.getKeyByCityOptID(cID);
    co.removeRightSide(co.rightPanel);
    cities.removeChild(cities.options[cities.selectedIndex]);
    let nextToShow = cities.children[0];
    if (nextToShow) co.createRightCardShow(nextToShow);
    let removedCity = co.cityCtrl.deleteCity(cityR);
    co.toggleHidden();
    // update the deletion in the server
    await co.postData(co.url + "delete", { key: keyToRemove });

    return removedCity;
  },

  // get total balance
  getTotalPop: cityCtrl => {
    let rc = co.createDiv("show-totalpop", "show-totalpop");
    co.rightPanel.appendChild(rc);
    rc.appendChild(co.createH2(`Total Population in Community`));
    rc.appendChild(
      co.createLabel(`Total Population: ${cityCtrl.getPopulation()}`)
    );
    rc.appendChild(document.createElement("br"));
    let cityNum = co.cityCtrl.getCities().length;
    if (cityNum > 0) {
      rc.appendChild(co.createH2(`Individual City Population`));
      for (let c of cityCtrl.getCities()) {
        rc.appendChild(co.createLabel(`${c.getName()}: ${c.getPop()}`));
        rc.appendChild(document.createElement("br"));
      }
    }
    return cityCtrl.getPopulation();
  },

  // create cityID by giving the city
  createOptID(city) {
    let id =
      city.getName().replace(/\s/g, "") +
      Math.round(Math.abs(city.getLat())) +
      Math.round(Math.abs(city.getLong())) +
      city.getPop();
    return id;
  },

  // get northest and southest city
  getNorth: cityCtrl => {
    let city = cityCtrl.getMostNorthern();
    let cityOptID = co.createOptID(city);
    let cityOpt = co.leftPanel.querySelector(`#${cityOptID}`);
    co.removeRightSide(co.rightPanel);
    co.createRightCardShow(cityOpt);
    return cityCtrl.getMostNorthern();
  },

  getSouth: cityCtrl => {
    let city = cityCtrl.getMostSouthern();
    let cityOptID = co.createOptID(city);
    let cityOpt = co.leftPanel.querySelector(`#${cityOptID}`);
    co.removeRightSide(co.rightPanel);
    co.createRightCardShow(cityOpt);
    return cityCtrl.getMostSouthern();
  }
};
