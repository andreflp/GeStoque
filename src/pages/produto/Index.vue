<template>
  <v-container>
    <form ref="form" @submit.prevent="addProduto">
      <v-flex xs12 sm8>
        <v-text-field
          label="Nome"
          v-model="produto.nome"
          data-vv-name="nome"
          :error-messages="errors.collect('nome')"
          v-validate="'required|max:50'"
        />

        <v-text-field
          label="Código"
          v-model="produto.codigo"
          data-vv-name="código"
          :error-messages="errors.collect('código')"
          v-validate="'required'"
        />

        <v-autocomplete
          label="Fornecedores"
          v-model="produto.fornecedor"
          :items="fornecedores"
          item-text="nome"
          item-value="id"
          data-vv-name="fornecedor"
          :error-messages="errors.collect('fornecedor')"
          v-validate="'required'"
          return-object
        ></v-autocomplete>

        <v-autocomplete
          label="Categoria"
          v-model="produto.categoria"
          :items="categorias"
          item-text="nome"
          item-value="id"
          return-object
          data-vv-name="categoria"
          :error-messages="errors.collect('categoria')"
          v-validate="'required'"
        ></v-autocomplete>

        <v-text-field
          label="Preço"
          v-model.lazy="produto.preco"
          v-money="money"
          data-vv-name="preço"
          :error-messages="errors.collect('preço')"
          v-validate="'required'"
        ></v-text-field>
        
        <v-text-field
          label="Quantidade"
          v-model="produto.quantidade"
          data-vv-name="quantidade"
          :error-messages="errors.collect('quantidade')"
          v-validate="'required'"
        />
      
      </v-flex>  
      <alerta :snack="snack"></alerta>
      <v-btn v-if="$route.name === 'Produto'" @click="addProduto(produto)">Enviar</v-btn>
      <v-btn v-else @click="updateProduto(produto.id, produto)">Editar</v-btn>
      <v-btn @click="clear">Limpar</v-btn>
      
    </form>
  </v-container>
</template>

<script>
import masks from "@/utils/masks/masks";
import axios from "axios";
import Alerta from "@/components/Alerta";
import { Money } from "v-money";
export default {
  components: {
    Alerta,
    Money
  },
  $_veeValidate: {
    validator: "new"
  },
  props: {
    id: {
      type: [Number, String]
    }
  },
  name: "form-produto",
  data() {
    return {
      produto: {
        id: "",
        codigo: "",
        nome: "",
        categoria: {},
        preco: "",
        quantidade: "",
        fornecedor: {}
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false
      },
      masks,
      snack: true,
      fornecedores: [],
      categorias: []
    };
  },
  mounted() {
    this.getProduto(this.id);
    this.getFornecedores();
    this.getCategorias();
  },

  methods: {
    changeSnack() {
      this.$root.$emit("change-snack", this.snack);
    },

    replacePreco(produto) {
      produto.preco = this.produto.preco
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".");
    },

    addProduto(produto) {
      this.replacePreco(produto);
      const url = "http://localhost:8080/Gestoque/produto/new";
      this.$validator.validateAll().then(valid => {
        if (valid) {
          produto.preco = this.produto.preco
            .replace("R$", "")
            .replace(",", ".");
          console.log(this.produto.preco);
          axios
            .post(url, produto)
            .then(resp => {
              if (resp.status === 200) {
                this.changeSnack();
                this.clear();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    updateProduto(id, produto) {
      const url = `http://localhost:8080/Gestoque/produto/update/${id}`;
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .put(url, produto)
            .then(resp => {
              if (resp.status === 204) {
                this.$router.push("/produtos");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    getFornecedores() {
      let url = "http://localhost:8080/Gestoque/fornecedor/fornecedores";
      axios
        .get(url)
        .then(resp => {
          this.fornecedores = resp.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getCategorias() {
      let url = "http://localhost:8080/Gestoque/categoria/categorias";
      axios
        .get(url)
        .then(resp => {
          this.categorias = resp.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    clear() {
      this.produto.nome = "";
      this.produto.codigo = "";
      this.produto.categoria = "";
      this.produto.fornecedor = "";
      this.produto.preco = "";
      this.produto.quantidade = "";
      this.$validator.reset();
    },

    getProduto(id) {
      if (id) {
        const produtos = this.$store.state.Produtos.produtos;
        const produtoResult = produtos.filter(item => item.id == id);
        if (produtoResult && produtoResult.length > 0) {
          this.produto = produtoResult[0];
        }
      }
    }
  }
};
</script>