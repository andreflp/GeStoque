<template>
  <v-app>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <h2>Fornecedores</h2>
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
          :items="list"
          :search="search"
          :pagination.sync="pagination"
          :total-items="categorias"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center text-truncate">{{ props.item.nome }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">{{ props.item.cnpj | cnpj }}</td>
            <td class="text-xs-center">{{ props.item.telefone | phone }}</td>
            <td class="text-xs-center">{{ props.item.uf }}</td>
            <td class="text-xs-center">
              <v-tooltip left>
                <v-btn
                  slot="activator"
                  flat
                  icon
                  color="primary"
                  :to="`fornecedor/${props.item.id}`"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>Editar</span>
              </v-tooltip>
              <v-tooltip right>
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
        text: 'Nome',
        align: 'center',
        value: 'nome'
      },
      { text: 'E-mail', value: 'email', align: 'center' },
      { text: 'CNPJ', value: 'cnpj', align: 'center' },
      { text: 'Telefone ', value: 'telefone', align: 'center' },
      { text: 'UF', value: 'uf', align: 'center' },
      { text: 'Outros', align: 'center' }
    ],

    pagination: {}
  }),

  computed: {
    ...mapState('Fornecedores', ['list']),
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
    this.setFornecedores()
  },
  methods: {
    ...mapActions('Fornecedores', ['setFornecedores', 'deleteFornecedor']),

    confirmDialog (item, id) {
      this.$confirm('Deseja excluir este fornecedor?', {
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
          this.deleteFornecedor([item, id])
        }
      })
    }
  }
}
</script>
