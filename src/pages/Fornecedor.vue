<template>
  <v-container>
    <v-flex xs12 sm8>
      <form ref="form" @submit.prevent="submit">
        <v-text-field
          label="Nome"
          v-model="fornecedor.nome"
          data-vv-name="nome"
          :error-messages="errors.collect('nome')"
          v-validate="'required|max:50'"
        />

        <v-text-field
          label="CNPJ"
          v-model="fornecedor.cnpj"
          :mask="masks.cnpj"
          data-vv-name="cnpj"
          :error-messages="errors.collect('cnpj')"
          v-validate="'required'"
        />

        <v-text-field
          label="E-mail"
          v-model="fornecedor.email"
          data-vv-name="email"
          :error-messages="errors.collect('email')"
          v-validate="'required|email'"
        />

        <v-text-field
          label="CEP"
          v-model="fornecedor.cep"
          data-vv-name="cep"
          :error-messages="errors.collect('cep')"
          v-validate="'required'"
        />

        <v-text-field
          label="Rua"
          data-vv-name="rua"
          :error-messages="errors.collect('rua')"
          v-validate="'required'"
        />

        <v-text-field
          label="Nº"
          data-vv-name="número"
          :error-messages="errors.collect('número')"
          v-validate="'required'"
        ></v-text-field>
        
        <v-text-field
          label="Bairro"
          data-vv-name="quantidade"
          :error-messages="errors.collect('quantidade')"
          v-validate="'required'"
        />

        <v-text-field
          label="Cidade"
          data-vv-name="quantidade"
          :error-messages="errors.collect('quantidade')"
          v-validate="'required'"
        />

        <v-text-field
          label="UF"
          v-model="fornecedor.uf"
          data-vv-name="quantidade"
          :error-messages="errors.collect('quantidade')"
          v-validate="'required'"
        />

        <v-text-field
          label="Telefone"
          v-model="fornecedor.telefone"
          :mask="masks.telefone"
          data-vv-name="telefone"
          :error-messages="errors.collect('telefone')"
          v-validate="'required'"
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
  name: "form-fornecedor",
  data() {
    return {
      fornecedor: {
        id: "",
        codigo: "",
        nome: "",
        endereco: [
          { rua: "" },
          { numero: "" },
          { bairro: "" },
          { cidade: "" },
          { cep: "" },
          { uf: "" }
        ],
        cep: "",
        telefone: "",
        email: "",
        cnpj: ""
      },
      items: ["Fornecedor1", "Fornecedor2"],
      valid: true,
      masks
    };
  },
  mounted() {
    this.getFornecedor(this.id);
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          if (this.fornecedor.id) {
            this.removerFornecedor(this.fornecedor.id);
          }
          let jsonFornecedores = JSON.parse(
            window.localStorage.getItem("fornecedores")
          );
          jsonFornecedores.data.push(this.fornecedor);
          window.localStorage.setItem(
            "fornecedores",
            JSON.stringify(jsonFornecedores)
          );
          this.$router.push("/fornecedores");
        }
      });
    },
    removerFornecedor(id) {
      var index = null;
      let jsonFornecedores = JSON.parse(
        window.localStorage.getItem("fornecedores")
      );
      jsonFornecedores.data.forEach((item, i) => {
        if (item.id == id) index = i;
      });
      if (index > -1) {
        jsonFornecedores.data.splice(index, 1);
        window.localStorage.setItem(
          "fornecedores",
          JSON.stringify(jsonFornecedores)
        );
      }
    },
    clear() {
      this.$refs.form.reset();
      this.$validator.reset();
    },
    getFornecedor(id) {
      if (id) {
        const fornecedores = JSON.parse(
          window.localStorage.getItem("fornecedores")
        );
        const fornecedoresResult = fornecedores.data.filter(
          item => item.id == id
        );
        if (fornecedoresResult && fornecedoresResult.length > 0) {
          this.fornecedor = fornecedoresResult[0];
        }
      }
    }
  }
};
</script>
