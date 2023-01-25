import { del } from '../api/api.js';
import { html, nothing } from '../lib.js';
import { getById } from '../util.js';

let detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>
            ${isOwner ? html`
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} href="javascript:void(0)" class="button danger">Delete</button>` : nothing}
        </div>
    </div>
</section>`;

export async function showDetails(ctx){
    let id = ctx.params.id;
    let meme = await getById(id)

    let user = ctx.user;

    let isOwner = false;
    if (user){
        isOwner = user._id === meme._ownerId;
    }

    ctx.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete(e){
        e.preventDefault();

        let choose = confirm('Are you sure you want to delete this meme?');

        if (choose){
            await del('/data/memes/' + id);
            ctx.page.redirect('/allMemes');
        }
    }
}