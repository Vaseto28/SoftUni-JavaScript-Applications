import { register } from '../api/user.js';
import { html } from '../lib.js';

let registerTemplate = (onRegister) => html`
<section id="register">
    <div @submit=${onRegister} class="form">
        <h2>Register</h2>
        <form class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">login</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export function showRegister(ctx){
    ctx.render(registerTemplate(onRegister));

    async function onRegister(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let data = Object.fromEntries(formData);

        if (!data.email || !data.password){
            return alert("All fields are required!");
        }

        if (data.password !== data["re-password"]){
            return alert("Passwords don't match!");
        }

        register(data.email, data.password);
        ctx.updateNav();
        ctx.page.redirect('/')
    }
}