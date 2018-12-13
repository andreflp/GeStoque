<template>
  <v-container fluid>
    <v-container>
      <form ref="form" @submit.prevent="addProduto">
        <v-flex xs12 sm8>
          <v-text-field
            label="Nome"
            v-model="produto.nome"
            data-vv-name="nome"
            :error-messages="errors.collect('nome')"
            v-validate="'required|max:50'"
          />

          <v-text-field
            label="Código"
            v-model="produto.codigo"
            data-vv-name="código"
            :error-messages="errors.collect('código')"
            v-validate="'required'"
          />

          <v-autocomplete
            label="Fornecedores"
            v-model="produto.fornecedor"
            :items="list"
            item-text="nome"
            item-value="id"
            data-vv-name="fornecedor"
            :error-messages="errors.collect('fornecedor')"
            v-validate="'required'"
            return-object
          ></v-autocomplete>

          <v-autocomplete
            label="Categoria"
            v-model="produto.categoria"
            :items="categorias"
            item-text="nome"
            item-value="id"
            data-vv-name="categoria"
            :error-messages="errors.collect('categoria')"
            v-validate="'required'"
            return-object
          ></v-autocomplete>

          <v-text-field
            label="Preço"
            ref="preco"
            v-model.lazy="produto.preco"
            v-money="money"
            data-vv-name="preço"
            :error-messages="errors.collect('preço')"
            v-validate="'required'"
          />

          <v-text-field
            label="Quantidade"
            v-model="produto.quantidade"
            data-vv-name="quantidade"
            v-if="$route.name === 'Produto'"
            :error-messages="errors.collect('quantidade')"
            v-validate="'required'"
          />
        </v-flex>

        <alerta :snack="snack"></alerta>
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
import masks from "@/utils/masks/masks";
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
import Alerta from "@/components/Alerta";
import { VMoney } from "v-money";
export default {
  components: {
    Alerta
  },
  $_veeValidate: {
    validator: "new"
  },
  props: {
    id: {
      type: [Number, String]
    }
  },
  name: "form-produto",
  data() {
    return {
      produto: {
        id: "",
        codigo: "",
        nome: "",
        categoria: "",
        preco: 0,
        quantidade: "",
        fornecedor: ""
      },
      money: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        masked: false
      },
      masks,
      snack: true,
      dialog: false,
      dialog2: false,
      msg: ""
    };
  },

  directives: { money: VMoney },

  created() {
    this.setFornecedores();
    this.setCategorias();
  },

  mounted() {
    this.getProduto(this.id);
  },

  computed: {
    ...mapState("Categorias", ["categorias"]),
    ...mapState("Fornecedores", ["list"]),
    ...mapState("Produtos", ["produtos"])
  },

  methods: {
    ...mapActions("Categorias", ["setCategorias"]),
    ...mapActions("Produtos", ["setProdutos"]),
    ...mapActions("Fornecedores", ["setFornecedores"]),

    changeSnack() {
      this.$root.$emit("change-snack", this.snack);
    },

    replacePreco(produto) {
      produto.preco = this.produto.preco
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".");
    },

    searchAndSave(produto) {
      const categoriaResult = this.categorias.filter(
        item => item.id == produto.categoria.id
      );
      const fornecedorResult = this.list.filter(
        item => item.id == produto.fornecedor.id
      );

      if (
        categoriaResult &&
        categoriaResult.length > 0 &&
        (fornecedorResult && fornecedorResult.length > 0)
      ) {
        this.addProduto(produto);
      } else {
        if (!(categoriaResult && categoriaResult.length > 0)) {
          this.msg = "Categoria não encontrada.";
          this.dialog2 = true;
        } else if (!(fornecedorResult && fornecedorResult.length > 0)) {
          this.msg = "Fornecedor não encontrado.";
          this.dialog2 = true;
        }
      }
    },

    searchCategoria(categoria) {
      const categoriaResult = this.categorias.filter(item => item == categoria);
      if (categoriaResult && categoriaResult.length > 0) {
        this.addProduto(produto);
      } else {
        this.msg = "Categoria não encontrada.";
        this.dialog2 = true;
      }
    },

    searchFornecedor(fornecedor) {
      const fornecedorResult = this.list.filter(item => item == fornecedor);
      if (fornecedorResult && fornecedorResult.length > 0) {
        this.addProduto(produto);
      } else {
        this.msg = "Fornecedor não encontrado.";
        this.dialog2 = true;
      }
    },

    addProduto(produto) {
      this.replacePreco(produto);
      const codigo = this.produto.codigo;
      const url = "http://localhost:8080/Gestoque/produto/new";
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .post(url, produto, {
              params: { codigo: codigo }
            })
            .then(resp => {
              if (resp.data === true) {
                this.dialog = true;
              } else if (resp.data === false) {
                this.changeSnack();
                this.clear();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    updateProduto(id, produto) {
      this.replacePreco(produto);
      const codigo = this.produto.codigo;
      const url = `http://localhost:8080/Gestoque/produto/update/${id}`;
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios
            .put(url, produto, {
              params: { codigo: codigo }
            })
            .then(resp => {
              if (resp.data === true) {
                this.dialog = true;
              } else if (resp.data === false) {
                this.$router.push("/produtos");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    clear() {
      this.produto.nome = "";
      this.produto.codigo = "";
      this.produto.categoria = "";
      this.produto.fornecedor = "";
      this.$refs.preco.$el.getElementsByTagName("input")[0].value = 0;
      this.produto.preco = "";
      this.produto.quantidade = "";
      this.$validator.reset();
    },

    getProduto(id) {
      if (id) {
        const produtos = this.produtos;
        const produtoResult = produtos.filter(item => item.id == id);
        if (produtoResult && produtoResult.length > 0) {
          this.produto = produtoResult[0];
        }
      }
    }
  }
};
</script>