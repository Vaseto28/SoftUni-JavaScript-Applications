import { html } from '../lib.js';
import { getAll } from '../util.js';

let cardTemplate = (shoe, isLoggedIn) => html`
<li class="card">
    <img src="${shoe.imageUrl}" alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${shoe.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    <a class="details-btn" href="/details/${shoe._id}">Details</a>
</li>`;

let catalogTemplate = (shoes, isLoggedIn) => html`
<section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
        ${shoes.length > 0 ? shoes.map(x => cardTemplate(x, isLoggedIn)) : html`
        <h2>There are no items added yet.</h2>`}
    </ul>
</section>`;

export async function showCatalog(ctx) {
    let shoes = await getAll();
    let isLoggedIn = ctx.user;

    ctx.render(catalogTemplate(shoes, isLoggedIn));
}