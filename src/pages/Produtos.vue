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
          <td class="text-xs-center">{{ props.item.tipo }}</td>
          <td class="text-xs-center">{{ props.item.preco }}</td>
          <td class="text-xs-center">{{ props.item.quantidade }}</td>
          <td class="text-xs-center">{{ props.item.fornecedor }}</td>
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

    produtos: [
      {
        id: "1",
        codigo: "209840",
        nome: "Banana",
        tipo: "Frutas",
        preco: "5,00 R$",
        quantidade: "52",
        fornecedor: "Ceasa"
      },

      {
        id: "2",
        codigo: "3215674",
        nome: "Maçã",
        tipo: "Frutas",
        preco: "5,00 R$",
        quantidade: "78",
        fornecedor: "Ceasa"
      },

      {
        id: "3",
        codigo: "564564",
        nome: "Laranja",
        tipo: "Frutas",
        preco: "5,00 R$",
        quantidade: "54",
        fornecedor: "Ceasa"
      },
      {
        id: "4",
        codigo: "65453",
        nome: "Goiaba",
        tipo: "Frutas",
        preco: "5,00 R$",
        quantidade: "15",
        fornecedor: "Ceasa"
      },
      {
        id: "5",
        codigo: "456453",
        nome: "Vodka",
        tipo: "Bebidas",
        preco: "5,00 R$",
        quantidade: "35",
        fornecedor: "Bebidas Kobrasol"
      },
      {
        id: "6",
        codigo: "45453",
        nome: "Refrigerante",
        tipo: "Bebidas",
        preco: "5,00 R$",
        quantidade: "54",
        fornecedor: "Bebidas Kobrasol"
      },
      {
        id: "7",
        codigo: "54543",
        nome: "Água",
        tipo: "Bebidas",
        preco: "5,00 R$",
        quantidade: "78",
        fornecedor: "Bebidas Kobrasol"
      },
      {
        id: "8",
        codigo: "64564",
        nome: "Cloro",
        tipo: "Limpeza",
        preco: "5,00 R$",
        quantidade: "21",
        fornecedor: "Catarina"
      },
      {
        id: "9",
        codigo: "456453",
        nome: "Amaciante",
        tipo: "Limpeza",
        preco: "5,00 R$",
        quantidade: "45",
        fornecedor: "Catarina"
      },
      {
        id: "10",
        codigo: "645643",
        nome: "Detergente",
        tipo: "Limpeza",
        preco: "5,00 R$",
        quantidade: "54",
        fornecedor: "Catarina"
      },
      {
        id: "11",
        codigo: "46453",
        nome: "Iogurte",
        tipo: "Laticinios",
        preco: "5,00 R$",
        quantidade: "12",
        fornecedor: "Tirol"
      },
      {
        id: "12",
        codigo: "645643",
        nome: "Leite",
        tipo: "Laticinios",
        preco: "5,00 R$",
        quantidade: "5",
        fornecedor: "Tirol"
      },
      {
        id: "13",
        codigo: "645645",
        nome: "Queijo",
        tipo: "Laticinios",
        preco: "5,00 R$",
        quantidade: "10",
        fornecedor: "Tirol"
      },
      {
        id: "14",
        codigo: "345345",
        nome: "Manteiga",
        tipo: "Laticinos",
        preco: "5,00 R$",
        quantidade: "8",
        fornecedor: "Tirol"
      }
    ]
  }),

  mounted() {
    let jsonProdutosString = window.localStorage.getItem("produtos");
    if (jsonProdutosString !== "null") {
      this.produtos = JSON.parse(jsonProdutosString).data;
    } else {
      this.produtos = jsonProdutos.data;
      window.localStorage.setItem("produtos", jsonProdutos);
    }
  },
  methods: {
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


