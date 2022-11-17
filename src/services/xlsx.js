import { httpXlsx } from './config.js';

export default {
    getRowXlsx: (indiceXlsx) => {
        return httpXlsx.get(`${indiceXlsx}`);
    }
}