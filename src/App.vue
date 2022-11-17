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

      <form @submit.prevent >
        <label>COD</label>
        <input type="number" placeholder="Cod" v-model="indiceXlx" />

        <button @click="buscarXlsx(indiceXlx)" class="waves-effect waves-light btn-small">Buscar</button>
      </form>
        <button @click="nextIndice" class="waves-effect waves-light btn-small">Próximo</button>
        <button @click="prevIndice" class="waves-effect waves-light btn-small">Anterior</button>
      <br />
      <br /><br />

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
        <input
          type="text"
          placeholder="Procedência"
          v-model="amostra.procedencia"
        />

        <label>Coletor</label>
        <input type="text" placeholder="Coletor" v-model="amostra.coletor" />

        <label>Data da Coleta</label>
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          v-model="amostra.dataColeta"
        />

        <label>Determinador</label>
        <input
          type="text"
          placeholder="Determinador"
          v-model="amostra.determinador"
        />

        <label>Remetente</label>
        <input
          type="text"
          placeholder="Remetente"
          v-model="amostra.remetente"
        />

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
            <th>COD</th>
            <th>NOME VULGAR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="amostra of amostras" :key="amostra._id">
            <td>{{ amostra.cod }}</td>
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
import Xlsx from "./services/xlsx.js";

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
      errors: [],
      indiceXlx: 0
    };
  },
  name: "App",
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Amostra.listar().then((resposta) => {
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
    // MÉTODOS DE BUSCA POR INDICE XLSX 
    buscarXlsx(indice){
      this.indiceXlx = indice;
      Xlsx.getRowXlsx(this.indiceXlx).then((response) => {
        this.amostra = response.data;
        console.log(this.amostra.cod);
      });
    },
    nextIndice(){
      this.indiceXlx++;
    },
    prevIndice(){
      if(this.indiceXlx <= 0){
        console.log("Indici mínimo atingido");
      }else{
        this.indiceXlx--;
      }
    }
  },
};
</script>

<style>
/* PARA MODO LIGHT - COMENTE DAQUI */
#app {
  background: #01020f;
  color: aliceblue;
}

input,
textarea {
  color: aliceblue;
}

input::placeholder {
  color: #9a9a9a;
}
/* ATÉ AQUI */

.container {
  margin-top: 1rem;
}
</style>
