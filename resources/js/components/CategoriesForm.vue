<template>
    <form @submit.prevent="submitForm" class="mb-4 p-4 border border-gray-300 rounded">
        <h3 class="text-lg font-semibold mb-3">
            {{ isEditMode ? 'Uredi kategoriju' : 'Dodaj novu kategoriju' }}
        </h3>

        <div class="mb-2">
            <input v-model="form.name" placeholder="Naziv" required class="input" />
        </div>
        <div class="mb-2">
            <textarea v-model="form.description" placeholder="Opis" class="input"></textarea>
        </div>

        <button type="submit" class="btn btn-success mr-2">{{ isEditMode ? 'Ažuriraj' : 'Spremi' }}</button>
        <button type="button" @click="$emit('cancel')" class="btn btn-secondary">Otkaži</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        editData: Object
    },
    data() {
        return {
            form: {
                id: null,
                name: '',
                description: ''
            }
        };
    },
    computed: {
        isEditMode() {
            return !!this.editData;
        }
    },
    watch: {
        editData: {
            immediate: true,
            handler(newVal) {
                this.form = newVal ? { ...newVal } : { id: null, name: '', description: '' };
            }
        }
    },
    methods: {
        submitForm() {
            const request = this.isEditMode
                ? axios.put(`/api/categories/${this.form.id}`, this.form)
                : axios.post('/api/categories', this.form);

            request
                .then(res => {
                    this.$emit(this.isEditMode ? 'updated' : 'added', res.data);
                    this.form = { id: null, name: '', description: '' }; // reset after submit
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
}
.btn {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    color: white;
    font-size: 0.9rem;
}
.btn-success {
    background-color: #28a745;
}
.btn-secondary {
    background-color: #6c757d;
}
</style>
