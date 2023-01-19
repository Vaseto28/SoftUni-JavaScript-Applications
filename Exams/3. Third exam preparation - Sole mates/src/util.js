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
    return get("/data/shoes?sortBy=_createdOn%20desc");
}

export async function getById(id){
    return get("/data/shoes/" + id);
}

// export async function deleteById(id){
//     return del('/data/pets/' + id);
// }