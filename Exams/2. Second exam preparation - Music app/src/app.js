import { page, render } from './lib.js';
import { showHome } from './views/home.js';
import { getUserData } from './util.js';
import { updateNav } from '../src/views/nav.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showSearch } from './views/search.js';

let main = document.getElementById('box');

page(decorateCtx);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/details/:id', showDetails);
page('/catalog/edit/:id', showEdit);
page('/home', showHome);
page('/create', showCreate);
page('/search', showSearch);

updateNav();
page.start();

async function decorateCtx(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    
    const user = await getUserData();
    if (user){
        ctx.user = user;
    }

    next();
}

function renderMain(content){
    render(content, main);
}