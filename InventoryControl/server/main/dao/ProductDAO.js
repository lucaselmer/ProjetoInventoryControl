const db = require('../../database/dbConnection');

const ProductDAO = {
    insert(product, callback) {
        db.query(`INSERT INTO Product SET 
            code = '${product.code}', 
            description = '${product.description}', 
            type = '${product.type}', 
            quantity = ${product.quantity}`, callback);
    },

    find(id, callback) {
        db.query(`SELECT * FROM Product WHERE id = ${id}`, callback);
    },

    findAll(callback) {
        db.query('SELECT * FROM Product', callback);
    },

    update(id, product, callback) {
        db.query(`UPDATE Product SET 
            code = '${product.code}', 
            description = '${product.description}', 
            type = '${product.type}', 
            quantity = ${product.quantity} 
            WHERE id = ${id}`, callback);
    },

    delete(id, callback) {
        db.query(`DELETE FROM Product WHERE id = ${id}`, callback);
    },
}

module.exports = ProductDAO;