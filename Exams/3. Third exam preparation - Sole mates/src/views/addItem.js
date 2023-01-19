import { post } from '../api/api.js';
import { html } from '../lib.js';

let addTemplate = (onAdd) => html`
<section id="create">
    <div class="form">
        <h2>Add item</h2>
        <form @submit=${onAdd} class="create-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
            <input type="text" name="model" id="shoe-model" placeholder="Model" />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
            <input type="text" name="value" id="shoe-value" placeholder="Value" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export function showCreate(ctx){
    ctx.render(addTemplate(onAdd));

    async function onAdd(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {brand, model, imageUrl, release, designer, value} = Object.fromEntries(formData);

        if (!brand || !model || !imageUrl || !release || !designer || !value){
            return alert("All fields are required!");
        }

        post('/data/shoes', {brand, model, imageUrl, release, designer, value});
        ctx.page.redirect('/catalog');
    }
}