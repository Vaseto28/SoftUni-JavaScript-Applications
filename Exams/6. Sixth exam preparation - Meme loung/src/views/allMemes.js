import { html } from '../lib.js';
import { getAll } from '../util.js';

let memeTemplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`;

let allMemesTemplate = (memes) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes.length > 0 ? memes.sort((a, b) => b._createdOn - a._createdOn).map(x => memeTemplate(x)) : html`
        <p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;

export async function showAllMemes(ctx) {
    let memes = await getAll();

    ctx.render(allMemesTemplate(memes));
}