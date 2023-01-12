function attachEvents() {
    document.getElementById("refresh").addEventListener('click', loadComments);
    document.getElementById("submit").addEventListener('click', postComment);

    async function loadComments(){
        let responce = await fetch("http://localhost:3030/jsonstore/messenger");
        let data = await responce.json();

        document.getElementById("messages").textContent = Object.values(data).map(x => `${x.author}: ${x.content}`).join('\n');
    }

    async function postComment(){
        let authorField = document.querySelector('input[name="author"]');
        let contentField = document.querySelector('input[name="content"]');

        let body = {
            author: authorField.value,
            content: contentField.value
        };

        authorField.value = "";
        contentField.value = "";

        let responce = await fetch("http://localhost:3030/jsonstore/messenger", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        let data = await responce.json();

        document.getElementById("messages").textContent += `\n${data.author}: ${data.content}`
    }
}

attachEvents();