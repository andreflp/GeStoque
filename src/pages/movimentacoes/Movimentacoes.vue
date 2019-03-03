<template>
  <v-container>
    <v-container>
      <v-flex xs12 sm8>
        <form ref="form" @submit.prevent="submit">
          <v-autocomplete
            v-model="movimentacao.produtoId"
            v-validate="'required'"
            label="Produto"
            :items="produtos.produtos"
            item-text="nome"
            item-value="id"
            data-vv-name="produto"
            :error-messages="errors.collect('produto')"
          ></v-autocomplete>

          <v-select
            v-model="movimentacao.tipo"
            v-validate="'required'"
            label="Tipo"
            item-text="nome"
            item-value="value"
            data-vv-name="tipo"
            :items="tipos"
            :error-messages="errors.collect('tipo')"
          ></v-select>

          <v-text-field
            v-model="movimentacao.quantidade"
            v-validate="'required|numeric'"
            label="Quantidade"
            data-vv-name="quantidade"
            :error-messages="errors.collect('quantidade')"
          />
          <v-btn @click="searchAndSave(movimentacao)">Enviar</v-btn>
          <v-btn>Limpar</v-btn>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline yellow lighten-4">Aviso</v-card-title>
              <v-card-text>Quantidade maior que a do produto.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="dialog = false">Fechar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog2" persistent max-width="290">
            <v-card>
              <v-card-title class="headline yellow lighten-4">Aviso</v-card-title>
              <v-card-text>Produto não encontrado.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="dialog2 = false">Fechar</v-btn>
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Movimentacoes',

  $_veeValidate: {
    validator: 'new'
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      movimentacao: {
        tipo: '',
        produtoId: '',
        quantidade: ''
      },
      tipos: [{ nome: 'Entrada', value: 'E' }, { nome: 'Saida', value: 'S' }],
      dialog: false,
      dialog2: false,
      pagination: {
        rowsPerPage: 10,
        page: 1,
        nome: ''
      }
    }
  },

  computed: {
    ...mapState('Produtos', ['produtos'])
  },

  created () {
    this.setProdutos(this.pagination)
  },

  mounted () {
    this.getProduto(this.id)
  },

  methods: {
    ...mapActions('Produtos', ['setProdutos']),

    searchAndSave (movimentacao) {
      const produto = movimentacao.produtoId
      console.log(produto)
      const produtoResult = this.produtos.produtos.filter(
        item => item.id == produto
      )
      console.log(produtoResult)
      if (produtoResult && produtoResult.length > 0) {
        this.addMovimentacao(movimentacao)
      } else {
        this.dialog2 = true
      }
    },

    addMovimentacao (movimentacao) {
      return new Promise(async (resolve, reject) => {
        try {
          const url = 'http://localhost:3000/movimentacao'
          const valid = await this.$validator.validateAll()
          if (valid) {
            const resp = await axios.post(url, movimentacao)
            if (resp.status === 200) {
              this.$router.push('/produtos')
            }
          }
        } catch (error) {
          this.dialog = true
        }
      })
    },

    changeSnack () {
      this.$root.$emit('change-snack', this.snack)
    },
    clear () {
      this.movimentacao.tipo = ''
      this.movimentacao.produto = ''
      this.movimentacao.quantidade = ''
      this.$validator.reset()
    },

    getProduto (id) {
      if (id) {
        const produtos = this.produtos.produtos
        const produtoResult = produtos.filter(item => item.id == id)
        if (produtoResult && produtoResult.length > 0) {
          this.produto = produtoResult[0]
          this.movimentacao.produtoId = this.produto.id
        }
      }
    }
  }
}
</script>

<style></style>
