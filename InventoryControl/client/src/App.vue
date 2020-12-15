<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        InventoryControl
      </div>

      <v-btn to="/products" text>
        Produtos
      </v-btn>

      <v-btn to="/movements" text>
        Movimentações
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
  .v-main {
    margin-top: 40px;
  }
</style>