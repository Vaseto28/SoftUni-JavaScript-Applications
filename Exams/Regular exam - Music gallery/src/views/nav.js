import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';
import { logout } from '../api/user.js'

let navTemplate = (hasUser, onLogout) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

<nav>
  <div>
    <a href="/catalog">Dashboard</a>
  </div>
  ${hasUser ? html`
  <div class="user">
    <a href="/create">Add Album</a>
    <a @click=${onLogout} href="javascript:void(0)">Logout</a>
  </div>` : html`
  <div class="guest">
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