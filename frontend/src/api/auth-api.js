import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

export async function login(data) {
    return await axios.post(`${BASE_URL}/auth/login`, data, {
        withCredentials: true
    });
}

export async function register(data) {
    return await axios.post(`${BASE_URL}/auth/register`, data);
}