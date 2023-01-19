import { get } from '../api/api.js';
import { html } from '../lib.js';

let searchTemplate = (onSearch) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${onSearch} class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>
        <!-- Display an h2 if there are no posts -->
        <h2>There are no results found.</h2>
    </div>
</section>`;

export function showSearch(ctx){
    ctx.render(searchTemplate(onSearch));

    async function onSearch(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {searchedBrand} = Object.fromEntries(formData);

        if (!searchedBrand){
            return alert("All fields are required");
        }

        await get('/data/shoes?where=brand%20LIKE%20%22${query}%22');
    }
}