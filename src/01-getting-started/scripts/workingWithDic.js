let prov = {
    AB:"Alberta",
    BC:"British Columbia",
    MB:"Manitoba",
    NB:"New Brunswick",
    NL:"Newfoundland and Labrador",
    NS:"Nova Scotia",
    ON:"Ontario",
    PE:"Prince Edward Island",
    SK:"Saskatchewan",
    QC: "Quebec",
    NT:"Northwest Territories",
    NU:"Nunavut",
    YT:"Yukon",
};

const lookUp = () => {
    let input = idDicInput.value.toUpperCase();
    if (input.length === 0) {
        printMessage("Please enter province code ~");
        return;
    }
    if (prov[input] === undefined) {
        printMessage("Province not found by that code.");
        return;
    }
    printMessage(`${input} - ${prov[input]}`);
    return prov[input];
}

const printMessage = (string) => {
    idDicMessageArea.textContent = string;
}

let lookUpBtn = document.querySelector(".dicBtns");

lookUpBtn.addEventListener("click", ()=>{
    lookUp();
});

