import { post } from '../api/api.js';
import { html } from '../lib.js';

let createTemplate = (onCreate) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onCreate} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;

export function showCreate(ctx){
    ctx.render(createTemplate(onCreate));

    async function onCreate(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {brand, model, description, year, imageUrl, price} = Object.fromEntries(formData);

        if (!brand || !model || !description || !year || !imageUrl || !price){
            return alert('All fields are required!');
        }

        await post('/data/cars', {brand, model, description, year, imageUrl, price});
        ctx.page.redirect('/listings');
    }
}