<template>
  <v-layout>
    <v-flex xs6 sm6>
      <v-card>
        <v-card-media
          class="white--text"
          height="350px"
          src="http://blog.xcm.com.br/wp-content/uploads/2015/02/embalagens.png"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline"><h1></h1></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <h3>PRODUTOS</h3><br>
            <span>
              <h3>Quantidade de produtos cadastrados: {{ quantidadeProdutos }} </h3>
            </span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>  
  
    <v-flex xs6 sm6 style="margin-left: 20px;">
      <v-card>
        <v-card-media
          class="white--text"
          height="350px"
          src="http://www.goedert.com.br/blog/wp-content/uploads/2014/01/comportamento.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <h3>FORNECEDORES</h3><br>
            <span>
              <h3>Quantidade de fornecedores cadastrados: {{ quantidadeFornecedores }}</h3>
            </span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>

    <v-flex xs6 sm6 style="margin-left: 20px;">
      <v-card>
        <v-card-media
          class="white--text"
          height="327px"
          src="https://imageog.flaticon.com/icons/png/512/16/16498.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <h3>MOVIMENTAÇÕES</h3><br>
            <span>
              <h3>Quantidade de entradas de produtos: 25 </h3>
              <h3>Quantidade de saidas de produtos: 23</h3>
            </span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>    
  </v-layout>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      produtos: [],
      fornecedores: [],
      quantidadeProdutos: "",
      quantidadeFornecedores: ""
    };
  },

  mounted() {
    let listaProdutos = (this.produtos = JSON.parse(
      window.localStorage.getItem("produtos")
    ).data);

    let listaFornecedores = (this.fornecedores = JSON.parse(
      window.localStorage.getItem("fornecedores")
    ).data);

    this.getQtdProdutos();
    this.getQtdFornecedores();
  },

  methods: {
    getQtdProdutos() {
      this.quantidadeProdutos = JSON.stringify(this.produtos.length);
    },

    getQtdFornecedores() {
      this.quantidadeFornecedores = JSON.stringify(this.fornecedores.length);
    }
  }
};
</script>

<style>
</style>
