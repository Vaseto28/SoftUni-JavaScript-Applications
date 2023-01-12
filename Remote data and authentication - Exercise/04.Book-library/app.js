document.getElementById('loadBooks').addEventListener('click', getBooks);
let form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    let title = formData.get('title');
    let author = formData.get('author');

    e.target.title.value = "";
    e.target.author.value = "";

    if(!title || !author){
        return;
    }

    let body = {
        title,
        author
    };

    if(e.target.children[0].textContent === "FORM"){
        postBook(body);
    }
    else{
        e.target.children[0].textContent = "FORM";
        e.target.children[5].textContent = "Submit";

        let previousTitle = form.id;
        form.removeAttribute("id");

        // let data = getAllBooks();
        // let id;
        // for(let currEntry in data){
        //     let title = data[currEntry].title;

        //     if(previousTitle === title){
        //         id = currEntry;
        //     }
        // }

        // edit(id, body);
    }
});

// async function edit(id, body){
//     await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//     });

//     getBooks();
// }

async function postBook(body){
    await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    getBooks();
}

async function getBooks(){
    let responce = await fetch('http://localhost:3030/jsonstore/collections/books');

    let data = await responce.json();

    loadBooks(data);
}

function loadBooks(data){
    let table = document.getElementsByTagName('tbody')[0];
    table.innerHTML = "";

    for(let currEntry in data){
        let {author, title} = data[currEntry];

        let currTr = document.createElement('tr');

        let authorTd = document.createElement('td');
        authorTd.textContent = title;

        let titleTd = document.createElement('td');
        titleTd.textContent = author;

        let btnsTd = document.createElement('td');

        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', editBook);

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteBook);

        btnsTd.appendChild(editBtn);
        btnsTd.appendChild(deleteBtn);

        currTr.appendChild(authorTd);
        currTr.appendChild(titleTd);
        currTr.appendChild(btnsTd);

        table.append(currTr);
    }
}

function editBook(e){
    e.preventDefault();
    
    form.children[0].textContent = 'Edit FORM';
    form.children[5].textContent = 'Save';

    let title = e.target.parentElement.parentElement.children[0].textContent;
    let author = e.target.parentElement.parentElement.children[1].textContent;

    form.title.value = title;
    form.author.value = author;

    form.setAttribute("id", title);
}

// async function getNeededId(title){
//     let responce = await fetch('http://localhost:3030/jsonstore/collections/books');

//     let data = await responce.json();

//     for(let currEntry in data){
//         let currTitle = data[currEntry].title;

//         if(currTitle === title){
//             return currEntry;
//         }
//     }
// }

function deleteBook(e){
//     e.preventDefault();
    
//     removeBook(getNeededId(e.target.parentElement.parentElement.children[0].textContent));
//     e.target.parentElement.parentElement.remove();
}

// async function removeBook(id){
//     await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
//         method: "DELETE"
//     });

//     getBooks();
// }