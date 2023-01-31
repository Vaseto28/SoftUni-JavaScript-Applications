import { del } from '../api/api.js';
import { html, nothing } from '../lib.js';
import { getById } from '../util.js';

let detailsTemplate = (album, user, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src="${album.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">0</span></div>

        <div id="action-buttons">
            ${user && !isOwner ? html`
            <a href="javascript:void(0)" id="like-btn">Like</a>` : nothing}

            ${isOwner ? html`
            <a href="/edit/${album._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : html`
            `}
        </div>
    </div>
</section>`;

export async function showDetails(ctx){
    let id = ctx.params.id;
    let album = await getById(id);

    let user = ctx.user;
    let isOwner = false;
    if(user){
        isOwner = user._id === album._ownerId;
    }
    
    ctx.render(detailsTemplate(album, user, isOwner, onDelete));

    async function onDelete(e){
        e.preventDefault();

        let choose = confirm('Are you sure you want to delete this album?')

        if (choose){
            await del('/data/albums/' + id);
            ctx.page.redirect('/catalog');
        }
    }
}