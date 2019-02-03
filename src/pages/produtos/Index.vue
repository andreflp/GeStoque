<template>
  <v-app>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <h2>Produtos</h2>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Pesquisar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="produtos"
          :search="search"
          :pagination.sync="pagination"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.codigo }}</td>
            <td class="text-xs-center">{{ props.item.nome }}</td>
            <td class="text-xs-center">{{ props.item.categoria.nome }}</td>
            <td class="text-xs-center">{{ props.item.preco | currency }}</td>
            <td class="text-xs-center">{{ props.item.quantidade }}</td>
            <td class="text-xs-center">{{ props.item.fornecedor.nome }}</td>
            <td class="text-xs-center">
              <v-tooltip left>
                <v-btn slot="activator" flat icon color="primary" :to="`produto/${props.item.id}`">
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>Editar</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  flat
                  icon
                  color="red"
                  @click="confirmDialog(props.item, props.item.id)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>Remover</span>
              </v-tooltip>
              <v-tooltip right>
                <v-btn
                  slot="activator"
                  flat
                  icon
                  color="teal accent-4"
                  :to="`movimentacoes/${props.item.id}`"
                >
                  <v-icon>compare_arrows</v-icon>
                </v-btn>
                <span>Movimentar</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
      </v-card>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    search: '',

    headers: [
      {
        text: 'Código',
        align: 'center',
        value: 'codigo'
      },
      {
        text: 'Nome',
        value: 'nome',
        align: 'center'
      },
      {
        text: 'Categorias',
        value: 'categoria.nome',
        align: 'center'
      },
      {
        text: 'Preço',
        value: 'preco',
        align: 'center'
      },
      {
        text: 'Quantidade ',
        value: 'quantidade',
        align: 'center'
      },
      {
        text: 'Fornecedor',
        value: 'fornecedor.nome',
        align: 'center'
      },
      {
        text: 'Opções',
        align: 'center'
      }
    ],
    pagination: {}
  }),

  computed: {
    ...mapState('Produtos', ['produtos']),
    pages () {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) {
        return 0
      }

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },

  mounted () {
    this.setProdutos()
  },

  methods: {
    ...mapActions('Produtos', ['setProdutos', 'deleteProduto']),

    confirmDialog (item, id) {
      this.$confirm('Deseja excluir este produto?', {
        title: 'Confirmação',
        buttonTrueText: 'Excluir',
        buttonFalseText: 'Cancelar',
        buttonTrueColor: 'red',
        buttonFalseColor: 'primary',
        color: 'teal accent-4',
        icon: '',
        width: '320'
      }).then(resp => {
        if (resp) {
          this.deleteProduto([item, id])
        }
      })
    }
  }
}
</script>
