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
          <v-tooltip left>
            <v-btn  flat icon color="primary" slot="activator" :to="`categoria/${props.item.id}`">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip right>  
            <v-btn flat icon color="red" slot="activator" @click="confirmDialog(props.item, props.item.id)">
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
      ]
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

    confirmDialog(item, id) {
      this.$confirm("Deseja excluir esta categoria?", {
        title: "Confirmação",
        buttonTrueText: "Excluir",
        buttonFalseText: "Cancelar",
        buttonTrueColor: "red",
        buttonFalseColor: "primary",
        color: "teal accent-4",
        icon: "",
        width: "320"
      }).then(resp => {
        if (resp) {
          this.deleteCategoria([item, id]);
        }
      });
    }
  }
};
</script>
