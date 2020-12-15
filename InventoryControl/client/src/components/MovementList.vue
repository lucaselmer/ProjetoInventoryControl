<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>
          Movimentações
          <v-btn small id="btn-add-movement" @click="addMovement">+NOVO</v-btn>
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="movements"
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
export default {
  name: "MovementList",
  data() {
    return {
      movements: [],
      headers: [
        { text: "Data", value: "date", align: "start", sortable: false },
        { text: "Tipo", value: "type", align: "start", sortable: false },
        { text: "Produto", value: "product", align: "start", sortable: false },
        { text: "Quantidade", value: "quantity", align: "start", sortable: false },
        { text: "Valor", value: "value", align: "start", sortable: false },
        { text: "",value: "actions", align: "end", sortable: false }
      ],
    };
  },
  methods: {
    retrieveMovements() {
      MovementService.getAllMovements()
          .then((response) => {
            this.movements = response.data.map(this.getDisplayMovement);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveMovements();
    },

    editMovement(id) {
      this.$router.push({ name: "editMovement", params: { id: id } });
    },

    addMovement() {
      this.$router.push({ name: "addMovement" });
    },

    removeMovement(id) {
      MovementService.removeMovement(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayMovement(movement) {
      return {
        id: movement.id,
        date: movement.date,
        type: movement.type,
        product: this.parseStringValue(`${movement.product.code} - ${movement.product.description}`),
        quantity: movement.quantity,
        value: `R$ ${movement.value}`
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
    this.retrieveMovements();
  },
};
</script>

<style >
.list {
  max-width: 750px;
}

#btn-add-movement {
  margin-left: 20px;
}
</style>