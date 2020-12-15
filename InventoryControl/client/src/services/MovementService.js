import http from "../http-common";

class InventoryMovementService {
    constructor() {
        let self = this;
        self.movementRestUrl = "/movements";
    }

    addMovement(movement) {
        return http.post(this.movementRestUrl, movement);
    }

    updateMovement(id, movement) {
        return http.put(`${this.movementRestUrl}/${id}`, movement);
    }

    removeMovement(id) {
        return http.delete(`${this.movementRestUrl}/${id}`);
    }

    getAllMovements() {
        return http.get(this.movementRestUrl);
    }

    getMovement(id) {
        return http.get(`${this.movementRestUrl}/${id}`);
    }

    getMovementsFromProduct(productId) {
        return http.get(`${this.movementRestUrl}?productId=${productId}`);
    }
}

export default new InventoryMovementService();