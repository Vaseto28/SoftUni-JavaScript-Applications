import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js"

let navParent = document.querySelector('header');

export async function updateNav() {
    let user = Boolean(await getUserData());

    let navTemplate = (user, onLogout) => html`
    <nav>
        <div>
            <a href="/catalog">Dashboard</a>
            <a href="/search">Search</a>
        </div>
        ${user ? html`
        <div class="user">
            <a href="/add">Add Pair</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>` : html`
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`}
    </nav>`;

    render(navTemplate(user, onLogout), navParent);
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}