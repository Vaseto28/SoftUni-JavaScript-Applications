import { html } from '../lib.js';
import { getAllMyListings } from '../util.js';

let singleCarTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src="${car.imageUrl}">
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

let myListingsTemplate = (userCars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        <!-- Display all records -->
        ${userCars.length > 0 ? userCars.map(x => singleCarTemplate(x)) : html`
        <p class="no-cars"> You haven't listed any cars yet.</p>`}
    </div>
</section>`;

export async function showMyListings(ctx) {
    let userId = ctx.user._id;
    let userCars = await getAllMyListings(userId);

    ctx.render(myListingsTemplate(userCars));
}