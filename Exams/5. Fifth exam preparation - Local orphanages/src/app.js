import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './views/login.js';
import { showMyPost } from './views/myPosts.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';

let main = document.querySelector('main');

page(decorateCtx);
page('/', showCatalog)
page('/catalog', showCatalog);
page('/login', showLogin);
page('/register', showRegister);
page('/myposts', showMyPost);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

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