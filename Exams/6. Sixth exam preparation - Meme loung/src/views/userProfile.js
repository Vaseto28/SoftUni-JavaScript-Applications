import { html } from '../lib.js';
import { getAllMyPosts } from '../util.js';

let memeTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`;

let userProfileTemplate = (owner, ownerMemes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${owner.gender}.png">
        <div class="user-content">
            <p>Username: ${owner.username}</p>
            <p>Email: ${owner.email}</p>
            <p>My memes count: ${ownerMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${ownerMemes.length > 0 ? ownerMemes.sort((a, b) => b._createdOn - a._createdOn).map(x => memeTemplate(x)) : html`
        <p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;

export async function showUserProfile(ctx) {
    let owner = ctx.user;

    let memes = await getAllMyPosts(owner._id);
    let ownerMemes = memes.filter(x => x._ownerId == owner._id);

    ctx.render(userProfileTemplate(owner, ownerMemes));
}