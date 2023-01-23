import { del } from '../api/api.js';
import { html, nothing } from '../lib.js';
import { getById } from '../util.js';

let detailsTemplate = (user, isOwner, card, onDelete) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src="${card.imageUrl}" alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${card.title}</h2>
                <p class="post-description">Description: ${card.description}</p>
                <p class="post-address">Address: ${card.address}</p>
                <p class="post-number">Phone number: ${card.phone}</p>
                <p class="donate-Item">Donate Materials: 0</p>

                ${isOwner ? html`
                <div class="btns">
                    <a href="/edit/${card._id}" class="edit-btn btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>
                </div>` : nothing}
                ${user ? html`
                <div class="btns">
                    <a href="javascript:void(0)" class="donate-btn btn">Donate</a>
                </div>` : nothing}
            </div>
        </div>
    </div>
</section>`;

export async function showDetails(ctx){
    let id = ctx.params.id;
    let card = await getById(id);

    let user = ctx.user;
    
    let isOwner;
    if (user){
        isOwner = user && user._id === card._ownerId;
    }

    ctx.render(detailsTemplate(user, isOwner, card, onDelete));

    async function onDelete(e){
        e.preventDefault();

        let choose = confirm('Are you sure you want tp delete this?');

        if (choose){
            await del('/data/posts/' + id);
            ctx.page.redirect('/catalog');
        }
    }
}