const rest = require('../rest/ProductRest');
const path = '/rest/products';

module.exports = app => {
    app.post(`${path}`, rest.addProduct);
    app.get(`${path}`, rest.getAllProducts);
    app.get(`${path}/:id`, rest.getProduct);
    app.put(`${path}/:id`, rest.updateProduct);
    app.delete(`${path}/:id`, rest.removeProduct);
}