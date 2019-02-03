export function translate (Vue, VueI18n, Vuetify) {
  Vue.use(VueI18n)
  const messages = {
    pt: {
      $vuetify: {
        dataIterator: {
          rowsPerPageText: 'Itens por página:',
          rowsPerPageAll: 'Todos',
          pageText: '{0}-{1} de {2}',
          noResultsText: 'Nenhum dado encontrado',
          nextPage: 'Próxima página',
          prevPage: 'Página anterior'
        },
        dataTable: {
          rowsPerPageText: 'Linhas por página:'
        },
        noDataText: 'Não há dados disponíveis'
      }
    }
  }
  const i18n = new VueI18n({
    locale: 'pt',
    messages
  })

  Vue.use(Vuetify, {
    lang: {
      t: (key, ...params) => i18n.t(key, params)
    }
  })
}
