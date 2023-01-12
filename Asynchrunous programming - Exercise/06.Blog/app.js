function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener('click', getPosts);
    document.getElementById("btnViewPost").addEventListener('click', showPosts);
}

async function showPosts(){
    let selectedPost = document.getElementById('posts').value;
    
    let postResponce = await fetch('http://localhost:3030/jsonstore/blog/posts');
    let postData = await postResponce.json();

    let currPost = Object.keys(postData).find(x => x === selectedPost);

    let commentsResponce = await fetch('http://localhost:3030/jsonstore/blog/comments');
    let commentsData = await commentsResponce.json();

    let neededComments = Object.keys(commentsData).filter(x => commentsData[x].postId === selectedPost);

    document.getElementById('post-title').textContent = postData[currPost].title;
    document.getElementById('post-body').textContent = postData[currPost].body;

    let commentsUl = document.getElementById('post-comments');
    commentsUl.innerHTML = "";

    for(let currComment of neededComments){
        let currLi = document.createElement('li');
        currLi.setAttribute('id', currComment);
        currLi.textContent = commentsData[currComment].text;

        commentsUl.appendChild(currLi);
    }
}

async function getPosts(){
    let selectField = document.getElementById('posts'); 
    selectField.innerHTML = "";
    let postsResponce = await fetch('http://localhost:3030/jsonstore/blog/posts');
    let postsData = await postsResponce.json();

    Object.values(postsData).forEach(post => {
        let newOption = document.createElement('option');
        newOption.setAttribute('value', post.id);
        newOption.textContent = post.title;

        selectField.appendChild(newOption);
    });
}

attachEvents();