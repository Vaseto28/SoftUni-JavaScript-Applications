import { put } from '../api/api.js';
import { html } from '../lib.js';
import { getById } from '../util.js';

let editTemplate = (meme, onEdit) => html`
<section id="edit-meme">
    <form @submit=${onEdit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}></textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function showEdit(ctx){
    let id = ctx.params.id;
    let meme = await getById(id);

    ctx.render(editTemplate(meme, onEdit));

    async function onEdit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {title, description, imageUrl} = Object.fromEntries(formData);

        if (!title || !description || !imageUrl){
            return alert('All fields are required!');
        }

        await put('/data/memes/' + id, {title, description, imageUrl});
        ctx.page.redirect('/details/' + id);
    }
}