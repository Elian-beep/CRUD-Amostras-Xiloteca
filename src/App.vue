<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">
      <form>
        <label>Nome Vulgar</label>
        <input type="text" placeholder="Nome Vulgar" />
        <label>Família</label>
        <input type="number" placeholder="Família" />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME VULGAR</th>
            <th>FAMÍLIA</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="amostra of amostras" :key="amostra.id">
            <td>{{ amostra.nomeVulgar }}</td>
            <td>{{ amostra.familia }}</td>
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

import Amostra from './services/amostras.js';

export default {

  data(){
    return{
      amostras: []
    }
  },
  name: "App",
  mounted(){
    Amostra.listar().then(resposta => {
      console.log(resposta.data);
      this.amostras = resposta.data;
    })
  }
};
</script>

<style>
.container{
  margin-top: 1rem;
}
</style>
