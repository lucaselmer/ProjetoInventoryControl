const rest = require('../rest/InventoryMovementRest');
const path = '/rest/movements';

module.exports = app => {
    app.post(`${path}`, rest.addMovement);
    app.get(`${path}`, rest.getAllMovements);
    app.get(`${path}/:id`, rest.getMovement);
    app.put(`${path}/:id`, rest.updateMovement);
    app.delete(`${path}/:id`, rest.removeMovement);
}