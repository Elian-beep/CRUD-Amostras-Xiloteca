import { http } from './config.js';

export default {
    listar:() => {
        return http.get('amostras')
    },

    salvar: (amostra) => {
        return http.post('amostras', amostra)
    },

    atualizar: (amostra) => {
        return http.put(`amostras/${amostra._id}`, amostra)
    },

    apagar: (amostra) => {
        return http.delete(`amostras/${amostra._id}`, { data: amostra })
    }
}