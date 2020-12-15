import http from "../http-common";

class ProductService {
    constructor() {
        let self = this;
        self.productRestUrl = "/products";
    }

    addProduct(product) {
        return http.post(this.productRestUrl, product);
    }

    updateProduct(id, product) {
        return http.put(`${this.productRestUrl}/${id}`, product);
    }

    removeProduct(id) {
        return http.delete(`${this.productRestUrl}/${id}`);
    }

    getAllProducts() {
        return http.get(this.productRestUrl);
    }

    getProduct(id) {
        return http.get(`${this.productRestUrl}/${id}`);
    }
}

export default new ProductService();