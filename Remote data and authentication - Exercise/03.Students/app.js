function attachEvents(){
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();

        let form = e.target;

        let FirstName = form.firstName.value;
        let LastName = form.lastName.value;
        let FacultyNumber = form.facultyNumber.value;
        let Grade = form.grade.value;

        if(!FirstName || !LastName || !FacultyNumber || !Grade){
            return;
        }

        if(typeof FirstName === 'string' && typeof LastName === 'string' && typeof FacultyNumber === 'string' && Number.isInteger(Grade)){
            Grade = Number(Grade);

            let student = {
                FirstName,
                LastName,
                FacultyNumber,
                Grade
            };

            request(student);
        }
        else{
            return;
        }
    });

    async function request(student){
        await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        let getResponce = await fetch('http://localhost:3030/jsonstore/collections/students');

        let data = await getResponce.json();

        appendOnTheTable(data);
    }

    function appendOnTheTable(data){
        let table = document.getElementById("results").children[1];
        table.innerHTML = "";

        for(let currEntry in data){
            let {FirstName, LastName, FacultyNumber, Grade} = data[currEntry];
            let currTr = document.createElement('tr');

            let nameTd = document.createElement('td');
            nameTd.textContent = FirstName;

            let lastNameTd = document.createElement('td');
            lastNameTd.textContent = LastName;

            let facultyNumberTd = document.createElement('td');
            facultyNumberTd.textContent = FacultyNumber;

            let gradeTd = document.createElement('td');
            gradeTd.textContent = Grade;

            currTr.appendChild(nameTd);
            currTr.appendChild(lastNameTd);
            currTr.appendChild(facultyNumberTd);
            currTr.appendChild(gradeTd);

            table.appendChild(currTr);
        }
    }
}

attachEvents();