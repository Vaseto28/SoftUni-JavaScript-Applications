import { html } from "../lib.js";
import { deleteById, getById } from "../util.js";

let detailsTemplate = (pet, user, isOwner, onRemove) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${pet.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: 0$</h4>
            </div>
            ${user ? html`
            <div class="actionBtn"> ${isOwner ? html`
                <a href="edit/${pet._id}" class="edit">Edit</a>
                <a href="javascript:void(0)" @click=${onRemove} class="remove">Delete</a>` : ''}
                <div class="actionBtn">
                    <a href="javascript:void(0)" class="donate">Donate</a>
                </div>`
                : ''}
        </div>
    </div>
</section>`;

export async function showDetails(ctx){
    let id = ctx.params.id;
    let pet = await getById(id);

    let user = ctx.user;
    let isOwner = user && user._id === pet._ownerId;

    ctx.render(detailsTemplate(pet, user, isOwner, onRemove));

    async function onRemove(ctx){
        const choice = confirm("Are you sure you want to delete this pet card?")

        if (choice){
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }
}