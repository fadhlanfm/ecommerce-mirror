<template>
<div>
  <Loading v-if="loading" />
  <form class="mx-auto mt-3" style="width: 400px;" @submit.prevent="addProduct" v-if="!loading">
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" v-model="name">
    </div>
    <div class="form-group">
      <label>Image Url</label>
      <input type="text" class="form-control" v-model="image_url">
    </div>
    <div class="form-group">
      <label>Price</label>
      <input type="number" class="form-control" v-model="price" min="0">
    </div>
    <div class="form-group">
      <label>Stock</label>
      <input type="number" class="form-control" v-model="stock" min="0">
    </div>
    <div>
      <button type="submit" class="btn btn-primary mx-1">Submit</button>
      <button type="button" class="btn btn-danger mx-1" @click.prevent="cancel">Cancel</button>
    </div>
  </form>
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
      name: '',
      image_url: '',
      price: '',
      stock: '',
    }
  },
  computed: mapState(['loading']),
  methods: {
    cancel() {
      this.$router.push('/admin');
    },
    addProduct() {
      const obj = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      };
      this.$store.dispatch('addProduct', obj);
    }
  }
}
</script>