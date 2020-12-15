<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">{{ this.movement.id ? 'Editar' : 'Criar' }} Movimentação</p>

    <div id="form" v-if="!submitted">
      <v-form ref="form" lazy-validation>

        <v-select
            v-model="movement.type"
            :items="typeList"
            item-text="type"
            item-value="val"
            :rules="[(v) => (v == 0 || v == 1) || 'Tipo é obrigatório']"
            label="Tipo"
            required>
        </v-select>

        <v-select
            v-model="movement.product"
            :items="productList"
            :hint="movement.product ? `${movement.product.code} - ${movement.product.description}` : ''"
            item-text="code"
            :rules="[(v) => !!v || 'Produto é obrigatório']"
            label="Produto"
            persistent-hint
            return-object
            required>
        </v-select>

        <v-text-field
            v-model="movement.quantity"
            :rules="[(v) => !!v || 'Quantidade é obrigatória']"
            label="Quantidade"
            type="number"
            required>
        </v-text-field>

        <v-text-field
            v-model="movement.value"
            :rules="[(v) => !!v || 'Valor é obrogatório']"
            label="Valor"
            type="number"
            required>
        </v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveMovement">Salvar</v-btn>
      <v-btn color="light" class="mt-3" @click="returnScreen">Cancelar</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Salvo com sucesso!
        </v-card-title>

        <v-card-actions>
          <v-btn color="success" @click="returnScreen">Voltar</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import MovementService from "@/services/MovementService";
import ProductService from "@/services/ProductService";

export default {
  name: "EditMovement",
  data() {
    return {
      typeList: [
        {type: "Compra", val: 0},
        {type: "Venda", val: 1}
      ],
      productList: [],
      movement: {},
      submitted: false,
    };
  },
  methods: {
    saveMovement() {
      if (this.movement.id) {
        MovementService.updateMovement(this.movement.id, this.movement)
          .then(() => this.submitted = true)
          .catch((e) => console.error(e));
      } else {
        MovementService.addMovement(this.movement)
          .then(() => this.submitted = true)
          .catch((e) => console.error(e));
      }
    },

    retrieveProductList() {
      ProductService.getAllProducts()
          .then(response => this.productList = response.data)
          .catch(e => console.error(e));
    },

    returnScreen() {
      if (this.movement.id) {
        this.$router.push({ name: "movement", id: this.movement.id});
      } else {
        this.$router.push({ name: "movements" });
      }
    }
  },

  mounted() {
    this.movement.id = this.$route.params.id;
    this.retrieveProductList();
    if (this.movement.id) {
      MovementService.getMovement(this.movement.id)
        .then(response => this.movement = response.data)
        .catch(e => console.error(e));
    }
  }
};
</script>

<style>
  .submit-form {
    max-width: 300px;
  }

  div#form button.btn {
    margin-right: 20px;
  }
</style>
