import { get } from './api/api.js';

export async function getUserData(){
    let user = JSON.parse(sessionStorage.getItem('userData'));
    return user;
}

export async function setUserData(data){
    sessionStorage.setItem("userData", JSON.stringify(data));
}

export async function clearUserData(){
    sessionStorage.removeItem("userData");
}

export async function getAll(){
    return get("/data/cars?sortBy=_createdOn%20desc");
}

export async function getById(id){
    return get("/data/cars/" + id);
}

export async function getAllMyListings(userId){
    return get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

// export async function deleteById(id){
//     return del('/data/pets/' + id);
// }