class Product {
    constructor(code, description, type) {
        let _self = this;

        _self.id = 0;
        _self.code = code;
        _self.description = description;
        _self.type = type;
        _self.quantity = 0.0;
    }
}

module.exports = Product;