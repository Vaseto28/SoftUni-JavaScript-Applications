import { clearUserData, setUserData } from "../util.js";
import { post, get } from "./api.js";

export async function login(username, password){
    let {_id, username: returnedUsername, accessToken} = await post('/users/login', {username, password});

    setUserData({
        _id,
        username: returnedUsername,
        accessToken
    });
}

export async function register(username, password){
    let {_id, username: returnedUsername, accessToken} = await post('/users/register', {username, password});

    setUserData({
        _id,
        username: returnedUsername,
        accessToken
    });
}

export async function logout(){
    get('/users/logout');
    clearUserData();
}