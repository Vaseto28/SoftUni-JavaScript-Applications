async function getInfo() {
    let stopId = document.getElementById("stopId");
    let currBussId = stopId.value;

    let result = document.getElementById("stopName");
    let ul = document.getElementById("buses");

    try{
        let responce = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${currBussId}`);
        let data = await responce.json();

        result.innerText = data.name;

        for(let currId in data.buses){
            let currLi = document.createElement('li');
            currLi.innerText = `Bus ${currId} arrives in ${data.buses[currId]} minutes`;
            ul.appendChild(currLi);
        }
    }
    catch(er){
        result.innerText = "Error";
    }
}