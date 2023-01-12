(async function solution() {
    let mainSection = document.getElementById("main");

    let responce = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    let data = await responce.json();
    
    for(let currEntry of data){
        let currResponce = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${currEntry._id}`);
        let currData = await currResponce.json();

        mainSection.appendChild(createAcordion(currData.title, currData._id, currData.content));
    }

     function showMore(e){
        if(e.target.textContent === 'More'){
            e.target.textContent = 'Less';

            e.target.parentElement.parentElement.children[1].style.display = 'block';
        }
        else{
            e.target.textContent = 'More';

            e.target.parentElement.parentElement.children[1].style.display = 'none';
        }
    }

    function createAcordion(title, id, content){
        let acordionDiv = document.createElement('div');
        acordionDiv.classList.add('accordion');

        let headDiv = document.createElement('div');
        headDiv.classList.add('head');

        let headSpan = document.createElement('span');
        headSpan.textContent = title;

        let btn = document.createElement('button');
        btn.classList.add('button');
        btn.setAttribute('id', id);
        btn.textContent = 'More';
        btn.addEventListener('click', showMore)

        let extraDiv = document.createElement('div');
        extraDiv.classList.add('extra');

        let p = document.createElement('p');
        p.textContent = content;

        headDiv.appendChild(headSpan);
        headDiv.appendChild(btn);

        extraDiv.appendChild(p);

        acordionDiv.appendChild(headDiv);
        acordionDiv.appendChild(extraDiv);

        return acordionDiv;
    }
})()