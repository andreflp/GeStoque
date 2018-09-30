<template>
  <v-navigation-drawer 
    app 
    :permanent="drawer" 
  >
    <v-toolbar flat color="teal accent-4" dark>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            GeStoque
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.route"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-group
        prepend-icon="person_add"
        false
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>Cadastro</v-list-tile-title>
          </v-list-tile-content>  
        </v-list-tile>
        
        <v-list-tile
          v-for="cadastro in cadastros"
          :key="cadastro.title"
          :to="cadastro.route"
        >
          <v-list-tile-action>
            <v-icon>{{ cadastro.icon }}</v-icon>
          </v-list-tile-action>
          
          <v-list-tile-action>
            <v-list-tile-title>{{ cadastro.title }}</v-list-tile-title>
          </v-list-tile-action>

        </v-list-tile>
      </v-list-group>
    </v-list>
    <v-dialog v-model="modal" max-width="500px">
      <v-card>
        <v-card-title>
          Tipo
        </v-card-title>
        <v-container>
          <v-card-text>
          <v-text-field 
          label="Nome"/>
            <v-btn type="submit">Enviar</v-btn>
          </v-card-text>
        </v-container>
        <v-divider/>
        <v-card-actions>
          <v-btn color="primary" @click="modal = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "my-menu",
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "dashboard", route: "/" },
        { title: "Fornecedores", icon: "list", route: "/fornecedores" },
        { title: "Produtos", icon: "list", route: "/produtos" },
        { title: "Categorias", icon: "list", route: "/categorias" },
        { title: "Relatórios", icon: "assignment", route: "/relatorios" },

        {
          title: "Movimentações",
          icon: "compare_arrows",
          route: "/movimentacoes"
        }
      ],
      cadastros: [
        {
          title: "Fornecedor",
          icon: "business_center",
          route: "/fornecedor"
        },
        { title: "Produto", icon: "inbox", route: "/produto" },
        { title: "Categoria", icon: "dns", route: "/categoria" }
      ],

      modal: false,
      drawer: false
    };
  },

  created() {
    this.$root.$on("updateDrawer", () => {
      this.drawer = !this.drawer;
    });
  }
};
</script>
