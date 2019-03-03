<template>
  <form ref="form" @submit.prevent="submit">
    <v-container>
      <v-container grid-list-sm>
        <v-layout wrap>
          <v-flex xs12 sm6 md8>
            <v-text-field
              v-model="fornecedor.nome"
              v-validate="'required|max:100'"
              label="Nome"
              data-vv-name="nome"
              :error-messages="errors.collect('nome')"
            />
          </v-flex>

          <v-flex v-if="$route.name === 'Fornecedor'" xs12 sm6 md8>
            <v-text-field
              v-model="fornecedor.cnpj"
              v-validate="'required'"
              label="CNPJ"
              :mask="masks.cnpj"
              data-vv-name="cnpj"
              :error-messages="errors.collect('cnpj')"
              @change="buscarFornecedor(fornecedor.cnpj)"
            />
          </v-flex>

          <v-flex v-else xs12 sm6 md8>
            <v-text-field
              v-model="fornecedor.cnpj"
              v-validate="'required'"
              label="CNPJ"
              :mask="masks.cnpj"
              data-vv-name="cnpj"
              :error-messages="errors.collect('cnpj')"
            />
          </v-flex>

          <v-flex xs12 sm6 md8>
            <v-text-field
              v-model="fornecedor.email"
              v-validate="'required|email'"
              label="E-mail"
              data-vv-name="email"
              :error-messages="errors.collect('email')"
            />
          </v-flex>

          <v-flex xs12 sm6 md8>
            <v-text-field
              v-model="fornecedor.cep"
              v-validate="'required'"
              label="CEP"
              :mask="masks.cep"
              data-vv-name="cep"
              :error-messages="errors.collect('cep')"
            />
          </v-flex>

          <v-flex xs12 sm6 md6>
            <v-text-field
              v-model="fornecedor.logradouro"
              v-validate="'required'"
              label="Rua"
              data-vv-name="rua"
              :error-messages="errors.collect('rua')"
            />
          </v-flex>

          <v-flex xs12 sm6 md2>
            <v-text-field
              v-model="fornecedor.numero"
              label="Nº"
              data-vv-name="número"
              :error-messages="errors.collect('número')"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md5>
            <v-text-field
              v-model="fornecedor.bairro"
              v-validate="'required'"
              label="Bairro"
              data-vv-name="bairro"
              :error-messages="errors.collect('bairro')"
            />
          </v-flex>

          <v-flex xs12 sm6 md2>
            <v-text-field
              v-model="fornecedor.municipio"
              v-validate="'required'"
              label="Cidade"
              data-vv-name="cidade"
              :error-messages="errors.collect('cidade')"
            />
          </v-flex>

          <v-flex xs12 sm6 md1>
            <v-text-field
              v-model="fornecedor.uf"
              v-validate="'required'"
              label="UF"
              data-vv-name="uf"
              :error-messages="errors.collect('uf')"
            />
          </v-flex>

          <v-flex xs12 sm6 md8>
            <v-text-field
              v-model="fornecedor.telefone"
              v-validate="'required'"
              label="Telefone"
              :mask="masks.telefone"
              data-vv-name="telefone"
              :error-messages="errors.collect('telefone')"
            />
          </v-flex>

          <v-flex xs12 sm6 md8>
            <v-btn v-if="$route.name === 'Fornecedor'" @click="addFornecedor()">Enviar</v-btn>
            <v-btn v-else @click="updateFornecedor(fornecedor.id, fornecedor)">Editar</v-btn>
            <v-btn @click="clear">Limpar</v-btn>
          </v-flex>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline yellow lighten-4">Aviso</v-card-title>
              <v-card-text>{{errorMessage}}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="dialog = false">Fechar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <alerta :snack="snack" text="Cadastro efetuado com sucesso!"></alerta>
        </v-layout>
      </v-container>
    </v-container>
  </form>
</template>

<script>
import masks from '@/utils/masks/masks'
import axios from 'axios'
import Alerta from '@/components/Alerta'
import { mapState } from 'vuex'
export default {
  name: 'FormFornecedor',
  components: {
    Alerta
  },

  $_veeValidate: {
    validator: 'new'
  },
  props: {
    id: {
      type: [Number, String],
      default: 0 | ''
    }
  },
  data () {
    return {
      fornecedor: {
        id: '',
        nome: '',
        telefone: '',
        cnpj: '',
        email: '',
        cep: '',
        logradouro: '',
        bairro: '',
        municipio: '',
        uf: '',
        numero: ''
      },
      dialog: false,
      masks,
      snack: true,
      errorMessage: ''
    }
  },

  computed: {
    ...mapState('Fornecedores', ['fornecedores'])
  },

  mounted () {
    this.getFornecedor(this.id)
  },

  methods: {
    buscarFornecedor (cnpj) {
      const url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
      axios
        .get(url)
        .then(resp => {
          this.fornecedor = resp.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    changeSnack () {
      this.$root.$emit('change-snack', this.snack)
    },

    addFornecedor () {
      return new Promise(async (resolve, reject) => {
        try {
          const fornecedor = this.fornecedor
          const url = 'http://localhost:3000/fornecedor'
          const valid = await this.$validator.validateAll()
          if (valid) {
            const resp = await axios.post(url, fornecedor)
            if (resp.status === 200) {
              this.changeSnack()
              this.clear()
            }
          }
        } catch (error) {
          if (error.response.status === 400) {
            this.errorMessage = error.response.data.message
            this.dialog = true
          }
        }
      })
    },

    updateFornecedor (id, fornecedor) {
      return new Promise(async (resolve, reject) => {
        try {
          const fornecedor = this.fornecedor
          const url = `http://localhost:3000/fornecedor/${id}`
          const valid = await this.$validator.validateAll()
          if (valid) {
            const resp = await axios.put(url, fornecedor)
            if (resp.status === 200) {
              this.$router.push('/fornecedores')
            } else {
              this.dialog = true
            }
          }
        } catch (error) {
          if (error.response.status === 400) {
            this.errorMessage = error.response.data.message
            this.dialog = true
          }
        }
      })
    },

    getFornecedor (id) {
      if (id) {
        const fornecedores = this.fornecedores.fornecedores
        // eslint-disable-next-line eqeqeq
        const fornecedoresResult = fornecedores.filter(item => item.id == id)
        if (fornecedoresResult && fornecedoresResult.length > 0) {
          this.fornecedor = fornecedoresResult[0]
        }
      }
    },

    clear () {
      this.fornecedor.nome = ''
      this.fornecedor.cnpj = ''
      this.fornecedor.email = ''
      this.fornecedor.cep = ''
      this.fornecedor.logradouro = ''
      this.fornecedor.bairro = ''
      this.fornecedor.telefone = ''
      this.fornecedor.numero = ''
      this.fornecedor.municipio = ''
      this.fornecedor.uf = ''
      this.$validator.reset()
    }
  }
}
</script>
