import { html } from '../lib.js';
import { getAll } from '../util.js';

let albumTemplate = (album) => html`
<li class="card">
    <img src="${album.imageUrl}" alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${album.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
    <a class="details-btn" href="/details/${album._id}">Details</a>
</li>`;

let catalogTemplate = (albums) => html`
<section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->
        ${albums.length > 0 ? albums.map(x => albumTemplate(x)) : html`
        <h2>There are no albums added yet.</h2>`}
</section>`;

export async function showCatalog(ctx) {
    let albums = await getAll();

    ctx.render(catalogTemplate(albums));
}