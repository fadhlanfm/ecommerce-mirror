<template>
<div>
  <div class="carousel slide" data-ride="carousel" style="margin-top: 60px">
    <div class="carousel-inner">
      <div class="carousel-item active" id="banner"></div>
    </div>
  </div>
  <div style="margin-top: 40px" id="featuredProduct">
    <h1>Featured Product</h1>
  </div>
  <Loading v-if="loading" style="margin-top: 50px;" />
  <div id="card">
    <div class="card mx-3 mb-2 shadow p-3 mb-5 bg-white rounded" style="width: 18rem;" v-for="product in products" :key="product.id">
      <span class="sold-out-overlay" v-if="product.stock < 1">Sold Out</span>
      <img class="card-img-top img-fluid rounded" :src="product.image_url" :alt="product.name">
      <div class="card-body">
        <h4 class="card-title">{{ product.name }}</h4>
        <h5 class="card-text">Rp. {{ product.price.toLocaleString() }}</h5>
        <h5 class="card-text">Stock: {{ product.stock }}</h5>
        <a href="" @click.prevent="addToCartForm(product.id)" class="btn btn-primary mx-1">Add to Cart</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './Loading.vue';
export default {
  created() {
    this.getProducts();
  },
  computed: mapState(['products', 'loading']),
  components: {
    Loading,
  },
  methods: {
    getProducts() {
      this.$store.dispatch('getProducts');
    },
    addToCartForm(id) {
      if (!localStorage.getItem('token')) {
        this.$store.dispatch('showError', { message: 'You need to login first' });
      } else {
        this.$store.dispatch('addToCartForm', id);
      }
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
  margin-top: 40px;
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

#banner {
  background-image:url('../assets/banner.webp');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 450px;
  background-position: center center;
  width: 100%;
  height: 580px;
  background-position-y: 48%;
}
</style>