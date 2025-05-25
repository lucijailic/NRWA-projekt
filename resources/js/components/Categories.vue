<template>
    <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Popis kategorija</h2>

        <button @click="openForm" class="btn btn-primary mb-3">Dodaj novu kategoriju</button>

        <!-- Forma za dodavanje/uređivanje -->
        <CategoriesForm
            v-if="showForm"
            :editData="editCategory"
            @added="handleAdded"
            @updated="handleUpdated"
            @cancel="cancelForm"
        />

        <!-- Detalji kategorije -->
        <div v-if="selectedCategory" class="mb-4 p-4 border border-gray-300 rounded">
            <h3 class="text-lg font-semibold mb-2">Detalji kategorije</h3>
            <p><strong>Naziv:</strong> {{ selectedCategory.name }}</p>
            <p><strong>Opis:</strong> {{ selectedCategory.description }}</p>
            <button @click="selectedCategory = null" class="btn btn-secondary mt-2">Sakrij detalje</button>
        </div>

        <!-- Tablica kategorija -->
        <table class="table-auto w-full border-collapse">
            <thead>
            <tr class="bg-gray-200">
                <th class="border px-2 py-1">Naziv</th>
                <th class="border px-2 py-1">Opis</th>
                <th class="border px-2 py-1">Akcije</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category in categories" :key="category.id">
                <td class="border px-2 py-1">{{ category.name }}</td>
                <td class="border px-2 py-1">{{ category.description }}</td>
                <td class="border px-2 py-1">
                    <button @click="viewCategory(category)" class="btn btn-sm btn-info mr-1">Prikaži</button>
                    <button @click="editCategoryData(category)" class="btn btn-sm btn-warning mr-1">Uredi</button>
                    <button @click="deleteCategory(category.id)" class="btn btn-sm btn-danger">Obriši</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import CategoriesForm from './CategoriesForm.vue';

export default {
    components: {
        CategoriesForm,
    },
    data() {
        return {
            categories: [],
            showForm: false,
            editCategory: null,
            selectedCategory: null,
        };
    },
    created() {
        this.fetchCategories();
    },
    methods: {
        fetchCategories() {
            axios.get('/api/categories')
                .then(res => {
                    this.categories = res.data;
                })
                .catch(() => alert('Greška pri dohvaćanju kategorija.'));
        },
        openForm() {
            this.editCategory = null;
            this.showForm = true;
        },
        handleAdded(category) {
            this.categories.push(category);
            this.showForm = false;
        },
        handleUpdated(category) {
            const index = this.categories.findIndex(c => c.id === category.id);
            if (index !== -1) this.categories.splice(index, 1, category);
            this.showForm = false;
        },
        cancelForm() {
            this.showForm = false;
            this.editCategory = null;
        },
        editCategoryData(category) {
            this.editCategory = { ...category };
            this.showForm = true;
        },
        deleteCategory(id) {
            if (confirm('Jeste li sigurni da želite obrisati kategoriju?')) {
                axios.delete(`/api/categories/${id}`)
                    .then(() => {
                        this.categories = this.categories.filter(c => c.id !== id);
                        if (this.selectedCategory?.id === id) {
                            this.selectedCategory = null;
                        }
                    })
                    .catch(() => alert('Greška pri brisanju kategorije.'));
            }
        },
        viewCategory(category) {
            this.selectedCategory = category;
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
</style>
