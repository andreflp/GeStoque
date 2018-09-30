<template>
  <v-app>
    <v-card>
    <v-card-title>
        <h2>Categorias</h2>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Categorias"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    <v-data-table
    :headers="headers"
    :items="categorias"
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
        <td class="text-xs-center">
          <v-tooltip left>
            <v-btn  flat icon color="primary" slot="activator" :to="`categoria/${props.item.id}`">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip right>  
            <v-btn flat icon color="red" slot="activator" @click="removerCategorias(props.index)">
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
import jsonCategorias from "@/data/categorias.json";

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
      { text: "Outros" }
    ],

    categorias: [
      {
        id: "1",
        nome: "Frutas"
      },
      {
        id: "2",
        nome: "Carnes"
      },
      {
        id: "3",
        nome: "Legumes"
      },
      {
        id: "4",
        nome: "Frios"
      },
      {
        id: "5",
        nome: "Bebidas"
      }
    ]
  }),

  mounted() {
    let jsonCategoriasString = window.localStorage.getItem("categorias");
    if (jsonCategoriasString !== "null") {
      this.categorias = JSON.parse(jsonCategoriasString).data;
    } else {
      this.categorias = jsonCategorias.data;
      window.localStorage.setItem("categorias", jsonCategorias);
    }
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.categorias.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    removerCategorias(index) {
      this.categorias.splice(index, 1);
      window.localStorage.setItem(
        "categorias",
        JSON.stringify({ data: this.categorias })
      );
    }
  }
};
</script>
