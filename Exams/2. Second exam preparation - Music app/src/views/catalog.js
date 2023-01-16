import { html } from '../lib.js';
import { getAll } from '../util.js';

let cardTemplate = (card, user) => html`
<div class="card-box">
    <img src="${card.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${card.name}</p>
            <p class="artist">Artist: ${card.artist}</p>
            <p class="genre">Genre: ${card.genre}</p>
            <p class="price">Price: $${card.price}</p>
            <p class="date">Release Date: ${card.releaseDate}</p>
        </div>
        ${user ? html`
        <div class="btn-group">
            <a href="/details/${card._id}" id="details">Details</a>
        </div>` : ''}
    </div>
</div>`;

let catalogTemplate = (albums, user) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length === 0 ? html`
    <p>No Albums in Catalog!</p>` : 
    albums.map(x => cardTemplate(x, user))}
</section>`;

export async function showCatalog(ctx){
    let albums = await getAll();

    let user = ctx.user;

    ctx.render(catalogTemplate(albums, user));
}