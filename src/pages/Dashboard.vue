<template>
  <v-container>
    <v-layout>
      <v-flex xs12 xs4 sm4>
        <v-card class="text-md-center">
          <v-card-text>
            <div>
              <h2>PRODUTOS
                <v-icon color="red">inbox</v-icon>
              </h2>
              <h2>
                <animate-number
                  v-if="numStart === true"
                  ref="myNum1"
                  mode="manual"
                  duration="1000"
                  from="0"
                  :to="quantidadeProdutos"
                  from-color="#ec4949"
                  to-color="#ec4949"
                ></animate-number>
              </h2>
            </div>
            <br>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 xs4 sm4 style="margin-left: 20px; height: 200px">
        <v-card class="text-md-center">
          <v-card-text>
            <div>
              <h2>FORNECEDORES
                <v-icon color="primary">business_center</v-icon>
              </h2>
              <h2>
                <animate-number
                  v-if="numStart === true"
                  ref="myNum2"
                  mode="manual"
                  duration="1500"
                  from="0"
                  :to="quantidadeFornecedores"
                  from-color="#ec4949"
                  to-color="#216dd1"
                ></animate-number>
              </h2>
            </div>
            <br>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs4 sm4 style="margin-left: 20px;">
        <v-card class="text-md-center">
          <v-card-text>
            <span>
              <h2>MOVIMENTAÇÕES
                <v-icon color="teal accent-4">compare_arrows</v-icon>
              </h2>
              <h3>Entradas:
                <animate-number
                  v-if="numStart === true"
                  ref="myNum3"
                  mode="manual"
                  duration="1000"
                  from="0"
                  :to="qtdEntradas"
                  from-color="#ec4949"
                  to-color="#00BFA6"
                ></animate-number>
              </h3>

              <h3>Saidas:
                <animate-number
                  v-if="numStart === true"
                  ref="myNum4"
                  mode="manual"
                  duration="1000"
                  from="0"
                  :to="qtdSaidas"
                  from-color="#ec4949"
                  to-color="#00BFA6"
                ></animate-number>
              </h3>
            </span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Dashboard',

  data () {
    return {
      numStart: false,
      quantidadeProdutos: '',
      quantidadeFornecedores: '',
      qtdEntradas: '',
      qtdSaidas: ''
    }
  },

  computed: {
    ...mapState('Fornecedores', ['fornecedores']),
    ...mapState('Produtos', ['produtos'])
  },

  created () {
    this.listsLength()
  },

  mounted () {
    setTimeout(() => {
      this.listsLength()
      setTimeout(() => {
        this.numStart = true
        setTimeout(() => {
          this.startAnimate()
        }, 1000)
      }, 600)
    }, 500)

    this.countEntrada()
    this.countSaida()
  },

  methods: {
    ...mapActions('Produtos', ['setProdutos']),
    ...mapActions('Fornecedores', ['setFornecedores']),

    listsLength () {
      this.quantidadeProdutos = this.produtos.length
      this.quantidadeFornecedores = this.fornecedores.length
    },

    startAnimate () {
      this.$refs.myNum1.start()
      this.$refs.myNum2.start()
      this.$refs.myNum3.start()
      this.$refs.myNum4.start()
    }
  }
}
</script>

<style>
</style>
