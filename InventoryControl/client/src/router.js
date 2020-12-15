import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        // Product Routes
        {
            path: "/",
            alias: "/products",
            name: "products",
            component: () => import("./components/ProductList")
        },
        {
            path: "/products/add",
            name: "addProduct",
            component: () => import("./components/EditProduct")
        },
        {
            path: "/products/:id/edit",
            name: "editProduct",
            component: () => import("./components/EditProduct")
        },
        {
            path: "/products/:id",
            name: "product",
            component: () => import("./components/Product")
        },

        // Movement Routes
        {
            path: "/movements",
            name: "movements",
            component: () => import("./components/MovementList")
        },
        {
            path: "/movements/add",
            name: "addMovement",
            component: () => import("./components/EditMovement")
        },
        {
            path: "/movements/:id/edit",
            name: "editMovement",
            component: () => import("./components/EditMovement")
        },
    ]
});