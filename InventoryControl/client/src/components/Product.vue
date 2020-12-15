<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>
          <v-icon small class="mr-2 icon-edit-product" @click="editProduct()">mdi-pencil</v-icon>
          {{ selectedProduct.code }}
        </v-card-title>
        <v-card-text>
          <p>{{ selectedProduct.description }} ({{ selectedProduct.type }})</p>
          <p>Estoque: {{ selectedProduct.quantity }}</p>
        </v-card-text>

        <v-data-table
            :headers="headers"
            :items="movementList"
            disable-pagination
            :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editMovement(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="removeMovement(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import MovementService from "@/services/MovementService";
import ProductService from "@/services/ProductService";

export default {
  name: "Product",
  data() {
    return {
      selectedProduct: {},
      movementList: [],
      headers: [
        { text: "Data", align: "start", sortable: false, value: "date" },
        { text: "Tipo", align: "start", sortable: false, value: "type" },
        { text: "Quantidade", align: "start", sortable: false, value: "quantity" },
        { text: "Valor", align: "start", sortable: false, value: "value" },
        { text: "", align: "end", value: "actions", sortable: false }
      ]
    }
  },
  methods: {
    editMovement(movementId) {
      this.$router.push({ name: "editMovement", params: { id: movementId } });
    },

    removeMovement(movementId) {
      MovementService.removeMovement(movementId)
          .then(() => {
            this.refreshProduct();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    refreshProduct() {
      ProductService.getProduct(this.$route.params.id)
          .then(response => {
            this.selectedProduct = response.data;
            console.log(this.selectedProduct);
            this.retrieveMovements();
          }).catch(e => {
            console.log(e);
          });
    },

    retrieveMovements() {
      MovementService.getMovementsFromProduct(this.selectedProduct.id)
          .then(response => {
            this.movementList = response.data.map(this.getDisplayMovement);
          }).catch(e => {
        console.log(e);
      });
    },

    getDisplayMovement(movement) {
      return {
        id: movement.id,
        date: movement.date,
        type: movement.type,
        quantity: movement.quantity,
        value: `R$ ${movement.value}`
      };
    },

    editProduct() {
      this.$router.push({ name: "editProduct", params: { id: this.selectedProduct.id } });
    },
  },

  mounted() {
    this.refreshProduct();
  },
}
</script>

<style>
  .icon-edit-product {
    margin-right: 10px;
  }
</style>