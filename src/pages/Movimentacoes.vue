<template>
  <v-container>
    <v-flex xs12 sm8>
      <form ref="form" @submit.prevent="submit">
          <v-text-field
          label="Produto"
          data-vv-name="produto"
          v-model="produto.nome"
          :error-messages="errors.collect('produto')"
          v-validate="'required|max:50'"
        />

        <v-select
          label="Tipo"
          data-vv-name="tipo"
          :items="tipo"
          :error-messages="errors.collect('tipo')"
          v-validate="'required|max:50'"
        ></v-select>

        <v-text-field
          label="Quantidade"
          v-model="produto.quantidade"
          data-vv-name="código"
          :error-messages="errors.collect('código')"
          v-validate="'required'"
        />
        <v-btn type="submit">Enviar</v-btn>
        <v-btn>Limpar</v-btn>
      </form>
    </v-flex>
  </v-container>    
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },
  props: {
    id: {
      type: [Number, String]
    }
  },
  name: "movimentacoes",
  data() {
    return {
      tipo: ["Entrada", "Saída"],
      produto: {
        nome: "",
        quantidade: ""
      }
    };
  },

  mounted() {
    this.getProduto(this.id);
  },

  methods: {
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

<style>
</style>
