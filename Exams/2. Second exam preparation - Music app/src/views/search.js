import { get } from '../api/api.js';
import { html } from '../lib.js';

let searchTemplate = (isLoggedIn, card, onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    
    ${card ? html`
    <div class="search-result">
        <div class="card-box">
            <img src="${card.imgUrl}">
            <div>
                <div class="text-center">
                    <p class="name">Name: ${card.name}</p>
                    <p class="artist">Artist: ${card.artist}</p>
                    <p class="genre">Genre: ${card.genre}</p>
                    <p class="price">Price: $${card.price}</p>
                    <p class="date">Release Date: ${card.releaseDate}</p>
                </div>
                ${isLoggedIn ? html`
                <div class="btn-group">
                    <a href="/details/${card._id}" id="details">Details</a>
                </div>` : ''}
            </div>
        </div>
    </div>` : html`
    <div class="search-result">
        <p class="no-result">No result.</p>`}
    </div>
</section>`;

export async function showSearch(ctx){
    let isLoggedIn;
    let card;

    async function onSearch(){
        let desiredName = document.getElementById('search-input').value;

        if (!desiredName){
            return alert("All fields are required!");
        }

        card = await get('/data/albums?where=name%20LIKE%20%22${query}%22');

        isLoggedIn = ctx.user._id;
        ctx.render(searchTemplate(isLoggedIn, card, onSearch));
    }

    ctx.render(searchTemplate(isLoggedIn, card, onSearch));
}