<template>
<div style="margin-top: 100px">
  <Loading v-if="loading" />
  <div v-if="!loading">
    <div class="mx-auto mt-3 container" style="width: 700px;" @submit.prevent="addProduct">
      <h1>Name:</h1>
      <h3>{{ name }}</h3>
      <img :src="image_url" :alt="name" class="img-fluid" style="height: 300px">
      <h1>Price:</h1>
      <h3>Rp. {{ price.toLocaleString() }}</h3>
      <h1>Stock Available:</h1>
      <h3>{{ stock }}</h3>
    </div>
    <h1>Enter how many do you want to buy</h1>
    <form style="width: 300px; margin: auto" @submit.prevent="editCartUser">
      <input type="number" :max="stock" min="0" v-model="newEditStock">
      <div class="mt-2 mb-4" style="width: 400px;">
        <button class="btn btn-primary mx-1" type="submit">Submit</button>
        <button class="btn btn-danger mx-1" @click.prevent="cancel">Cancel</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import Loading from './Loading.vue';
import { mapState } from 'vuex';
export default {
  components: {
    Loading
  },
  computed: mapState(['loading', 'editCart', 'editStock', 'editCartId']),
  data() {
    return {
      newEditStock: null,
      name: '',
      image_url: '',
      price: '',
      stock: '',
    }
  },
  created() {
    if (!this.editCart || !this.editStock) {
      this.$router.push('/cart');
    } else {
      this.name = this.editCart.name;
      this.image_url = this.editCart.image_url;
      this.price = this.editCart.price;
      this.stock = this.editCart.stock;
      this.newEditStock = this.editStock;
    }
  },
  methods: {
    cancel() {
      this.$router.push('/cart');
    },
    editCartUser() {
      const obj = {
        cartId: this.editCartId,
        newStock: this.newEditStock
      }
      this.$store.dispatch('editCart', obj);
    }
  }
}
</script>