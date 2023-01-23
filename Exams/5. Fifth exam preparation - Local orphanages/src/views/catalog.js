import { html } from '../lib.js';
import { getAll } from '../util.js';

let cardTemplate = (card) => html`
<div class="post">
    <h2 class="post-title">${card.title}</h2>
    <img class="post-image" src="${card.imageUrl}" alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${card._id}" class="details-btn btn">Details</a>
    </div>
</div>`;

let catalogTemplate = (cards) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>

    <!-- Display a div with information about every post (if any)-->
    <div class="all-posts">
        ${cards.length > 0 ? cards.map(x => cardTemplate(x)) : html`
        <h1 class="title no-posts-title">No posts yet!</h1>`}
</section>`;

export async function showCatalog(ctx) {
    let cards = await getAll();

    ctx.render(catalogTemplate(cards));
}