<template>
  <form ref="form" @submit.prevent="submit">
    <v-container grid-list-sm>
      <v-layout wrap>
        <v-flex xs12 sm6 md8>
          <v-text-field
            label="Nome"
            v-model="fornecedor.nome"
            data-vv-name="nome"
            :error-messages="errors.collect('nome')"
            v-validate="'required|max:50'"
          />
        </v-flex>  

        <v-flex xs12 sm6 md8>
          <v-text-field
            label="CNPJ"
            v-model="fornecedor.cnpj"
            :mask="masks.cnpj"
            data-vv-name="cnpj"
            @change="buscarFornecedor(fornecedor.cnpj)"
            :error-messages="errors.collect('cnpj')"
            v-validate="'required'"
          />
        </v-flex>

        <v-flex xs12 sm6 md8>
          <v-text-field
            label="E-mail"
            v-model="fornecedor.email"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
            v-validate="'required|email'"
          />
        </v-flex>

        <v-flex xs12 sm6 md8>
          <v-text-field
            label="CEP"
            v-model="fornecedor.cep"
            data-vv-name="cep"
            :error-messages="errors.collect('cep')"
            v-validate="'required'"
          />
        </v-flex>

        <v-flex xs12 sm6 md6>
          <v-text-field
            label="Rua"
            v-model="fornecedor.logradouro"
            data-vv-name="rua"
            :error-messages="errors.collect('rua')"
            v-validate="'required'"
          />
        </v-flex>

        <v-flex xs12 sm6 md2>
          <v-text-field
            label="Nº"
            data-vv-name="número"
            v-model="fornecedor.numero"
            :error-messages="errors.collect('número')"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md5>
          <v-text-field
            label="Bairro"
            v-model="fornecedor.bairro"
            data-vv-name="bairro"
            :error-messages="errors.collect('bairro')"
            v-validate="'required'"
          />
        </v-flex>

        <v-flex xs12 sm6 md2>
          <v-text-field
            label="Cidade"
            v-model="fornecedor.municipio"
            data-vv-name="cidade"
            :error-messages="errors.collect('cidade')"
            v-validate="'required'"
          />
        </v-flex>

        <v-flex xs12 sm6 md1>
          <v-text-field
            label="UF"
            v-model="fornecedor.uf"
            data-vv-name="uf"
            :error-messages="errors.collect('uf')"
            v-validate="'required'"
          />
        </v-flex>

        <v-flex xs12 sm6 md8>
          <v-text-field
            label="Telefone"
            v-model="fornecedor.telefone"
            :mask="masks.telefone"
            data-vv-name="telefone"
            :error-messages="errors.collect('telefone')"
            v-validate="'required'"
          />
        </v-flex>

        <v-flex xs12 sm6 md8>
          <v-btn v-if="$route.name === 'Fornecedor'" @click="addFornecedor(fornecedor)">Enviar</v-btn>
          <v-btn v-else @click="updateFornecedor(fornecedor.id, fornecedor)">Enviar</v-btn>
          <v-btn @click="clear">Limpar</v-btn>
        </v-flex>  
        <alerta :snack="snack"></alerta>
      </v-layout>
    </v-container>
  </form>
</template>

<script>
import masks from "@/utils/masks/masks";
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
  name: "form-fornecedor",
  data() {
    return {
      fornecedor: {
        id: "",
        codigo: "",
        nome: "",
        logradouro: "",
        numero: "",
        bairro: "",
        municipio: "",
        cep: "",
        uf: "",
        cep: "",
        telefone: "",
        email: "",
        cnpj: ""
      },
      valid: true,
      masks,
      snack: true
    };
  },
  mounted() {
    this.getFornecedor(this.id);
  },

  methods: {
    buscarFornecedor(cnpj) {
      const url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;
      axios
        .get("https://cors-anywhere.herokuapp.com/" + url)
        .then(resp => {
          this.fornecedor = resp.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    changeSnack() {
      this.$root.$emit("change-snack", this.snack);
    },

    addFornecedor(fornecedor) {
      const url = "http://localhost:8080/Gestoque/fornecedor/new";
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .post(url, fornecedor)
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

    updateFornecedor(id, fornecedor) {
      const url = `http://localhost:8080/Gestoque/fornecedor/${id}`;
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .put(url, fornecedor)
            .then(resp => {
              if (resp.status === 204) {
                this.$router.push("/fornecedores");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    getFornecedor(id) {
      if (id) {
        const fornecedores = this.$store.state.Fornecedores.list;
        const fornecedoresResult = fornecedores.filter(item => item.id == id);
        if (fornecedoresResult && fornecedoresResult.length > 0) {
          this.fornecedor = fornecedoresResult[0];
        }
      }
    },

    clear() {
      this.fornecedor.nome = "";
      this.fornecedor.cnpj = "";
      this.fornecedor.email = "";
      this.fornecedor.cep = "";
      this.fornecedor.logradouro = "";
      this.fornecedor.bairro = "";
      this.fornecedor.telefone = "";
      this.fornecedor.numero = "";
      this.fornecedor.municipio = "";
      this.fornecedor.uf = "";
      this.$validator.reset();
    }
  }
};
</script>