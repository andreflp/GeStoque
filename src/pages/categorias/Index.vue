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
    :search="search"
  >
    <template slot="items" slot-scope="props">
      <tr>
        <td class="text-xs-center">{{ props.item.nome }}</td>
        <td class="text-xs-center">
          <v-dialog v-model="dialog" lazy absolute max-width="320">
            <v-card>
              <v-card-title class="headline">Confirmação</v-card-title>
              <v-card-text>Deseja realmente excluir esta categoria?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                <v-btn color="red darken-1" flat @click="delCategoria(modalItem, modalId);">Excluir</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-tooltip left>
            <v-btn  flat icon color="primary" slot="activator" :to="`categoria/${props.item.id}`">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip right>  
            <v-btn flat icon color="red" slot="activator" @click="dialog = true; modalId = props.item.id; modalItem = props.item ">
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
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nome",
          align: "center",
          value: "nome"
        },
        {
          text: "Outros",
          align: "center"
        }
      ],
      dialog: false,
      modalItem: "",
      modalId: ""
    };
  },

  computed: {
    ...mapState("Categorias", ["categorias"])
  },

  mounted() {
    this.setCategorias();
  },

  methods: {
    ...mapActions("Categorias", ["setCategorias", "deleteCategoria"]),

    delCategoria(item, id) {
      this.deleteCategoria([item, id]);
      this.dialog = false;
    }
  }
};
</script>
