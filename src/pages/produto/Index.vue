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
            placeholder="Digite uma categoria"
            :items="categorias.categorias"
            item-text="nome"
            item-value="id"
            :return-object="false"
            data-vv-name="categoria"
            :error-messages="errors.collect('categoria')"
          ></v-autocomplete>

          <v-text-field
            ref="preco"
            v-model.lazy="produto.preco"
            v-money="money"
            v-validate="'required'"
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
            <v-card-text>Produto/código já cadastrado.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click.native="dialog = false">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" persistent max-width="290">
          <v-card>
            <v-card-title class="headline yellow lighten-4">Aviso</v-card-title>
            <v-card-text>{{msg}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click.native="dialog2 = false">Fechar</v-btn>
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
      pagination: {
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
      this.paginationFornecedor.nome = newVal
      this.setFornecedores(this.paginationFornecedor)
    },
    searchCategoria (newVal, oldVal) {
      this.paginationCategoria.nome = newVal
      this.setCategorias(this.paginationCategoria)
    }
  },

  created () {},

  mounted () {
    this.getProduto(this.id)
    setTimeout(() => {
      this.setFornecedores(this.pagination)
      this.setCategorias(this.pagination)
    }, 500)
  },

  methods: {
    ...mapActions('Categorias', ['setCategorias']),
    ...mapActions('Produtos', ['setProdutos']),
    ...mapActions('Fornecedores', ['setFornecedores']),

    changeSnack () {
      this.$root.$emit('change-snack', this.snack)
    },

    replacePreco (produto) {
      produto.preco = this.produto.preco
        .replace('R$', '')
        .replace('.', '')
        .replace(',', '.')
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

    /* searchCategoria (categoria) {
      const categoriaResult = this.categorias.filter(item => item === categoria)
      if (categoriaResult && categoriaResult.length > 0) {
        this.addProduto(produto)
      } else {
        this.msg = 'Categoria não encontrada.'
        this.dialog2 = true
      }
    },

    searchFornecedor (fornecedor) {
      const fornecedorResult = this.list.filter(item => item === fornecedor)
      if (fornecedorResult && fornecedorResult.length > 0) {
        this.addProduto(produto)
      } else {
        this.msg = 'Fornecedor não encontrado.'
        this.dialog2 = true
      }
    }, */

    addProduto (produto) {
      return new Promise(async (resolve, reject) => {
        try {
          this.replacePreco(produto)
          const url = 'http://localhost:3000/produto'
          const valid = await this.$validator.validateAll()
          if (valid) {
            const resp = await axios.post(url, produto)
            if (resp.status === 200) {
              this.changeSnack()
              this.clear()
            }
          }
        } catch (error) {
          if (error.response.status === 400) {
            this.msgErro = error.response.data.msg
            this.dialog = true
          }
        }
      })
    },

    updateProduto (id, produto) {
      this.replacePreco(produto)
      const codigo = this.produto.codigo
      const url = `http://localhost:3000/produto/${id}`
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .put(url, produto, {
              params: { codigo: codigo }
            })
            .then(resp => {
              if (resp.data === true) {
                this.dialog = true
              } else if (resp.data === false) {
                this.$router.push('/produtos')
              }
            })
            .catch(error => {
              console.log(error)
            })
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
        const produtos = this.produtos
        const produtoResult = produtos.filter(item => item.id == id)
        if (produtoResult && produtoResult.length > 0) {
          this.produto = produtoResult[0]
        }
      }
    }
  }
}
</script>
