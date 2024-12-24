<template>
    <div class="container">
        <h1 class="my-4">Product CRUD</h1>
        <button class="btn btn-primary mb-3" @click="showForm = true">Add Product</button>

        <!-- Form for Adding/Editing Products -->
        <form v-if="showForm" @submit.prevent="saveProduct">
            <div class="mb-3">
                <input v-model="product.name" type="text" class="form-control" placeholder="Name" required />
            </div>
            <div class="mb-3">
                <textarea v-model="product.description" class="form-control" placeholder="Description"></textarea>
            </div>
            <div class="mb-3">
                <input v-model="product.price" type="number" step="0.01" class="form-control" placeholder="Price"
                    required />
            </div>
            <div class="mb-3">
                <input v-model="product.quantity" type="number" class="form-control" placeholder="Quantity" required />
            </div>
            <button type="submit" class="btn btn-success">Save</button>
            <button type="button" class="btn btn-secondary" @click="resetForm">Cancel</button>
        </form>

        <!-- Product Table -->
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="prod in products" :key="prod.id">
                    <td>{{ prod.name }}</td>
                    <td>{{ prod.description }}</td>
                    <td>{{ prod.price }}</td>
                    <td>{{ prod.quantity }}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" @click="editProduct(prod)">Edit</button>
                        <button class="btn btn-danger btn-sm" @click="deleteProduct(prod.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

// Reactive state

const products = ref([]);
const product = ref({ name: '', description: '', price: '', quantity: '' });
const showForm = ref(false);

// Methods
const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/products');  // Full URL for fetching products
        products.value = response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
};

const saveProduct = async () => {
    try {
        if (product.value.id) {
            // Update existing product
            await axios.put(`/api/products/${product.value.id}`, product.value);
        } else {
            // Create new product
            await axios.post('/api/products', product.value);
        }
        fetchProducts();
        resetForm();
    } catch (error) {
        console.error('Failed to save product:', error);
    }
};

const editProduct = (prod) => {
    product.value = { ...prod };
    showForm.value = true;
};

const deleteProduct = async (id) => {
    try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts();
    } catch (error) {
        console.error('Failed to delete product:', error);
    }
};

const resetForm = () => {
    product.value = { name: '', description: '', price: '', quantity: '' };
    showForm.value = false;
};

// Lifecycle hook
onMounted(() => {
    fetchProducts();
});
</script>

<style scoped>
.container {
    margin-top: 20px;
}
</style>
