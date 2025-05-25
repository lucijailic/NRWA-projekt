<template>
    <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Popis proizvoda</h2>

        <button @click="showCreateForm" class="btn btn-primary mb-3">Dodaj novi proizvod</button>

        <!-- Forma za dodavanje/uređivanje -->
        <ProductsForm
            v-if="showForm"
            :editData="editProduct"
            :categories="categories"
            @added="fetchProducts"
            @updated="fetchProducts"
            @cancel="cancelForm"
        />

        <!-- Tablica proizvoda -->
        <table class="table-auto w-full border-collapse">
            <thead>
            <tr class="bg-gray-200">
                <th class="border px-2 py-1">Naziv</th>
                <th class="border px-2 py-1">Opis</th>
                <th class="border px-2 py-1">Cijena</th>
                <th class="border px-2 py-1">Kategorija</th>
                <th class="border px-2 py-1">Akcije</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in products" :key="product.id">
                <td class="border px-2 py-1">{{ product.name }}</td>
                <td class="border px-2 py-1">{{ product.description }}</td>
                <td class="border px-2 py-1">{{ product.price }}</td>
                <td class="border px-2 py-1">{{ getCategoryName(product.category_id) }}</td>
                <td class="border px-2 py-1">
                    <button @click="show(product)" class="btn btn-sm btn-info mr-1">Prikaži</button>
                    <button @click="edit(product)" class="btn btn-sm btn-warning mr-1">Uredi</button>
                    <button @click="remove(product.id)" class="btn btn-sm btn-danger">Obriši</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import ProductsForm from './ProductsForm.vue';

export default {
    components: { ProductsForm },
    data() {
        return {
            products: [],
            categories: [],
            showForm: false,
            editProduct: null,
        };
    },
    created() {
        this.fetchProducts();
        this.fetchCategories();
    },
    methods: {
        fetchProducts() {
            axios.get('/api/products').then(res => {
                this.products = res.data.map(p => ({
                    ...p,
                    category_id: Number(p.category_id),
                }));
                this.showForm = false;
                this.editProduct = null;
            });
        },
        fetchCategories() {
            axios.get('/api/categories').then(res => {
                this.categories = res.data.map(c => ({
                    ...c,
                    id: Number(c.id),
                }));
            });
        },
        showCreateForm() {
            this.showForm = true;
            this.editProduct = null;
        },
        edit(product) {
            this.editProduct = { ...product, category_id: Number(product.category_id) };
            this.showForm = true;
        },
        cancelForm() {
            this.showForm = false;
            this.editProduct = null;
        },
        remove(id) {
            if (confirm('Jeste li sigurni da želite obrisati proizvod?')) {
                axios.delete(`/api/products/${id}`).then(() => this.fetchProducts());
            }
        },
        show(product) {
            alert(
                `Naziv: ${product.name}\nOpis: ${product.description}\nCijena: ${product.price} €\nKategorija: ${this.getCategoryName(product.category_id)}`
            );
        },
        getCategoryName(categoryId) {
            const category = this.categories.find(c => c.id === categoryId);
            return category ? category.name : 'Nema kategorije';
        },
    },
};
</script>

<style scoped>
.btn {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
}
.btn-primary {
    background-color: #007bff;
}
.btn-warning {
    background-color: #f0ad4e;
}
.btn-danger {
    background-color: #dc3545;
}
.btn-info {
    background-color: #17a2b8;
}
.btn-secondary {
    background-color: #6c757d;
}
.btn-sm {
    padding: 0.2rem 0.4rem;
    font-size: 0.85rem;
}
.mr-1 {
    margin-right: 0.25rem;
}

.table-auto {
    border-collapse: collapse;
    width: 100%;
}

table th,
table td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
}

.bg-gray-200 {
    background-color: #e5e7eb;
}

.text-xl {
    font-size: 1.25rem;
    font-weight: 700;
}

.mb-3 {
    margin-bottom: 0.75rem;
}

.mb-4 {
    margin-bottom: 1rem;
}

.p-4 {
    padding: 1rem;
}
</style>
