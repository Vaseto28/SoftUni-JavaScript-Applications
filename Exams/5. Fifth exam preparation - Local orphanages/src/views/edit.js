import { put } from '../api/api.js';
import { html } from '../lib.js';
import { getById } from '../util.js';

let editTemplate = (card, onEdit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onEdit} id="edit">
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" .value=${card.title}>
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" .value=${card.description}>
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" .value=${card.imageUrl}>
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" .value=${card.address}>
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" .value=${card.phone}>
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>`;

export async function showEdit(ctx){
    let id = ctx.params.id;
    let card = await getById(id);

    ctx.render(editTemplate(card, onEdit));

    async function onEdit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {title, description, imageUrl, address, phone} = Object.fromEntries(formData);

        if (!title || !description || !imageUrl || !address || !phone){
            return alert("All fields are required!");
        }

        await put('/data/posts/' + id, {title, description, imageUrl, address, phone});
        ctx.page.redirect('/details/' + id);
    }
}