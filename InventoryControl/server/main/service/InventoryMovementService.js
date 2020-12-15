const dao = require('../dao/InventoryMovementDAO');
const InventoryMovement = require('../model/InventoryMovement');
const Product = require('../model/Product');

const parseMovement = (movementFromDb) => {
    let product = new Product(movementFromDb.productCode, 
        movementFromDb.productDescription, movementFromDb.productType);

    product.id = movementFromDb.productId;
    product.quantity = movementFromDb.productQuantity;

    let movement = new InventoryMovement(product, movementFromDb.type, 
        movementFromDb.value, movementFromDb.date, movementFromDb.quantity);

    movement.id = movementFromDb.id;
    return movement;
}

const InventoryMovementService = {
    insertMovement(movement, callback) {
        dao.insert(movement, (err, res) => {
            if (err) {
                callback({ message: `Error persisting movement: ${err}` }, null);
            } else {
                console.log(`Movement persisted with id ${res.insertId}!`);
                callback(null, { id: res.insertId, ...movement });
            }
        });
    },

    getMovement(id, callback) {
        dao.find(id, (err, res) => {
            if (err) {
                callback({ message: `Error getting movement with id ${id}: ${err}` }, null);
            } else if (res.length) {
                console.log(`Movement(${id}) found: `, res[0]);
                callback(null, parseMovement(res[0]));
            } else {
                callback({ type: "not_found", message: `Movement(${id}) not found!` }, null);
            }
        });
    },

    getAllMovements(callback) {
        dao.findAll((err, res) => {
            if (err) {
                callback({ message: `Error getting products: ${err}` }, null);
            } else {
                console.log(`Movements found: `, res);
                callback(null, res.map(parseMovement));
            }
        });
    },

    updateMovement(id, movement, callback) {
        dao.update(id, movement, (err, res) => {
            if (err) {
                callback({ message: `Error updating movement with id ${id}: ${err}` }, null);
            } else if (res.affectedRows == 0) {
                callback({ type: "not_found", message: `Movement(${id}) not found!` }, null);
            } else {
                console.log(`Movement(${id}) updated!`, { id: id, ...movement });
                callback(null, { id: res.insertId, ...movement });
            }
        });
    },

    removeMovement(id, callback) {
        dao.delete(id, (err, res) => {
            if (err) {
                callback({ message: `Error deleting movement with id ${id}: ${err}` }, null);
            } else if (res.affectedRows == 0) {
                callback({ type: "not_found", message: `Movement(${id}) not found!` }, null);
            } else {
                console.log(`Movement(${id}) deleted!`);
                callback(null, res);
            }
        });
    },

    removeMovementsFromProduct(productId, callback) {
        dao.deleteFromProduct(productId, (err, res) => {
            if (err) {
                callback({ message: `Error deleting movements from product with id ${productId}: ${err}` }, null);
            } else {
                console.log(`Movements from product(${productId}) deleted!`);
                callback(null, res);
            }
        });
    }
}

module.exports = InventoryMovementService;