<template>
  <v-app>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <h2>Fornecedores</h2>
          <v-spacer/>
          <v-text-field
            v-model="pagination.nome"
            append-icon="search"
            label="Pesquisar"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          v-model="fornecedores.fornecedores"
          :headers="headers"
          :total-items="pagination.totalItems"
          :items="fornecedores.fornecedores"
          :search="pagination.nome"
          :pagination.sync="pagination"
          :loading="loading"
          disable-initial-sort
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center">{{ props.item.nome }}</td>
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
                    @click="confirmDialog(props.item, props.item.id, pagination)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <span>Remover</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
          <template
            slot="pageText"
            slot-scope="props"
          >{{props.pageStart}}-{{props.pageStart + fornecedores.fornecedores.length - 1}} de {{ fornecedores.count }}</template>
        </v-data-table>
      </v-card>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages" @input="atualizarTable()"></v-pagination>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
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

    pagination: {
      totalItems: 0,
      nome: ''
    }
  }),

  computed: {
    ...mapState('Fornecedores', ['fornecedores', 'loading']),
    pages () {
      if (this.fornecedores.pages == null) {
        return 0
      }

      return this.fornecedores.pages
    }
  },

  watch: {
    pagination: function (newVal, oldVal) {
      this.setFornecedores(newVal)
    }
  },

  mounted () {
    this.setFornecedores(this.pagination)
  },
  methods: {
    ...mapActions('Fornecedores', ['setFornecedores', 'deleteFornecedor']),

    atualizarTable () {
      this.setFornecedores(this.pagination)
      this.pagination.totalItems = this.fornecedores.count
    },

    confirmDialog (item, id, pag) {
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
          this.deleteFornecedor([item, id, pag])
        }
      })
    }
  }
}
</script>
