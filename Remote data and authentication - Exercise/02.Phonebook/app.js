function attachEvents() {
    document.getElementById("btnLoad").addEventListener('click', loadPhones);
    document.getElementById("btnCreate").addEventListener('click', createRecord);
}

async function createRecord(){
    let personField = document.getElementById("person");
    let phoneField = document.getElementById("phone");

    let body = {
        person: personField.value,
        phone: phoneField.value
    };

    personField.value = "";
    phoneField.value = "";

    let responce = await fetch("http://localhost:3030/jsonstore/phonebook", {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}

async function loadPhones(){
    let responce = await fetch("http://localhost:3030/jsonstore/phonebook");
    let data = await responce.json();

    let ul = document.getElementById("phonebook");
    ul.innerHTML = "";

    for(let currEntry in data){
        let currLi = document.createElement('li');
        currLi.setAttribute("id", currEntry);
        currLi.textContent = `${data[currEntry].person}: ${data[currEntry].phone}`;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteCurrRecord);

        currLi.appendChild(deleteBtn);

        ul.appendChild(currLi);
    }
}

async function deleteCurrRecord(e){
    let id = e.target.parentElement.id;
    e.target.parentElement.remove();

    let responce = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
        method: "delete",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(null)
    });
}

attachEvents();