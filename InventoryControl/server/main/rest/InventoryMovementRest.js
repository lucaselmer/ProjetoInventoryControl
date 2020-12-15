const service = require('../service/InventoryMovementService');
const InventoryMovement = require('../model/InventoryMovement');

const InventoryMovementRest = {
    addMovement(req, res) {
        if (!req.body.product) {
            res.status(400).send({
                message: "Movement hasn't a product selected."
            });
        } else if (!req.body.type && !req.body.value 
            && !req.body.date && !req.body.quantity) {
            res.status(400).send({
                message: "Empty message body."
            });
        } else {
            service.insertMovement(new InventoryMovement(req.body.product, 
                req.body.type, req.body.value, req.body.date, req.body.quantity), 
                (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Error!"
                        });
                    } else {
                        res.send(data);
                    }
                });
        }
    },

    getMovement(req, res) {
        service.getMovement(req.params.id, (err, data) => {
            if (err) {
                if (err.type == 'not_found') {
                    res.status(404).send({
                        message: err.message || "Not found!"
                    });
                } else {
                    res.status(500).send({
                        message: err.message || "Error!"
                    });
                }
            } else {
                res.send(data);
            }
        });
    },

    getAllMovements(req, res) {
        service.getAllMovements((err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Error!"
                });
            } else {
                res.send(data);
            }
        });
    },

    updateMovement(req, res) {
        if (!req.body.product) {
            res.status(400).send({
                message: "Movement hasn't a product selected."
            });
        } else if (!req.body.type && !req.body.value 
            && !req.body.date && !req.body.quantity) {
            res.status(400).send({
                message: "Empty message body."
            });
        } else {
            service.updateMovement(req.params.id, new InventoryMovement(req.body.product, 
                    req.body.type, req.body.value, req.body.date, req.body.quantity),
                (err, data) => {
                    if (err) {
                        if (err.type == 'not_found') {
                            res.status(404).send({
                                message: err.message || "Not found!"
                            });
                        } else {
                            res.status(500).send({
                                message: err.message || "Error!"
                            });
                        }
                    } else {
                        res.send(data);
                    }
                });
        }
    },

    removeMovement(req, res) {
        service.removeMovement(req.params.id, (err, data) => {
            if (err) {
                if (err.type == 'not_found') {
                    res.status(404).send({
                        message: err.message || "Not found!"
                    });
                } else {
                    res.status(500).send({
                        message: err.message || "Error!"
                    });
                }
            } else {
                res.send(data);
            }
        });
    }
}

module.exports = InventoryMovementRest;