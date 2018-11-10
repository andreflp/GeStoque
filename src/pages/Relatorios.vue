<template>
  <v-container>
    <form ref="form" @submit.prevent="submit">
      <v-container grid-list-sm>
        <v-layout wrap>  
          <v-flex xs12 sm8>
            <v-autocomplete
              label="Tipo Relatório" 
              :items="relatorios"
              v-model="tipoRelatorio"
            >
            </v-autocomplete>
          </v-flex>

          <v-flex></v-flex>

          <v-flex xs12 sm6 md4>
            <v-text-field 
              label="Data Inicial" 
              :mask="masks.date"
              v-model="dataInicial"
            />
          </v-flex>
          
          <v-flex xs12 sm6 md4>
            <v-text-field 
              label="Data Final" 
              :mask="masks.date"
              v-model="dataFinal"
            />
          </v-flex>

          <v-flex xs12 sm8>
            <v-autocomplete
              :items="fornecedores"
              label="Fornecedores"
              v-if="tipoRelatorio === 'Fornecedores'"
            ></v-autocomplete>
          </v-flex>
          
          <v-flex xs12 sm8>
            <v-autocomplete
              label="Produtos"
              :items="produtos"
              v-if="tipoRelatorio === 'Produtos'"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm8>
            <v-select 
              :items="tipo" 
              label="Tipo" 
              multiple
              item-text="nome"
              item-value="value"
              v-model="tipoSelected"
            ></v-select>
              
          </v-flex>
          
          <v-flex xs12 sm8>
            <v-btn v-if="tipoRelatorio === 'Fornecedores'" @click="reportFornecedores()">Enviar F</v-btn>
            <v-btn v-else-if="tipoRelatorio === 'Produtos'" @click="reportProdutos()">Enviar P</v-btn>
            <v-btn v-else @click="reportProdutos()">Enviar M</v-btn>
            <v-btn>Limpar</v-btn>
          </v-flex>    
        </v-layout>
      </v-container>
    </form>
  </v-container>
</template>

<script>
import masks from "@/utils/masks/masks";
import axios from "axios";
import qs from "qs";

export default {
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      relatorios: ["Produtos", "Fornecedores", "Movimentações"],
      tipoRelatorio: "",
      tipo: [{ nome: "Entrada", value: "E" }, { nome: "Saída", value: "S" }],
      tipoSelected: [],
      fornecedores: [],
      produtos: [],
      masks,
      dataInicial: "",
      dataFinal: ""
    };
  },

  computed: {
    replaceTipo: function() {
      this.tipoSelected.forEach((item, i) => {
        if (!this.tipoSelected.includes("S")) {
          if (item === "Saída") {
            this.tipoSelected[i] = "S";
          }
        } else if (!this.tipoSelected.includes("E")) {
          if (item === "Entrada") {
            this.tipoSelected[i] = "E";
          }
        }
      });
    }
  },

  methods: {
    reportProdutos() {
      const url =
        "http://localhost:8080/Gestoque/movimentacao/movimentacoesByDate";
      let tipos = this.tipo;
      let dataInicial = this.dataInicial;
      let dataFinal = this.dataFinal;
      let dataInicialDia = dataInicial.substr(0, 2);
      let dataInicialMes = dataInicial.substr(2, 2);
      let dataInicialAno = dataInicial.substr(4, 7);

      let dataFinalDia = dataFinal.substr(0, 2);
      let dataFinalMes = dataFinal.substr(2, 2);
      let dataFinalAno = dataFinal.substr(4, 7);

      let inicial =
        dataInicialAno + "-" + dataInicialMes + "-" + dataInicialDia;
      let final = dataFinalAno + "-" + dataFinalMes + "-" + dataFinalDia;

      axios
        .get(url, {
          params: {
            dataInicial: inicial,
            dataFinal: final,
            tipos: tipos
          },
          paramsSerializer: function(params) {
            return qs.stringify(params, { arrayFormat: "repeat" });
          }
        })
        .then(resp => {
          console.log(resp.data);
        })
        .catch(erro => {
          console.log(erro);
        });
    }
  }
};
</script>

<style>
</style>
