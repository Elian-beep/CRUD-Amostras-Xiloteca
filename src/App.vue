<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="salvar">
        <label>COD</label>
        <input type="text" placeholder="Cod" v-model="amostra.cod" />
        <label>Nome Vulgar</label>
        <input
          type="text"
          placeholder="Nome Vulgar"
          v-model="amostra.nomeVulgar"
        />
        <label>Nome Científico</label>
        <input
          type="text"
          placeholder="Nome Científico"
          v-model="amostra.nomeCientifico"
        />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>COD</th>
            <th>NOME VULGAR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="amostra of amostras" :key="amostra.id">
            <td>{{ amostra.cod }}</td>
            <td>{{ amostra.nomeVulgar }}</td>
            <td>
              <button class="waves-effect btn-small blue darken-1">
                <i class="material-icons">create</i>
              </button>
              <button class="waves-effect btn-small red darken-1">
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Amostra from "./services/amostras.js";

export default {
  data() {
    return {
      amostra: {
        cod: "",
        lamina: "",
        herb: "",
        familia: "",
        nomeCientifico: "",
        nomeVulgar: "",
        procedencia: "",
        coletor: "",
        dataColeta: "",
        determinador: "",
        remetente: "",
        desc: "",
        obs: "",
      },
      amostras: [],
    };
  },
  name: "App",
  mounted() {
    this.listar()
  },
  methods: {
    listar() {
      Amostra.listar().then((resposta) => {
        this.amostras = resposta.data;
      });
    },
    salvar() {
      Amostra.salvar(this.amostra).then((resposta) => {
        this.amostra = {}
        console.log(resposta.data);
        this.listar();
      });
    },
  },
};
</script>

<style>
.container {
  margin-top: 1rem;
}
</style>
