<template>
  <v-app>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <h2>Categorias</h2>
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
          :headers="headers"
          :total-items="pagination.totalItems"
          :items="categorias.categorias"
          :search="pagination.nome"
          :pagination.sync="pagination"
          :loading="loading"
          disable-initial-sort
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center">{{ props.item.nome }}</td>
              <td class="text-xs-center">
                <v-tooltip left>
                  <v-btn
                    slot="activator"
                    flat
                    icon
                    color="primary"
                    :to="`categoria/${props.item.id}`"
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
          >{{props.pageStart}}-{{props.pageStart + categorias.categorias.length - 1}} de {{ categorias.count }}</template>
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
  data () {
    return {
      headers: [
        {
          text: 'Nome',
          align: 'center',
          value: 'nome'
        },
        {
          text: 'Outros',
          align: 'center'
        }
      ],
      pagination: {
        totalItems: 0,
        nome: '',
        sortBy: ''
      }
    }
  },

  computed: {
    ...mapState('Categorias', ['categorias', 'loading']),

    pages () {
      if (this.categorias.pages == null) {
        return 0
      }
      return this.categorias.pages
    }
  },

  watch: {
    pagination: function (val) {
      this.setCategorias(val)
    }
  },

  created () {},

  mounted () {
    this.atualizarTable()
  },

  methods: {
    ...mapActions('Categorias', ['setCategorias', 'deleteCategoria']),

    atualizarTable () {
      this.setCategorias(this.pagination)
      this.pagination.totalItems = this.categorias.count
    },

    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },

    confirmDialog (item, id, pag) {
      this.$confirm('Deseja excluir esta categoria?', {
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
          this.deleteCategoria([item, id, pag])
        }
      })
    }
  }
}
</script>
