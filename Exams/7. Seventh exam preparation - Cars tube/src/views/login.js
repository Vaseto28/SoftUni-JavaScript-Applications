import { login } from '../api/user.js';
import { html } from '../lib.js';
import { updateNav } from './nav.js';

let loginTemplate = (onLogin) => html`
<section id="login">
    <div class="container">
        <form @submit=${onLogin} id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`;

export function showLogin(ctx){
    ctx.render(loginTemplate(onLogin));

    async function onLogin(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {username, password} = Object.fromEntries(formData);

        if (!username || !password){
            return alert('All fields are required!');
        }

        await login(username, password);
        updateNav();
        ctx.page.redirect('/listings');
    }
}