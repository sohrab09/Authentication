import axios from "axios";

const API_KEY = 'AIzaSyAw1a2mBILU7gOZ_2_4MHE8nZE02vSHO7A';

async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    });

    // console.log("Login", response.data);
    const token = response.data.idToken;
    return token;
}

export function CreateUser(email, password) {
    return authenticate('signUp', email, password);

}

export function LoginUser(email, password) {
    return authenticate('signInWithPassword', email, password);

}