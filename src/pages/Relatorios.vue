<template>
  <v-container>
    <div class="text-xs-center">
      <v-progress-circular
        center
        indeterminate
        color="primary"
        v-if="progress === true"
      ></v-progress-circular>
    </div>  
    <form ref="form">
      <v-container grid-list-sm>
        <v-layout wrap>  
          <v-flex xs12 sm8>
            <v-autocomplete
              label="Tipo Relatório" 
              :items="relatorios"
              v-model="tipoRelatorio"
              data-vv-name="tipo relatório"
              :error-messages="errors.collect('tipo relatório')"
              v-validate="'required'"
            >
            </v-autocomplete>
          </v-flex>

          <v-flex></v-flex>

          <v-flex xs12 sm6 md4 v-if="tipoRelatorio === 'Movimentações'">
            <v-text-field 
              label="Data Inicial" 
              :mask="masks.date"
              v-model="dataInicial"
              data-vv-name="data inicial"
              :error-messages="errors.collect('data inicial')"
              v-validate="'required'"
            />
          </v-flex>
          
          <v-flex xs12 sm6 md4 v-if="tipoRelatorio === 'Movimentações'">
            <v-text-field 
              label="Data Final" 
              :mask="masks.date"
              v-model="dataFinal"
              data-vv-name="data final"
              :error-messages="errors.collect('data final')"
              v-validate="'required'"
            />
          </v-flex>
         
          <v-flex xs12 sm8 v-if="tipoRelatorio === 'Fornecedores'">
            <v-autocomplete
              label="Fornecedores"
              :items="list"
              v-model="fornecedoresSelected"
              item-text="nome"
              item-value="id"
              multiple
              chips
            ></v-autocomplete>
          </v-flex>
          
          <v-flex xs12 sm8 v-if="tipoRelatorio === 'Produtos'">
            <v-autocomplete
              label="Produtos"
              :items="produtos"
              v-model="produtosSelected"
              item-text="nome"
              item-value="id"
              multiple
              chips
            >
            </v-autocomplete>
          </v-flex>

          <v-flex xs12 sm8 v-if="tipoRelatorio === 'Movimentações'">
            <v-autocomplete 
              label="Tipo" 
              :items="tipo" 
              multiple
              item-text="nome"
              item-value="value"
              v-model="tipoSelected"
              chips
              data-vv-name="tipo"
              :error-messages="errors.collect('tipo')"
              v-validate="'required'"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm8>
            <v-btn v-if="tipoRelatorio === 'Fornecedores'" @click="fornecedoresReport()">Enviar</v-btn>
            <v-btn v-else-if="tipoRelatorio === 'Produtos'" @click="produtosReport()">Enviar</v-btn>
            <v-btn v-else @click="movimentacaoReport()">Enviar</v-btn>
            <v-btn @click="clear()">Limpar</v-btn>
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
import { mapState, mapActions, mapGetters } from "vuex";

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
      produtosSelected: [0],
      fornecedoresSelected: [0],
      masks,
      dataInicial: "",
      dataFinal: "",
      progress: false,
      enabled: false
    };
  },

  created() {
    this.setFornecedores();
    this.setProdutos();
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
    },

    ...mapState("Fornecedores", ["list"]),
    ...mapState("Produtos", ["produtos"])
  },

  methods: {
    ...mapActions("Produtos", ["setProdutos"]),
    ...mapActions("Fornecedores", ["setFornecedores"]),

    movimentacaoReport() {
      const url = "http://localhost:8080/Gestoque/movimentacao/report";
      let tipos = this.tipoSelected;
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

      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.progress = true;
          axios
            .get(url, {
              params: {
                dataInicial: inicial,
                dataFinal: final,
                tipos: tipos
              },
              responseType: "blob",
              paramsSerializer: function(params) {
                return qs.stringify(params, { arrayFormat: "repeat" });
              }
            })
            .then(resp => {
              const url = window.URL.createObjectURL(new Blob([resp.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "movimentacoes.pdf");
              document.body.appendChild(link);
              link.click();
              this.progress = false;
              this.clear();
            })
            .catch(erro => {
              console.log(erro);
              this.progress = false;
            });
        }
      });
    },

    produtosReport() {
      let produtos = this.produtosSelected;
      const url = "http://localhost:8080/Gestoque/produto/report";

      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.progress = true;
          axios
            .get(url, {
              params: {
                produtosIds: produtos
              },
              responseType: "blob",
              paramsSerializer: function(params) {
                return qs.stringify(params, { arrayFormat: "repeat" });
              }
            })
            .then(resp => {
              const url = window.URL.createObjectURL(new Blob([resp.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "produtos.pdf");
              document.body.appendChild(link);
              link.click();
              this.progress = false;
              this.clear();
            })
            .catch(erro => {
              console.log(erro);
              this.progress = false;
            });
        }
      });
    },

    fornecedoresReport() {
      let fornecedores = this.fornecedoresSelected;
      const url = "http://localhost:8080/Gestoque/fornecedor/report";

      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.progress = true;
          axios
            .get(url, {
              params: {
                fornecedoresIds: fornecedores
              },
              responseType: "blob",
              paramsSerializer: function(params) {
                return qs.stringify(params, { arrayFormat: "repeat" });
              }
            })
            .then(resp => {
              const url = window.URL.createObjectURL(new Blob([resp.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "fornecedores.pdf");
              document.body.appendChild(link);
              link.click();
              this.progress = false;
              this.clear();
            })
            .catch(erro => {
              console.log(erro);
              this.progress = false;
            });
        }
      });
    },

    clear() {
      this.tipoRelatorio = "";
      this.produtosSelected = [0];
      this.fornecedoresSelected = [0];
      this.dataInicial = "";
      this.dataFinal = "";
      this.tipoSelected = [];
    }
  }
};
</script>

<style>
</style>
