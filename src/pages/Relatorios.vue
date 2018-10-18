<template>
  <v-container>
    <form ref="form" @submit.prevent="submit">
       <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Data Inicial" :mask="masks.date"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Data Final" :mask="masks.date"></v-text-field>
            </v-flex>
            <v-flex xs12 sm8>
              <v-autocomplete
                v-model="value"
                :items="produtos"
                attach
                chips
                label="Produtos"
                multiple
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm8>
              <v-autocomplete
                v-model="value"
                :items="fornecedores"
                attach
                chips
                label="Fornecedores"
                multiple
              ></v-autocomplete>
            </v-flex>
             <v-flex xs12 sm8>
              <v-autocomplete
                v-model="value"
                :items="categorias"
                attach
                chips
                label="Categorias"
                multiple
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm8>
              <v-select :items="tipo" label="Tipo" required></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      <v-btn type="submit">Enviar</v-btn>
      <v-btn>Limpar</v-btn>
    </form>
  </v-container>
</template>

<script>
import masks from "@/utils/masks/masks";

export default {
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      tipo: ["Entrada", "Saída"],
      fornecedores: [
        "Fornecedor1",
        "Fornecedor2",
        "Fornecedor3",
        "Fornecedor4",
        "Fornecedor5"
      ],
      produtos: ["Produto1", "Produto2", "Produto3", "Produto4", "Produto5"],
      masks,
      categorias: ["Categoria1", "Categoria2", "Categoria3"]
    };
  }
};
</script>

<style>
</style>
