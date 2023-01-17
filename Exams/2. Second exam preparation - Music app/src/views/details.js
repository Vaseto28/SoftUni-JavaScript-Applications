import { del } from '../api/api.js';
import { html } from '../lib.js';
import { getById } from '../util.js';

let detailsTemplate = (card, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${card.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${card.name}</h1>
                <h3>Artist: ${card.artist}</h3>
                <h4>Genre: ${card.genre}</h4>
                <h4>Price: $${card.price}</h4>
                <h4>Date: ${card.releaseDate}</h4>
                <p>Description: ${card.description}</p>
            </div>
            ${isOwner ? html`
            <div class="actionBtn">
                <a href="/catalog/edit/${card._id}" class="edit">Edit</a>
                <a href="javascript:void(0)" @click=${onDelete} class="remove">Delete</a>
            </div>` : ''}
        </div>
    </div>
</section>`;

export async function showDetails(ctx){
    let id = ctx.params.id;
    let card = await getById(id);

    let isOwner = ctx.user._id === card._ownerId;

    ctx.render(detailsTemplate(card, isOwner, onDelete));

    async function onDelete(){
        let choice = confirm("Are you sure you want to delete this card?");

        if (choice){
            del('/data/albums/' + id);
            ctx.page.redirect('/catalog');
        }
    }
}   