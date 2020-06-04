<template>
<div style="margin-top: 80px;" id="card">
  <div class="card mx-3 mb-2 shadow p-3 mb-5 bg-white rounded" style="width: 18rem;" v-for="product in products" :key="product.id">
    <span class="sold-out-overlay" v-if="product.stock < 1">Sold Out</span>
    <img class="card-img-top img-fluid rounded" :src="product.image_url" :alt="product.name">
    <div class="card-body">
      <h4 class="card-title">{{ product.name }}</h4>
      <h5 class="card-text">Rp. {{ product.price.toLocaleString() }}</h5>
      <h5 class="card-text">Stock: {{ product.stock }}</h5>
      <a href="" @click.prevent="editDataForm(product.id)" class="btn btn-primary mx-1">Edit</a>
      <a href="" @click.prevent="deleteData(product.id)" class="btn btn-danger mx-1">Delete</a>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  created() {
    this.getProducts();
  },
  computed: mapState(['products']),
  methods: {
    getProducts() {
      this.$store.dispatch('getProducts');
    },
    deleteData(id) {
      this.$store.dispatch('deleteDataConfirmation', id);
    },
    editDataForm(id) {
      this.$store.dispatch('editDataForm', id);
    }
  }
}
</script>

<style>
#card {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
}

.sold-out-overlay {
  background: #654ea3;
  color: #fff;
  font-size: 18px;
  font-weight: 1000;
  padding: 5px 10px;
  position: absolute;
  height: 40px;
  width: 100px;
  right: 20px;
  top: 20px;
}
</style>