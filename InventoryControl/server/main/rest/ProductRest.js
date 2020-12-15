const service = require('../service/ProductService');
const Product = require('../model/Product');

const ProductRest = {
    addProduct(req, res) {
        if (!req.body.code && !req.body.description && !req.body.type) {
            res.status(400).send({
                message: "Empty message body."
            });
        } else {
            service.insertProduct(new Product(req.body.code, req.body.description, req.body.type), 
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

    getProduct(req, res) {
        service.getProduct(req.params.id, (err, data) => {
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
                console.log(data);
                res.send(data);
            }
        });
    },

    getAllProducts(req, res) {
        service.getAllProducts((err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Error!"
                });
            } else {
                res.send(data);
            }
        });
    },

    updateProduct(req, res) {
        if (!req.body.code && !req.body.description && !req.body.type) {
            res.status(400).send({
                message: "Empty message body."
            });
        } else {
            service.updateProduct(req.params.id, 
                new Product(req.body.code, req.body.description, req.body.type), 
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
                        console.log(data);
                        res.send(data);
                    }
                });
        }
    },

    removeProduct(req, res) {
        service.removeProduct(req.params.id, (err, data) => {
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
                console.log(data);
                res.send(data);
            }
        });
    }
}

module.exports = ProductRest;