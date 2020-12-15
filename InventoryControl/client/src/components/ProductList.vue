<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>
          Produtos
          <v-btn small id="btn-add-product" @click="addProduct">+NOVO</v-btn>
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="products"
            disable-pagination
            :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="viewProduct(item.id)">mdi-eye</v-icon>
            <v-icon small class="mr-2" @click="editProduct(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="removeProduct(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ProductService from "@/services/ProductService";
export default {
  name: "ProductList",
  data() {
    return {
      products: [],
      headers: [
        { text: "Código", value: "code", align: "start", sortable: false },
        { text: "Descrição", value: "description", align: "start", sortable: false },
        { text: "Tipo", value: "type", align: "start", sortable: false },
        { text: "Quantidade", value: "quantity", align: "start", sortable: false },
        { text: "",value: "actions", align: "end", sortable: false }
      ],
    };
  },
  methods: {
    retrieveProducts() {
      ProductService.getAllProducts()
          .then((response) => {
            this.products = response.data.map(this.getDisplayProduct);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveProducts();
    },

    viewProduct(id) {
      this.$router.push({ name: "product", params: { id: id } });
    },

    editProduct(id) {
      this.$router.push({ name: "editProduct", params: { id: id } });
    },

    addProduct() {
      this.$router.push({ name: "addProduct" });
    },

    removeProduct(id) {
      ProductService.removeProduct(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayProduct(product) {
      return {
        id: product.id,
        code: this.parseStringValue(product.code),
        description: this.parseStringValue(product.description),
        type: this.parseStringValue(product.type),
        quantity: product.quantity
      };
    },

    parseStringValue(value) {
      if (value) {
        return value.length > 30 ? value.substr(0, 30) + "..." : value;
      }
      return '';
    }
  },

  mounted() {
    this.retrieveProducts();
  },
};
</script>

<style >
  .list {
    max-width: 750px;
  }

  #btn-add-product {
    margin-left: 20px;
  }
</style>