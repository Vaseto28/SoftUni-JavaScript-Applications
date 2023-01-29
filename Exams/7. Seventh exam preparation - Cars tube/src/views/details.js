import { del } from '../api/api.js';
import { html, nothing } from '../lib.js';
import { getById } from '../util.js';

let detailsTemlate = (car, isOwner, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${car.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        ${isOwner ? html`
        <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>` : nothing}
    </div>
</section>`;

export async function showDetails(ctx){
    let id = ctx.params.id;
    let car = await getById(id);

    let user = ctx.user;
    let isOwner = false;
    if (user){
        isOwner = user._id === car._ownerId;
    }

    ctx.render(detailsTemlate(car, isOwner, onDelete));

    async function onDelete(e){
        e.preventDefault();

        let choose = confirm('Are you sure you want to delete this car?');

        if (choose){
            await del('/data/cars/' + id);
            ctx.page.redirect('/listings');
        }
    }
}