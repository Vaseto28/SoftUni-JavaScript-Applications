import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';
import { logout } from '../api/user.js'

let navTemplate = (hasUser, onLogout) => html`
<nav>
    <a class="active" href="/">Home</a>
    <a href="/listings">All Listings</a>
    <a href="/sortedByYear">By Year</a>
    ${hasUser ? html`
    <div id="profile">
        <a>${'Welcome ' + hasUser.username}</a>
        <a href="/myListings">My Listings</a>
        <a href="/create">Create Listing</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>` : html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`} 
</nav>`;

export async function updateNav(){
    let hasUser = await getUserData();

    let parentNode = document.querySelector('header');

    render(navTemplate(hasUser, onLogout), parentNode);

    async function onLogout(e){
        e.preventDefault();

        await logout();
        updateNav();
        page.redirect('/');
    }
}