<template>
  <v-app>
    <v-card>
      <v-card-title>
        <h2>Produtos</h2>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
      :headers="headers"
      :items="produtos"
      :pagination.sync="pagination"
      :search="search"
      select-all
      item-key="id"
      class="elevation-1 table-margin"
      >
      <template slot="headers" slot-scope="props">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-center">{{ props.item.codigo }}</td>
          <td class="text-xs-center">{{ props.item.nome }}</td>
          <td class="text-xs-center">{{ props.item.categoria.nome }}</td>
          <td class="text-xs-center">{{ props.item.preco }}</td>
          <td class="text-xs-center">{{ props.item.quantidade }}</td>
          <td class="text-xs-center">{{ props.item.fornecedor.nome }}</td>
          <td class="text-xs-center">
            <v-tooltip left>
              <v-btn  flat icon color="primary" slot="activator" :to="`produto/${props.item.id}`">
                <v-icon>edit</v-icon>
              </v-btn>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip top>  
              <v-btn flat icon color="red" slot="activator" @click="removerProdutos(props.index)">
                <v-icon>delete</v-icon>
              </v-btn>
              <span>Remover</span>
            </v-tooltip>
            <v-tooltip right>  
              <v-btn flat icon color="teal accent-4" slot="activator" :to="`movimentacoes/${props.item.id}`">
                <v-icon>compare_arrows</v-icon>
              </v-btn>
              <span>Movimentar</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import jsonProdutos from "@/data/produtos.json";
import axios from "axios";

export default {
  data: () => ({
    search: "",
    pagination: {
      sortBy: "name"
    },
    headers: [
      {
        text: "Código",
        align: "center",
        value: "codigo"
      },
      { text: "Nome", value: "nome" },
      { text: "Categorias", value: "categorias" },
      { text: "Preço", value: "preco" },
      { text: "Quantidade ", value: "quantidade" },
      { text: "Fornecedor", value: "fornecedor" },
      { text: "Opções" }
    ],
    produtos: []
  }),

  mounted() {
    this.getAll();
  },
  methods: {
    getAllProdutos() {
      axios
        .get("ge/produto/produtos")
        .then(function(resp) {
          this.produtos = resp.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    getAll() {
      let url = "http://localhost:8080/Gestoque/produto/produtos";
      let vm = this;
      axios
        .get(url)
        .then(function(resp) {
          vm.produtos = resp.data;
          console.log(resp.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.produtos.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    removerProdutos(index) {
      this.produtos.splice(index, 1);
      window.localStorage.setItem(
        "produtos",
        JSON.stringify({ data: this.produtos })
      );
    }
  }
};
</script>


