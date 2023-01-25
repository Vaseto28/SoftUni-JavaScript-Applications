import { login } from '../api/user.js';
import { html } from '../lib.js';
import { updateNav } from './nav.js';

let loginTemplate = (onLogin) => html`
<section id="login">
    <form @submit=${onLogin} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function showLogin(ctx){
    ctx.render(loginTemplate(onLogin));

    async function onLogin(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {email, password} = Object.fromEntries(formData);

        if (!email || !password){
            return alert('All fields are required!');
        }

        await login(email, password);
        updateNav();
        ctx.page.redirect('/allMemes');
    }
}