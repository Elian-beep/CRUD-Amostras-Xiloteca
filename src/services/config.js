import axios from "axios";

export const http = axios.create({
    baseURL: 'http://localhost:8081/'
});

export const httpXlsx = axios.create({
    baseURL: 'http://127.0.0.1:5000/row/'
});