<template>
    <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Popis kupaca</h2>

        <button @click="openForm" class="btn btn-primary mb-3">Dodaj novog kupca</button>

        <!-- Forma za dodavanje/uređivanje -->
        <CustomersForm
            v-if="showForm"
            :editData="editingCustomer"
            @added="handleAdded"
            @updated="handleUpdated"
            @cancel="cancelForm"
        />

        <!-- Detalji kupca -->
        <div v-if="selectedCustomer" class="mb-4 p-4 border border-gray-300 rounded">
            <h3 class="text-lg font-semibold mb-2">Detalji kupca</h3>
            <p><strong>Broj:</strong> {{ selectedCustomer.customerNumber }}</p>
            <p><strong>Ime:</strong> {{ selectedCustomer.customerName }}</p>
            <p><strong>Kontakt:</strong> {{ selectedCustomer.contactFirstName }} {{ selectedCustomer.contactLastName }}</p>
            <p><strong>Telefon:</strong> {{ selectedCustomer.phone }}</p>
            <p><strong>Adresa:</strong> {{ selectedCustomer.addressLine1 }}</p>
            <p><strong>Grad:</strong> {{ selectedCustomer.city }}</p>
            <p><strong>Država:</strong> {{ selectedCustomer.country }}</p>
            <button @click="selectedCustomer = null" class="btn btn-secondary mt-2">Sakrij detalje</button>
        </div>

        <!-- Tablica kupaca -->
        <table class="table-auto w-full border-collapse">
            <thead>
            <tr class="bg-gray-200">
                <th class="border px-2 py-1">Broj</th>
                <th class="border px-2 py-1">Ime</th>
                <th class="border px-2 py-1">Kontakt</th>
                <th class="border px-2 py-1">Grad</th>
                <th class="border px-2 py-1">Akcije</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="cust in customers" :key="cust.customerNumber">
                <td class="border px-2 py-1">{{ cust.customerNumber }}</td>
                <td class="border px-2 py-1">{{ cust.customerName }}</td>
                <td class="border px-2 py-1">{{ cust.contactFirstName }} {{ cust.contactLastName }}</td>
                <td class="border px-2 py-1">{{ cust.city }}</td>
                <td class="border px-2 py-1">
                    <button @click="viewCustomer(cust)" class="btn btn-sm btn-info mr-1">Prikaži</button>
                    <button @click="editCustomer(cust)" class="btn btn-sm btn-warning mr-1">Uredi</button>
                    <button @click="deleteCustomer(cust.customerNumber)" class="btn btn-sm btn-danger">Obriši</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import CustomersForm from './CustomersForm.vue';

export default {
    components: {
        CustomersForm,
    },
    data() {
        return {
            customers: [],
            showForm: false,
            editingCustomer: null,
            selectedCustomer: null,
        };
    },
    created() {
        this.fetchCustomers();
    },
    methods: {
        fetchCustomers() {
            axios.get('/api/customers')
                .then(res => {
                    this.customers = res.data;
                })
                .catch(() => alert('Greška pri dohvaćanju kupaca.'));
        },
        openForm() {
            this.editingCustomer = null;
            this.showForm = true;
        },
        handleAdded(customer) {
            this.customers.push(customer);
            this.showForm = false;
        },
        handleUpdated(customer) {
            const index = this.customers.findIndex(c => c.customerNumber === customer.customerNumber);
            if (index !== -1) this.customers.splice(index, 1, customer);
            this.showForm = false;
        },
        cancelForm() {
            this.showForm = false;
            this.editingCustomer = null;
        },
        editCustomer(customer) {
            this.editingCustomer = { ...customer };
            this.showForm = true;
        },
        deleteCustomer(customerNumber) {
            if (confirm('Jeste li sigurni da želite obrisati ovog kupca?')) {
                axios.delete(`/api/customers/${customerNumber}`)
                    .then(() => {
                        this.customers = this.customers.filter(c => c.customerNumber !== customerNumber);
                        if (this.selectedCustomer?.customerNumber === customerNumber) {
                            this.selectedCustomer = null;
                        }
                    })
                    .catch(() => alert('Greška pri brisanju kupca.'));
            }
        },
        viewCustomer(customer) {
            this.selectedCustomer = customer;
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
