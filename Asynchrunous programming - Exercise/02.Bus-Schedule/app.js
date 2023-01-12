function solve() {
    let infoBox = document.getElementById("info");
    let departButton = document.getElementById("depart");
    let arriveButton = document.getElementById("arrive");

    let currStop = "depot";
    let globalData = {};

    async function depart() {
        try{
            let responce = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${currStop}`);
            let data = await responce.json();
            globalData = data;

            infoBox.textContent = `Next stop ${data.name}`;
            departButton.disabled = true;
            arriveButton.disabled = false;
        }
        catch{
            infoBox.textContent = `Error`;
        }
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${globalData.name}`;
        currStop = globalData.next;

        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();