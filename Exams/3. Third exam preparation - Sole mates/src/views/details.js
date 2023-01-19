import { del } from '../api/api.js';
import { html } from '../lib.js';
import { getById } from '../util.js';

let detailsTemlate = (card, isOwnenr, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src="${card.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${card.brand}</span></p>
            <p>
                Model: <span id="details-model">${card.model}</span>
            </p>
            <p>Release date: <span id="details-release">${card.release}</span></p>
            <p>Designer: <span id="details-designer">${card.designer}</span></p>
            <p>Value: <span id="details-value">${card.value}</span></p>
        </div>
        ${isOwnenr ? html`
        <div id="action-buttons">
            <a href="/edit/${card._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)(" id="delete-btn">Delete</a>
        </div>` : ''}
    </div>
</section>`;

export async function showDetails(ctx){
    let id = ctx.params.id;
    let card = await getById(id);

    let user = ctx.user;
    let isOwner = user._id === card._ownerId;

    ctx.render(detailsTemlate(card, isOwner, onDelete));

    async function onDelete(e){
        let choose = confirm("Are you sure youn want to delete this?");

        if (choose){
            e.preventDefault();

            await del('/data/shoes/' + id);
            ctx.page.redirect('/catalog');
        }
    }
}