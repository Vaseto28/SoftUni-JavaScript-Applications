import {html} from '../lib.js';
import { getAll } from '../util.js';

export async function showCatalog(ctx){
    let cards = await getAll();

    let cardTemplate = (pet) => html`
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src="${pet.image}">
        </article>
        <h2 class="name">${pet.name}</h2>
        <h3 class="breed">${pet.breed}</h3>
        <div class="action">
            <a class="btn" href="/catalog/${pet._id}">Details</a>
        </div>
    </div>`;

    let catalogTemplate = () => html`
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
        ${cards.length !== 0 ? cards.map(cardTemplate) : html`
            <div>
                <p class="no-pets">No pets in dashboard</p>
            </div>`
        }
        </div>
    </section>`;

    ctx.render(catalogTemplate());
}