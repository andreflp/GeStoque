<template>
  <v-container>
    <form ref="form" @submit.prevent="submit">
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

        <v-combobox
          label="Categoria"
          items:="categorias"
          v-model="produto.categoria"
          data-vv-name="categoria"
          :error-messages="errors.collect('categoria')"
          v-validate="'required'"
        ></v-combobox>

        <v-text-field
          label="Preço"
          v-model.lazy="produto.preco"
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
      
        <v-combobox
          v-model="produto.fornecedor"
          :items="items"
          label="Fornecedor"
          data-vv-name="fornecedor"
          :error-messages="errors.collect('fornecedor')"
          v-validate="'required'"
        ></v-combobox>
      </v-flex>  
      <v-btn type="submit">Enviar</v-btn>
      <v-btn @click="clear">Limpar</v-btn>
    </form>
  </v-container>
</template>

<script>
import { Money } from "v-money";
import masks from "@/utils/masks/masks";
import axios from "axios";
export default {
  components: { Money },

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
        categoria: "",
        preco: "",
        quantidade: "",
        fornecedor: "",
        categoria: ""
      },
      valid: true,
      masks,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  },
  mounted() {
    this.getProduto(this.id);
  },
  methods: {
    addProduto(produto) {
      const url = "http://localhost:8080/Gestoque/produto/new";
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .post(url, produto)
            .then(resp => {
              if (resp.status === 200) {
                this.snackbar = true;
                this.clear();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    clear() {
      this.$refs.form.reset();
      this.$validator.reset();
    },
    getProduto(id) {
      if (id) {
        const produtos = JSON.parse(window.localStorage.getItem("produtos"));
        const produtoResult = produtos.data.filter(item => item.id == id);
        if (produtoResult && produtoResult.length > 0) {
          this.produto = produtoResult[0];
        }
      }
    }
  }
};
</script>