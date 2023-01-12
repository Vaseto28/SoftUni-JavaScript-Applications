async function lockedProfile() {
    let responce = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    let data = await responce.json();

    let mainArea = document.getElementById("main");
    mainArea.innerHTML = null;

    let number = 1;

    for(let currProfileDetails in data){
        let [id, username, email, age] = Object.values(data[currProfileDetails]);
        mainArea.appendChild(createProfile(id, username, email, age, number))
        number++;
    }

    function showMoreInformation(e){
        if(e.target.textContent === "Show more"){
            if (e.target.parentElement.children[4].checked){
                e.target.textContent = "Hide it";

                e.target.parentElement.children[9].style.display = 'block';
            }
        }
        else{
            if (e.target.parentElement.children[4].checked){
                e.target.textContent = "Show more";

                e.target.parentElement.children[9].style.display = 'none';
            }
        }
    }

    function createProfile(id, username, email, age, number){
        let profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        let img = document.createElement('img');
        img.setAttribute("src", "./iconProfile2.png");
        img.classList.add("userIcon");
        
        let lockLabel = document.createElement('label');
        lockLabel.textContent = 'Lock';

        let lockInput = document.createElement('input');
        lockInput.setAttribute("type", "radio");
        lockInput.setAttribute("name", `user${number}Locked`);
        lockInput.setAttribute("value", "lock");
        lockInput.setAttribute("checked", "checked");

        let unlockLabel = document.createElement('label');
        unlockLabel.textContent = 'Unlock';

        let unlockInput = document.createElement('input');
        unlockInput.setAttribute("type", "radio");
        unlockInput.setAttribute("name", `user${number}Locked`);
        unlockInput.setAttribute("value", "unlock");

        let br = document.createElement('br');

        let hr = document.createElement('hr');

        let usernameLabel = document.createElement('label');
        usernameLabel.textContent = "Username";

        let usernameInput = document.createElement('input');
        usernameInput.setAttribute("type", "text");
        usernameInput.setAttribute("name", `user${number}Username`);
        usernameInput.setAttribute("value", username);
        usernameInput.setAttribute("disabled", true);
        usernameInput.setAttribute("readonly", true);

        let idDiv = document.createElement('div');
        idDiv.setAttribute('id', id);

        let secondHr = document.createElement('hr');

        let emailLabel = document.createElement('label');
        emailLabel.textContent = "Email:";

        let emailInput = document.createElement('input');
        emailInput.setAttribute("type", "email");
        emailInput.setAttribute("name", `user${number}Emial`);
        emailInput.setAttribute("value", email);
        emailInput.setAttribute("disabled", true);
        emailInput.setAttribute("readonly", true);

        let ageLabel = document.createElement('label');
        ageLabel.textContent = "Age:";

        let ageInput = document.createElement('input');
        ageInput.setAttribute("type", "email");
        ageInput.setAttribute("name", `user${number}Age`);
        ageInput.setAttribute("value", age);
        ageInput.setAttribute("disabled", true);
        ageInput.setAttribute("readonly", true);

        let showMoreBtn = document.createElement('button');
        showMoreBtn.textContent = 'Show more';
        showMoreBtn.addEventListener('click', showMoreInformation);

        idDiv.appendChild(secondHr);
        idDiv.appendChild(emailLabel);
        idDiv.appendChild(emailInput);
        idDiv.appendChild(ageLabel);
        idDiv.appendChild(ageInput);

        idDiv.style.display = 'none';

        profileDiv.appendChild(img);
        profileDiv.appendChild(lockLabel);
        profileDiv.appendChild(lockInput);
        profileDiv.appendChild(unlockLabel);
        profileDiv.appendChild(unlockInput);
        profileDiv.appendChild(br);
        profileDiv.appendChild(hr);
        profileDiv.appendChild(usernameLabel);
        profileDiv.appendChild(usernameInput);
        profileDiv.appendChild(idDiv);
        profileDiv.appendChild(showMoreBtn);

        return profileDiv;
    }
}