import { html, nothing } from '../lib.js';
import { getAllMyPosts } from '../util.js';

let cardTemplate = (card) => html`
<div class="post">
    <h2 class="post-title">${card.title}</h2>
    <img class="post-image" src="${card.imageUrl}" alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${card._id}" class="details-btn btn">Details</a>
    </div>
</div>`;

let myPostsTemplate = (posts) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    <div class="my-posts"></div>
        ${posts.length > 0 ? posts.map(x => cardTemplate(x)) : nothing}
    </div>

    ${posts.length === 0 ? html`
    <h1 class="title no-posts-title">You have no posts yet!</h1>` : nothing}
</section>`;

export async function showMyPost(ctx) {
    let user = ctx.user;
    let posts = await getAllMyPosts(user._id);

    ctx.render(myPostsTemplate(posts));
}

