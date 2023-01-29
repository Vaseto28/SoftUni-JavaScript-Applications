import { put } from '../api/api.js';
import { html } from '../lib.js';
import { getById } from '../util.js';

let editTemplate = (car, onEdit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onEdit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function showEdit(ctx){
    let id = ctx.params.id;
    let car = await getById(id);
    
    ctx.render(editTemplate(car, onEdit));

    async function onEdit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {brand, model, description, year, imageUrl, price} = Object.fromEntries(formData);

        if (!brand || !model || !description || !year || !imageUrl || !price){
            return alert('All fields are required!');
        }

        await put('/data/cars/' + id, {brand, model, description, year, imageUrl, price});
        ctx.page.redirect('/details/' + id);
    }
}