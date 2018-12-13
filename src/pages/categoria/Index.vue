<template>
  <v-container fluid>
    <v-container>
      <v-flex xs12 sm8>
        <form ref="form">
          <v-text-field
            label="Nome"
            v-model="categoria.nome"
            data-vv-name="nome"
            :error-messages="errors.collect('nome')"
            v-validate="'required|max:50'"
          />

          <v-btn v-if="$route.name === 'Categoria' " @click="addCategoria(categoria)">Enviar</v-btn>
          <v-btn v-else @click="updateCategoria(categoria.id, categoria)">Editar</v-btn>
          <v-btn @click="clear">Limpar</v-btn>
          <alerta :snack="snack"></alerta>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline yellow lighten-4">Aviso</v-card-title>
              <v-card-text>Categoria já cadastrada.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="dialog = false">Fechar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </form>
      </v-flex>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import Alerta from "@/components/Alerta";
export default {
  components: {
    Alerta
  },

  $_veeValidate: {
    validator: "new"
  },
  props: {
    id: {
      type: [Number, String]
    }
  },
  name: "form-categoria",
  data() {
    return {
      categoria: {
        id: "",
        nome: ""
      },
      dialog: false,
      snack: true
    };
  },

  mounted() {
    this.getCategoria(this.id);
  },

  methods: {
    addCategoria(categoria) {
      const nome = this.categoria.nome;
      const token = localStorage.getItem("token");
      const url = "http://localhost:8080/Gestoque/categoria/new";
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .post(url, categoria, {
              params: { nome: nome }
            })
            .then(resp => {
              if (resp.data === true) {
                this.dialog = true;
              } else if (resp.data === false) {
                this.changeSnack();
                this.clear();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    updateCategoria(id, categoria) {
      const nome = this.categoria.nome;
      const token = localStorage.getItem("token");
      const url = `http://localhost:8080/Gestoque/categoria/update/${id}`;
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .put(url, categoria, {
              params: { nome: nome }
            })
            .then(resp => {
              if (resp.data === true) {
                this.dialog = true;
              } else if (resp.data === false) {
                this.$router.push("/categorias");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    getCategoria(id) {
      if (id) {
        const categorias = this.$store.state.Categorias.categorias;
        const categoriaResult = categorias.filter(item => item.id == id);
        if (categoriaResult && categoriaResult.length > 0) {
          this.categoria = categoriaResult[0];
        }
      }
    },

    changeSnack() {
      this.$root.$emit("change-snack", this.snack);
    },

    clear() {
      this.categoria.nome = "";
      this.$validator.reset();
    }
  }
};
</script>