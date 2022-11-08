<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        Erro:
        <b>{{ this.errors }}</b>
      </ul>

      <form @submit.prevent="salvar">
        <label>COD</label>
        <input type="text" placeholder="Cod" v-model="amostra.cod" />

        <label>Lâmina</label>
        <input type="text" placeholder="Lamina" v-model="amostra.lamina" />

        <label>Herb</label>
        <input type="text" placeholder="Herb" v-model="amostra.herb" />

        <label>Família</label>
        <input type="text" placeholder="Família" v-model="amostra.familia" />

        <label>Nome Científico</label>
        <input
          type="text"
          placeholder="Nome Científico"
          v-model="amostra.nomeCientifico"
        />
        <label>Nome Vulgar</label>
        <input
          type="text"
          placeholder="Nome Vulgar"
          v-model="amostra.nomeVulgar"
        />

        <label>Procedência</label>
        <input type="text" placeholder="Procedência" v-model="amostra.procedencia" />

        <label>Coletor</label>
        <input type="text" placeholder="Coletor" v-model="amostra.coletor" />

        <label>Data da Coleta</label>
        <input type="text" placeholder="dd/mm/yyyy" v-model="amostra.dataColeta" />

        <label>Determinador</label>
        <input type="text" placeholder="Determinador" v-model="amostra.determinador" />

        <label>Remetente</label>
        <input type="text" placeholder="Remetente" v-model="amostra.remetente" />

        <label>Desc</label>
        <textarea type="" placeholder="Desc" v-model="amostra.desc"></textarea>

        <label>Obs</label>
        <input type="text" placeholder="Obs" v-model="amostra.obs" />


        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME VULGAR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="amostra of amostras" :key="amostra._id">
            <td>{{ amostra._id }}</td>
            <td>{{ amostra.nomeVulgar }}</td>
            <td>
              <button
                @click="editar(amostra)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">create</i>
              </button>
              <button
                @click="remover(amostra)"
                class="waves-effect btn-small red darken-1"
              >
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
        id: "",
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
      errors: [],
    };
  },
  name: "App",
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Amostra.listar().then((resposta) => {
        console.log(typeof resposta);
        this.amostras = resposta.data;
      });
    },

    salvar() {
      if (!this.amostra._id) {
        Amostra.salvar(this.amostra)
          .then((resposta) => {
            this.amostra = {};
            console.log(
              `${resposta.data.nomeCientifico} Cadastrado com sucesso`
            );
            this.listar();
            this.errors = [];
          })
          .catch((e) => {
            this.errors = e.response.data;
          });
      } else {
        Amostra.atualizar(this.amostra)
          .then((resposta) => {
            this.amostra = {};
            console.log(resposta.data.message);
            this.listar();
            this.errors = [];
          })
          .catch((e) => {
            this.errors = e.response.data;
          });
      }
    },
    editar(amostra) {
      this.amostra = amostra;
    },
    remover(amostra) {
      if (confirm("Deseja excluir o produto?")) {
        Amostra.apagar(amostra)
          .then((resposta) => {
            console.log(resposta.data);
            this.listar();
            this.errors = [];
          })
          .catch((e) => [(this.errors = e.response.data)]);
      }
    },
  },
};
</script>

<style>
.container {
  margin-top: 1rem;
}
</style>
