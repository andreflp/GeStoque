<template>
  <v-container fluid>
    <v-container>
      <v-flex xs12 sm8>
        <form ref="form">
          <v-text-field
            v-model="categoria.nome"
            v-validate="'required|max:50'"
            label="Nome"
            data-vv-name="nome"
            :error-messages="errors.collect('nome')"
          />

          <v-btn v-if="$route.name === 'Categoria' " @click="addCategoria(categoria)">Enviar</v-btn>
          <v-btn v-else @click="updateCategoria(categoria.id, categoria)">Editar</v-btn>
          <v-btn @click="clear">Limpar</v-btn>
          <alerta :snack="snack" text="Cadastro efetuado com sucesso!"></alerta>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline yellow lighten-4">Aviso</v-card-title>
              <v-card-text>{{ errorMessage }}</v-card-text>
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
import axios from 'axios'
import Alerta from '@/components/Alerta'
import { mapState } from 'vuex'
export default {
  name: 'FormCategoria',
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
      categoria: {
        id: '',
        nome: ''
      },
      dialog: false,
      snack: true,
      errorMessage: ''
    }
  },

  computed: {
    ...mapState('Categorias', ['categorias'])
  },

  mounted () {
    this.getCategoria(this.id)
  },

  methods: {
    addCategoria (categoria) {
      return new Promise(async (resolve, reject) => {
        try {
          const url = 'http://localhost:3000/categoria'
          const valid = await this.$validator.validateAll()
          if (valid) {
            const resp = await axios.post(url, categoria)
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

    updateCategoria (id, categoria) {
      return new Promise(async (resolve, reject) => {
        try {
          const url = `http://localhost:3000/categoria/${id}`
          const valid = await this.$validator.validateAll()
          if (valid) {
            const resp = await axios.put(url, categoria)
            if (resp.status === 200) {
              this.$router.push('/categorias')
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

    getCategoria (id) {
      if (id) {
        const categorias = this.categorias.categorias
        // eslint-disable-next-line eqeqeq
        const categoriaResult = categorias.filter(item => item.id == id)
        if (categoriaResult && categoriaResult.length > 0) {
          this.categoria = categoriaResult[0]
        }
      }
    },

    changeSnack () {
      this.$root.$emit('change-snack', this.snack)
    },

    clear () {
      this.categoria.nome = ''
      this.$validator.reset()
    }
  }
}
</script>
