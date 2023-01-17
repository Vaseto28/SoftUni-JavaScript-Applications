import { put } from '../api/api.js';
import { html } from '../lib.js';
import { getById } from '../util.js';

let editTemplate = (card, onEdit) => html`
<section class="editPage">
    <form @submit=${onEdit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" value="${card.name}">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${card.imgUrl}">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" value="${card.price}">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${card.releaseDate}">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" value="${card.artist}">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" value="${card.genre}">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10">${card.description}</textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>`;

export async function showEdit(ctx){
    let id = ctx.params.id;
    let card = await getById(id);

    ctx.render(editTemplate(card, onEdit));

    async function onEdit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {name, imgUrl, price, releaseDate, artist, genre, description} = Object.fromEntries(formData);

        if (!name || !imgUrl || !price || !releaseDate || !artist || !genre || !description){
            return alert("All fields are required!");
        }

        put('/data/albums/' + id, {name, imgUrl, price, releaseDate, artist, genre, description});
        ctx.page.redirect('/details/' + id);
    }
}