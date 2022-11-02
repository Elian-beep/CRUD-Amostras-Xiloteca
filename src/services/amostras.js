import { http } from './config.js';

export default {
    listar:() => {
        return http.get('amostras')
    },

    salvar: (amostra) => {
        return http.post('amostras', amostra)
    }
}