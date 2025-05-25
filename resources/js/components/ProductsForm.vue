<template>
    <form @submit.prevent="submitForm" class="mb-4 p-4 border border-gray-300 rounded">
        <h3 class="text-lg font-semibold mb-3">
            {{ isEditMode ? 'Uredi proizvod' : 'Dodaj novi proizvod' }}
        </h3>

        <div class="mb-2">
            <input
                v-model="form.name"
                placeholder="Naziv"
                required
                class="input"
            />
        </div>
        <div class="mb-2">
            <textarea
                v-model="form.description"
                placeholder="Opis"
                class="input"
                rows="3"
            ></textarea>
        </div>
        <div class="mb-2">
            <input
                v-model.number="form.price"
                type="number"
                placeholder="Cijena"
                required
                class="input"
            />
        </div>
        <div class="mb-2">
            <select
                v-model.number="form.category_id"
                required
                class="input"
            >
                <option disabled value="">Odaberite kategoriju</option>
                <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                >
                    {{ category.name }}
                </option>
            </select>
        </div>

        <button
            type="submit"
            class="btn btn-success mr-2"
        >
            {{ isEditMode ? 'Ažuriraj' : 'Spremi' }}
        </button>
        <button
            type="button"
            @click="$emit('cancel')"
            class="btn btn-secondary"
        >
            Otkaži
        </button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        editData: Object,
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            form: {
                id: null,
                name: '',
                description: '',
                price: 0,
                category_id: null
            }
        };
    },
    computed: {
        isEditMode() {
            return !!this.form.id;
        }
    },
    watch: {
        editData: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.form = {
                        id: newVal.id,
                        name: newVal.name || '',
                        description: newVal.description || '',
                        price: newVal.price || 0,
                        category_id: Number(newVal.category_id) || null
                    };
                } else {
                    this.form = {
                        id: null,
                        name: '',
                        description: '',
                        price: 0,
                        category_id: null
                    };
                }
            }
        }
    },
    methods: {
        submitForm() {
            const payload = { ...this.form };
            payload.category_id = Number(payload.category_id);

            const request = this.isEditMode
                ? axios.put(`/api/products/${payload.id}`, payload)
                : axios.post('/api/products', payload);

            request
                .then(res => {
                    this.$emit(this.isEditMode ? 'updated' : 'added', res.data);
                })
                .catch(() => alert('Greška prilikom spremanja.'));
        }
    }
};
</script>

<style scoped>
.input {
    width: 100%;
    padding: 0.4rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
    resize: vertical;
}
.btn {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    border: none;
}
.btn-success {
    background-color: #28a745;
}
.btn-secondary {
    background-color: #6c757d;
}
</style>
