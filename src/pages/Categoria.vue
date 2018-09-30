<template>
  <v-container>
    <v-flex xs12 sm8>
      <form ref="form" @submit.prevent="submit">
        <v-text-field
          label="Nome"
          v-model="tipo.nome"
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
import { Money } from "v-money";
import masks from "@/utils/masks/masks";

export default {
  components: { Money },

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
      tipo: {
        id: "",
        codigo: "",
        nome: "",
        tipo: "",
        preco: "",
        quantidade: "",
        fornecedor: ""
      },
      items: ["Fornecedor1", "Fornecedor2", "Fornecedor3", "Fornecedor4"],
      valid: true,
      masks,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  }
};
</script>