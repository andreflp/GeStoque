<template>
  <v-container>
    <v-flex xs12 sm8>
      <form ref="form" @submit.prevent="submit">
        <v-text-field
          label="Nome"
          v-model="categoria.nome"
          data-vv-name="nome"
          :error-messages="errors.collect('nome')"
          v-validate="'required|max:50'"
        />

        <v-btn type="submit">Enviar</v-btn>
        <v-btn @click="clear">Limpar</v-btn>
      </form>
    </v-flex>  
  </v-container>
</template>

<script>
import masks from "@/utils/masks/masks";
export default {
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
      masks
    };
  },

  mounted() {
    this.getCategoria(this.id);
  },

  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          if (this.categoria.id) {
            this.removerCategorias(this.categoria.id);
          }
          let jsonCategorias = JSON.parse(
            window.localStorage.getItem("categorias")
          );

          jsonCategorias.data.push(this.categoria);
          window.localStorage.setItem(
            "categorias",
            JSON.stringify(jsonCategorias)
          );
          this.$router.push("/categorias");
        }
      });
    },
    removerCategorias(id) {
      var index = null;
      let jsonCategorias = JSON.parse(
        window.localStorage.getItem("categorias")
      );
      jsonCategorias.data.forEach((item, i) => {
        if (item.id == id) index = i;
      });
      if (index > -1) {
        jsonCategorias.data.splice(index, 1);
        window.localStorage.setItem(
          "categorias",
          JSON.stringify(jsonCategorias)
        );
      }
    },
    clear() {
      this.$refs.form.reset();
      this.$validator.reset();
    },
    getCategoria(id) {
      if (id) {
        const categorias = JSON.parse(
          window.localStorage.getItem("categorias")
        );
        const categoriaResult = categorias.data.filter(item => item.id == id);
        if (categoriaResult && categoriaResult.length > 0) {
          this.categoria = categoriaResult[0];
        }
      }
    }
  }
};
</script>