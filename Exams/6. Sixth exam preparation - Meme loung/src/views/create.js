import { post } from '../api/api.js';
import { html } from '../lib.js';

let createTemplate = (onCreate) => html`
<section id="create-meme">
    <form @submit=${onCreate} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export function showCreate(ctx){
    ctx.render(createTemplate(onCreate));

    async function onCreate(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {title, description, imageUrl} = Object.fromEntries(formData);

        if (!title || !description || !imageUrl){
            return alert('All fields are required!');
        }

        await post('/data/memes', {title, description, imageUrl});
        ctx.page.redirect('/allMemes');
    }
}