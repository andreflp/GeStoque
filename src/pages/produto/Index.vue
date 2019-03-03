<template>
  <v-container fluid>
    <v-container>
      <form ref="form" @submit.prevent="addProduto">
        <v-flex xs12 sm8>
          <v-text-field
            v-model="produto.nome"
            v-validate="'required|max:50'"
            label="Nome"
            data-vv-name="nome"
            :error-messages="errors.collect('nome')"
          />

          <v-text-field
            v-model="produto.codigo"
            v-validate="'required'"
            label="Código"
            data-vv-name="código"
            :error-messages="errors.collect('código')"
          />

          <v-autocomplete
            v-model="produto.fornecedorId"
            v-validate="'required'"
            :search-input.sync="searchFornecedor"
            label="Fornecedores"
            :items="fornecedores.fornecedores"
            item-text="nome"
            item-value="id"
            placeholder="Digite um fornecedor"
            data-vv-name="fornecedor"
            :error-messages="errors.collect('fornecedor')"
          ></v-autocomplete>

          <v-autocomplete
            v-model="produto.categoriaId"
            v-validate="'required'"
            :search-input.sync="searchCategoria"
            label="Categoria"
            :items="categorias.categorias"
            placeholder="Digite uma categoria"
            item-text="nome"
            item-value="id"
            data-vv-name="categoria"
            :error-messages="errors.collect('categoria')"
          ></v-autocomplete>

          <v-text-field
            ref="preco"
            v-model.lazy="produto.preco"
            v-validate="'required'"
            v-money="money"
            label="Preço"
            data-vv-name="preço"
            :error-messages="errors.collect('preço')"
          />

          <v-text-field
            v-if="$route.name === 'Produto'"
            v-model="produto.quantidade"
            v-validate="'required'"
            label="Quantidade"
            data-vv-name="quantidade"
            :error-messages="errors.collect('quantidade')"
          />
        </v-flex>

        <alerta :snack="snack" text="Cadastro efetuado com sucesso!"></alerta>
        <v-btn v-if="$route.name === 'Produto'" @click="addProduto(produto)">Enviar</v-btn>
        <v-btn v-else @click="updateProduto(produto.id, produto)">Editar</v-btn>
        <v-btn @click="clear()">Limpar</v-btn>
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
    </v-container>
  </v-container>
</template>

<script>
import masks from '@/utils/masks/masks'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import Alerta from '@/components/Alerta'
import { VMoney } from 'v-money'
export default {
  name: 'FormProduto',
  components: {
    Alerta
  },
  $_veeValidate: {
    validator: 'new'
  },

  directives: { money: VMoney },

  props: {
    id: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      menuProps: { closeOnContentClick: true },
      searchFornecedor: '',
      searchCategoria: '',
      produto: {
        id: '',
        codigo: '',
        nome: '',
        categoriaId: '',
        preco: 0,
        quantidade: '',
        fornecedorId: ''
      },
      paginationFornecedor: {
        nome: '',
        rowsPerPage: 10,
        page: 1
      },
      paginationCategoria: {
        nome: '',
        rowsPerPage: 10,
        page: 1
      },
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false
      },
      errorMessage: '',
      masks,
      snack: true,
      dialog: false,
      dialog2: false,
      msg: ''
    }
  },

  computed: {
    ...mapState('Categorias', ['categorias']),
    ...mapState('Fornecedores', ['fornecedores']),
    ...mapState('Produtos', ['produtos'])
  },

  watch: {
    searchFornecedor (newVal, oldVal) {
      console.log(newVal)
      this.paginationFornecedor.nome = newVal
      this.setFornecedores(this.paginationFornecedor)
    },
    searchCategoria (newVal, oldVal) {
      this.paginationCategoria.nome = newVal
      this.setCategorias(this.paginationCategoria)
    }
  },

  created () {
    this.getProduto(this.id)
  },

  mounted () {
    this.setFornecedores(this.paginationFornecedor)
    this.setCategorias(this.paginationCategoria)
  },

  methods: {
    ...mapActions('Categorias', ['setCategorias']),
    ...mapActions('Produtos', ['setProdutos']),
    ...mapActions('Fornecedores', ['setFornecedores']),

    changeSnack () {
      this.$root.$emit('change-snack', this.snack)
    },

    replacePreco (produto) {
      return new Promise(async (resolve, reject) => {
        if (produto.preco.includes(',') && produto.preco.includes('.')) {
          produto.preco = await this.produto.preco
            .replace(',', '.')
            .replace('.', '')
        } else {
          produto.preco = await this.produto.preco.replace(',', '.')
        }
      })
    },

    searchAndSave (produto) {
      const categoriaResult = this.categorias.filter(
        item => item.id == produto.categoria.id
      )
      const fornecedorResult = this.list.filter(
        item => item.id == produto.fornecedor.id
      )

      if (
        categoriaResult &&
        categoriaResult.length > 0 &&
        (fornecedorResult && fornecedorResult.length > 0)
      ) {
        this.addProduto(produto)
      } else {
        if (!(categoriaResult && categoriaResult.length > 0)) {
          this.msg = 'Categoria não encontrada.'
          this.dialog2 = true
        } else if (!(fornecedorResult && fornecedorResult.length > 0)) {
          this.msg = 'Fornecedor não encontrado.'
          this.dialog2 = true
        }
      }
    },

    addProduto (produto) {
      return new Promise(async (resolve, reject) => {
        try {
          const url = 'http://localhost:3000/produto'
          const valid = await this.$validator.validateAll()
          if (valid) {
            this.replacePreco(produto)
            console.log(produto)
            const resp = await axios.post(url, produto)
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

    updateProduto (id, produto) {
      return new Promise(async (resolve, reject) => {
        try {
          const url = `http://localhost:3000/produto/${id}`
          const valid = await this.$validator.validateAll()
          if (valid) {
            this.replacePreco(produto)
            const resp = await axios.put(url, produto)
            if (resp.status === 200) {
              this.$router.push('/produtos')
            }
          }
        } catch (error) {
          this.dialog = true
          console.log(error)
        }
      })
    },

    clear () {
      this.produto.nome = ''
      this.produto.codigo = ''
      this.produto.categoriaId = ''
      this.produto.fornecedorId = ''
      this.$refs.preco.$el.getElementsByTagName('input')[0].value = 0
      this.produto.preco = ''
      this.produto.quantidade = ''
      this.$validator.reset()
    },

    getProduto (id) {
      if (id) {
        const produtos = this.produtos.produtos
        const produtoResult = produtos.filter(item => item.id == id)
        if (produtoResult && produtoResult.length > 0) {
          this.produto = produtoResult[0]
        }
      }
    }
  }
}
</script>
