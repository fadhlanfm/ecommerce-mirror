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
    <form style="width: 300px; margin: auto" @submit.prevent="addToCart">
      <input type="number" :max="stock" min="0" v-model="newStock">
      <div class="mt-2 mb-4" style="width: 400px;">
        <button class="btn btn-primary mx-1" type="submit">Submit</button>
        <button class="btn btn-danger mx-1" @click.prevent="cancel">Cancel</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './Loading.vue';
export default {
  components: {
    Loading
  },
  data() {
    return {
      id: null,
      name: '',
      image_url: '',
      price: '',
      stock: '',
      newStock: 0
    }
  },
  computed: mapState(['loading', 'cart']),
  created() {
    if (!this.$store.state.cart) {
      this.$router.push('/');
    } else {
      this.id = this.$store.state.cart.id;
      this.name = this.$store.state.cart.name;
      this.image_url = this.$store.state.cart.image_url;
      this.price = this.$store.state.cart.price;
      this.stock = this.$store.state.cart.stock;
    }
  },
  methods: {
    cancel() {
      this.$router.push('/');
    },
    addToCart() {
      if (this.newStock > 0) {
        const obj = { stock: this.newStock, ProductId: this.cart.id };
        this.$store.dispatch('addToCart', obj);
      } else {
        this.$store.dispatch('showError', { message: 'Enter the amount of stock you want to buy!' });
      }
    }
  }
}
</script>