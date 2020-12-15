<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">{{ this.product.id ? 'Editar' : 'Criar' }} Produto</p>

    <div id="form" v-if="!submitted">
      <v-form ref="form" lazy-validation>

        <v-text-field
            v-model="product.code"
            :rules="[(v) => !!v || 'Código é obrigatório']"
            label="Código"
            required>
        </v-text-field>

        <v-text-field
            v-model="product.description"
            :rules="[(v) => !!v || 'Descrição é obrogatória']"
            label="Descrição"
            required>
        </v-text-field>
        
        <v-text-field
            v-model="product.type"
            :rules="[(v) => !!v || 'Tipo é obrogatório']"
            label="Tipo"
            required>
        </v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveProduct">Salvar</v-btn>
      <v-btn color="light" class="mt-3" @click="returnScreen">Cancelar</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Salvo com sucesso!
        </v-card-title>

        <v-card-actions>
          <v-btn color="primary" @click="returnScreen">Voltar</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import ProductService from "../services/ProductService";

export default {
  name: "EditProduct",
  data() {
    return {
      product: {},
      submitted: false
    };
  },

  methods: {
    saveProduct() {
      if (this.product.id) {
        ProductService.updateProduct(this.product.id, this.product)
            .then(() => this.submitted = true)
            .catch(e => {
              console.log(e);
            });
      } else {
        ProductService.addProduct(this.product)
            .then(() => this.submitted = true)
            .catch(e => {
              console.log(e);
            });
      }
    },

    returnScreen() {
      if (this.product.id) {
        this.$router.push({ name: "product", id: this.product.id});
      } else {
        this.$router.push({ name: "products" });
      }
    }
  },

  mounted() {
    this.product.id = this.$route.params.id;
    if (this.product.id) {
      ProductService.getProduct(this.product.id)
          .then(response => {
            this.product = response.data;
          }).catch(e => {
        console.log(e);
      });
    }
  }
};
</script>

<style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }

  div#form button.btn {
    margin-right: 20px;
  }
</style>
