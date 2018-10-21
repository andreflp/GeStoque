<template>
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
        <v-btn v-else @click="updateCategoria(categoria.id, categoria)">Enviar E</v-btn>
        <v-btn @click="clear">Limpar</v-btn>
        <alerta :snack="snack"></alerta>
      </form>
    </v-flex>  
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
      valid: true,
      snack: true
    };
  },

  mounted() {
    this.getCategoria(this.id);
  },

  methods: {
    addCategoria(categoria) {
      const url = "http://localhost:8080/Gestoque/categoria/new";
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .post(url, categoria)
            .then(resp => {
              if (resp.status === 200) {
                this.changeSnack();
                this.clear();
                setTimeout(function() {
                  this.snack = false;
                }, 5000);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    updateCategoria(id, categoria) {
      const url = `http://localhost:8080/Gestoque/categoria/update/${id}`;
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .put(url, categoria)
            .then(resp => {
              if (resp.status === 204) {
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