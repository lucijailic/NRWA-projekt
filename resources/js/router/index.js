import { createRouter, createWebHistory } from 'vue-router';
import Customers from '../components/Customers.vue';
import Products from '../components/Products.vue';
import Categories from '../components/Categories.vue';

const routes = [
    { path: '/vue/customers', component: Customers },
    { path: '/vue/products', component: Products },
    { path: '/vue/categories', component: Categories },
    { path: '/', redirect: '/customers' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
