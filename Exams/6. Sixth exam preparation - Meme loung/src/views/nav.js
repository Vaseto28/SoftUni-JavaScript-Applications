import { logout } from '../api/user.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

let navTemplate = (hasUser, onLogout) => html`
<a href="/allMemes">All Memes</a>

${hasUser ? html`
<div class="user">
    <a href="/create">Create Meme</a>
    <div class="profile">
        <span>Welcome, {${hasUser.email}}</span>
        <a href="/myProfile">My Profile</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>
</div>` : html`
<div class="guest">
    <div class="profile">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <a class="active" href="/">Home Page</a>
</div>`}`;

export async function updateNav() {
    let hasUser = await getUserData();

    let parentNode = document.querySelector('nav');
    render(navTemplate(hasUser, onLogout), parentNode);

    async function onLogout(e) {
        e.preventDefault();
        await logout();
        updateNav();
        page.redirect('/');
    }
}