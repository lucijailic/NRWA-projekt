<template>
    <form @submit.prevent="submitForm" class="mb-4 p-4 border border-gray-300 rounded">
        <h3 class="text-lg font-semibold mb-3">
            {{ isEditMode ? 'Uredi kupca' : 'Dodaj novog kupca' }}
        </h3>

        <div class="mb-2">
            <input v-model="form.customerNumber" :disabled="isEditMode" placeholder="Broj kupca" required class="input" />
        </div>
        <div class="mb-2">
            <input v-model="form.customerName" placeholder="Ime kupca" required class="input" />
        </div>
        <div class="mb-2">
            <input v-model="form.contactFirstName" placeholder="Ime kontakta" required class="input" />
        </div>
        <div class="mb-2">
            <input v-model="form.contactLastName" placeholder="Prezime kontakta" required class="input" />
        </div>
        <div class="mb-2">
            <input v-model="form.phone" placeholder="Telefon" class="input" />
        </div>
        <div class="mb-2">
            <input v-model="form.addressLine1" placeholder="Adresa" class="input" />
        </div>
        <div class="mb-2">
            <input v-model="form.city" placeholder="Grad" class="input" />
        </div>
        <div class="mb-2">
            <input v-model="form.country" placeholder="Država" class="input" />
        </div>

        <button type="submit" class="btn btn-success mr-2">
            {{ isEditMode ? 'Ažuriraj' : 'Spremi' }}
        </button>
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
                customerNumber: '',
                customerName: '',
                contactFirstName: '',
                contactLastName: '',
                phone: '',
                addressLine1: '',
                city: '',
                country: ''
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
                if (newVal) {
                    this.form = { ...newVal };
                } else {
                    this.resetForm();
                }
            }
        }
    },
    methods: {
        resetForm() {
            this.form = {
                id: null,
                customerNumber: '',
                customerName: '',
                contactFirstName: '',
                contactLastName: '',
                phone: '',
                addressLine1: '',
                city: '',
                country: ''
            };
        },
        submitForm() {
            const req = this.isEditMode
                ? axios.put(`/api/customers/${this.form.customerNumber}`, this.form)
                : axios.post('/api/customers', this.form);

            req.then(res => {
                this.$emit(this.isEditMode ? 'updated' : 'added', res.data);
                this.resetForm();
            }).catch(() => {
                alert('Greška pri spremanju kupca.');
            });
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
