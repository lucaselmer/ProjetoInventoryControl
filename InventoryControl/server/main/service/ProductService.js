const dao = require('../dao/ProductDAO');
const movementService = require('./InventoryMovementService');
const Product = require('../model/Product');

const ProductService = {
    insertProduct(product, callback) {
        dao.insert(product, (err, res) => {
            if (err) {
                callback({ message: `Error persisting product ${product.code}: ${err}` }, null);
            } else {
                console.log(`Product ${product.code} persisted with id ${res.insertId}!`);
                callback(null, { id: res.insertId, ...product });   
            }
        });
    },

    getProduct(id, callback) {
        dao.find(id, (err, res) => {
            if (err) {
                callback({ message: `Error getting product with id ${id}: ${err}` }, null);
            } else if (res.length) {
                console.log(`Product(${id}) found: `, res[0]);
                callback(null, res[0]);
            } else {
                callback({ type: "not_found", message: `Product(${id}) not found!` }, null);
            }
        });
    },

    getAllProducts(callback) {
        dao.findAll((err, res) => {
            if (err) {
                callback({ message: `Error getting products: ${err}` }, null);
            } else {
                console.log(`Products found: `, res);
                callback(null, res);
            }
        });
    },

    updateProduct(id, product, callback) {
        dao.update(id, product, (err, res) => {
            if (err) {
                callback({ message: `Error updating product with id ${id}: ${err}` }, null);
            } else if (res.affectedRows == 0) {
                callback({ type: "not_found", message: `Product(${id}) not found!` }, null);
            } else {
                console.log(`Product(${id}) updated!`, { id: id, ...product });
                callback(null, { id: res.insertId, ...product });
            }
        });
    },

    removeProduct(id, callback) {
        movementService.removeMovementsFromProduct(id, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                dao.delete(id, (err, res) => {
                    if (err) {
                        callback({ message: `Error deleting product with id ${id}: ${err}` }, null);
                    } else if (res.affectedRows == 0) {
                        callback({ type: "not_found", message: `Product(${id}) not found!` }, null);
                    } else {
                        console.log(`Product(${id}) deleted!`);
                        callback(null, res);
                    }
                });
            }
        });
    },

    updateProductQuantity(movement, callback) {
        // Compra
        if (movement.type == 0) {
            movement.product.quantity = movement.product.quantity + movement.quantity;
        }
        // Venda
        else {
            movement.product.quantity = movement.product.quantity - movement.quantity;
        }

        this.updateProduct(movement.product.id, movement.product, callback);
    },
}

module.exports = ProductService;