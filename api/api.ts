import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL

export const API = axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json"
    }
});