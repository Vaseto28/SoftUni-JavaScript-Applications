import { register } from '../api/user.js';
import { html } from '../lib.js';
import { updateNav } from './nav.js';

let registerTemplate = (onRegister) => html`
<section id="register-page" class="auth">
    <form @submit=${onRegister} id="register">
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>`;

export function showRegister(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {email, password, repeatPassword} = Object.fromEntries(formData);

        if (!email || !password){
            return alert('All feilds are required!');
        }

        if(password !== repeatPassword){
            return alert('Password don\'t match!');
        }

        await register(email, password);
        updateNav();
        ctx.page.redirect('/');
    }
}