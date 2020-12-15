const db = require('../../database/dbConnection');

const InventoryMovementDAO = {
    insert(movement, callback) {
        db.query(`INSERT INTO InventoryMovement SET 
            productId = ${movement.product.id}, 
            type = ${movement.type}, 
            value = ${movement.value}, 
            quantity = ${movement.quantity}`, callback);
    },

    find(id, callback) {
        db.query(`SELECT mov.*, 
            prod.code as productCode, 
            prod.description as productDescription, 
            prod.type as productType, 
            prod.quantity as productQuantity 
            FROM InventoryMovement mov JOIN Product prod 
            ON mov.productId = prod.id
            WHERE mov.id = ${id}`, callback);
    },

    findAll(callback) {
        db.query(`SELECT mov.*, 
            prod.code as productCode, 
            prod.description as productDescription, 
            prod.type as productType, 
            prod.quantity as productQuantity 
            FROM InventoryMovement mov JOIN Product prod 
            ON mov.productId = prod.id`, callback);
    },

    update(id, movement, callback) {
        db.query(`UPDATE InventoryMovement SET 
            productId = ${movement.product.id}, 
            type = ${movement.type}, 
            value = ${movement.value}, 
            quantity = ${movement.quantity}  
            WHERE id = ${id}`, callback);
    },

    delete(id, callback) {
        db.query(`DELETE FROM InventoryMovement WHERE id = ${id}`, callback);
    },

    deleteFromProduct(productId, callback) {
        db.query(`DELETE FROM InventoryMovement WHERE productId = ${productId}`, callback);
    }
}

module.exports = InventoryMovementDAO;