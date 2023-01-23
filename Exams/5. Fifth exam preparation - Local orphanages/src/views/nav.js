import { logout } from '../api/user.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

let navTemplate = (hasUser, onLogout) => html`
<h1><a href="/">Orphelp</a></h1>

<nav>
    <a href="/catalog">Dashboard</a>
    ${hasUser ? html`
    <div id="user">
        <a href="/myposts">My Posts</a>
        <a href="/create">Create Post</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>` : html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>`;

export async function updateNav() {
    let hasUser = Boolean(await getUserData());

    let parentNode = document.querySelector('header');
    render(navTemplate(hasUser, onLogout), parentNode);

    async function onLogout(e) {
        e.preventDefault();
        await logout();
        updateNav();
        page.redirect('/');
    }
}