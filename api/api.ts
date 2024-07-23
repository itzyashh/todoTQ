import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const baseURL = process.env.EXPO_PUBLIC_API_URL
const token = SecureStore.getItemAsync('token')

export const API = axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
});