import axios from "axios";

export const http = axios.create({
    baseURL: 'https://back-api-xiloteca.vercel.app/'
    // http://localhost:8082/
    // https://back-api-xiloteca.vercel.app/
});

export const httpXlsx = axios.create({
    baseURL: 'http://127.0.0.1:5000/row/'
});