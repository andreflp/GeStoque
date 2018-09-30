<template>
  <v-app>
    <v-card>
    <v-card-title>
        <h2>Fornecedores</h2>
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
    :items="fornecedores"
    :pagination.sync="pagination"
    :search="search"
    v-model="search"
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
        <td class="text-xs-center">{{ props.item.nome }}</td>
        <td class="text-xs-center">{{ props.item.email }}</td>
        <td class="text-xs-center">{{ props.item.cnpj }}</td>
        <td class="text-xs-center">{{ props.item.telefone }}</td>
        <td class="text-xs-center">{{ props.item.uf }}</td>
        <td class="text-xs-center">
          <v-tooltip left>
            <v-btn  flat icon color="primary" slot="activator" :to="`fornecedor/${props.item.id}`">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip right>  
            <v-btn flat icon color="red" slot="activator" @click="removerFornecedores(props.index)">
              <v-icon>delete</v-icon>
            </v-btn>
            <span>Remover</span>
          </v-tooltip>
        </td>
      </tr>
    </template>
  </v-data-table>
  </v-card>
  </v-app>
</template>

<script>
import jsonFornecedores from "@/data/fornecedores.json";

export default {
  data: () => ({
    search: "",
    pagination: {
      sortBy: "name"
    },
    headers: [
      {
        text: "Nome",
        align: "center"
      },
      { text: "E-mail" },
      { text: "CNPJ" },
      { text: "Telefone " },
      { text: "UF" },
      { text: "Outros" }
    ],

    fornecedores: [
      {
        id: "1",
        nome: "Tirol",
        email: "tirol@tirol.com.br",
        cnpj: "01545565875458",
        telefone: "4833201524",
        uf: "RS"
      },
      {
        id: "2",
        nome: "Ambev",
        email: "ambev@ambev.com.br",
        cnpj: "01524585458754",
        telefone: "4833201524",
        uf: "RS"
      },
      {
        id: "3",
        nome: "Copal Alimentos",
        email: "copal@copal.com.br",
        cnpj: "06501254854785",
        telefone: "4833245024",
        uf: "SC"
      },
      {
        id: "4",
        nome: "Ceasa",
        email: "ceasa@ceasa.com.br",
        cnpj: "01524585458754",
        telefone: "4834352615",
        uf: "SC"
      },
      {
        id: "5",
        nome: "Nutrifrios",
        email: "nutrifrios@nutrifrios.com.br",
        cnpj: "01524585458754",
        telefone: "4834352615",
        uf: "SC"
      },
      {
        id: "6",
        nome: "Taf Distribuidora",
        email: "taf@taf.com.br",
        cnpj: "01524585458754",
        telefone: "4833201524",
        uf: "SC"
      },
      {
        id: "7",
        nome: "Brasil Kirin",
        email: "kirin@kirin.com.br",
        cnpj: "06501254854785",
        telefone: "4833201524",
        uf: "PR"
      }
    ]
  }),

  mounted() {
    let jsonFornecedoresString = window.localStorage.getItem("fornecedores");
    if (jsonFornecedoresString !== "null") {
      this.fornecedores = JSON.parse(jsonFornecedoresString).data;
    } else {
      this.fornecedores = jsonFornecedores.data;
      window.localStorage.setItem("fornecedores", jsonFornecedores);
    }
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.fornecedores.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    removerFornecedores(index) {
      this.fornecedores.splice(index, 1);
      window.localStorage.setItem(
        "fornecedores",
        JSON.stringify({ data: this.fornecedores })
      );
    }
  }
};
</script>
