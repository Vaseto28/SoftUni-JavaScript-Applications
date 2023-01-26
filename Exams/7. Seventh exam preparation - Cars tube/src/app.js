import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showListings } from './views/listing.js';
import { showLogin } from './views/login.js';
import { showMyListings } from './views/myListings.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';

let main = document.querySelector('main');

page(decorateCtx);
page('/', showHome)
page('/listings', showListings);
page('/myListings', showMyListings);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/sortedByYear', () => console.log('sortedByYear'));

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