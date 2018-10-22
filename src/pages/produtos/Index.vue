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
      :search="search"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.codigo }}</td>
        <td class="text-xs-center">{{ props.item.nome }}</td>
        <td class="text-xs-center">{{ props.item.categoria.nome }}</td>
        <td class="text-xs-center">{{ props.item.preco | currency }}</td>
        <td class="text-xs-center">{{ props.item.quantidade }}</td>
        <td class="text-xs-center">{{ props.item.fornecedor.nome }}</td>
        <td class="text-xs-center">
          <v-dialog v-model="dialog" lazy absolute max-width="320">
            <v-card>
              <v-card-title class="headline">Confirmação</v-card-title>
              <v-card-text>Deseja realmente excluir este produto?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                <v-btn color="red darken-1" flat @click.native="delProduto(modalItem, modalId); dialog = false">Excluir</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-tooltip left>
            <v-btn  flat icon color="primary" slot="activator" :to="`produto/${props.item.id}`">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip top>  
            <v-btn flat icon color="red" slot="activator" @click="dialog = true; modalId = props.item.id; modalItem = props.item">
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
      </template>
    </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    search: "",

    headers: [
      {
        text: "Código",
        align: "center",
        value: "codigo"
      },
      {
        text: "Nome",
        value: "nome",
        align: "center"
      },
      {
        text: "Categorias",
        value: "categoria.nome",
        align: "center"
      },
      {
        text: "Preço",
        value: "preco",
        align: "center"
      },
      {
        text: "Quantidade ",
        value: "quantidade",
        align: "center"
      },
      {
        text: "Fornecedor",
        value: "fornecedor.nome",
        align: "center"
      },
      {
        text: "Opções",
        align: "center"
      }
    ],
    dialog: false,
    modalItem: "",
    modalId: ""
  }),

  computed: {
    ...mapState("Produtos", ["produtos"])
  },

  mounted() {
    this.setProdutos();
  },

  methods: {
    ...mapActions("Produtos", ["setProdutos", "deleteProduto"]),

    delProduto(item, id) {
      this.deleteProduto([item, id]);
      this.dialog = false;
    }
  }
};
</script>



