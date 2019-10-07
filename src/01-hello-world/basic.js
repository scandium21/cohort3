console.log("Hello World from basic.js");

//var button1 = document.getElementById("button1");
//var input1 = document.getElementById("input1");
var h1 = document.getElementById("h1");
button1.addEventListener("click", onButtonClicked);
h1.addEventListener("mouseover", toggleHTML);
h1.addEventListener("mouseleave", toggleHTML);

function onButtonClicked () {
    var num = parseFloat(input1.value) || 0;
    //console.log(num+1);
    size(num);
}

function size (num) {
    if (num < 10) {
        console.log("small");
    }
    else if (num < 20) {
        console.log("med");
    }
    else {
        console.log("large");
    }
}

function toggleHTML() {
    if (h1.innerHTML === "Hello World from HTML")
        h1.innerHTML = "Hello Canada from HTML";
    else 
        h1.innerHTML = "Hello World from HTML";
}