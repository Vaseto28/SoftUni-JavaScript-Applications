import { clearUserData, setUserData } from "../util.js";
import { post, get } from "./api.js";

export async function login(email, password){
    let {_id, email: returnedEmail, accessToken} = await post('/users/login', {email, password});

    setUserData({
        _id,
        email: returnedEmail,
        accessToken
    });
}

export async function register(username, email, password, gender){
    let {_id, email: returnedEmail, username: returnedUsername, gender: returnedGender, accessToken} = await post('/users/register', {username, email, password, gender});

    setUserData({
        _id,
        email: returnedEmail,
        username: returnedUsername,
        gender: returnedGender,
        accessToken
    });
}

export async function logout(){
    get('/users/logout');
    clearUserData();
}