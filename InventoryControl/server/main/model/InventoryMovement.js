class InventoryMovement {
    constructor(product, type, value, date, quantity) {
        let _self = this;

        _self.id = 0;
        _self.product = product ? product : {id: null};
        _self.type = type;
        _self.value = value;
        _self.date = date ? date : new Date();
        _self.quantity = quantity;
    }
}

module.exports = InventoryMovement;