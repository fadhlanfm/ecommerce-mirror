<template>
<div>
  <Loading v-if="loading" />
  <form class="mx-auto mt-3" style="width: 400px;" @submit.prevent="editProduct" v-if="!loading">
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
import Loading from './Loading.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Loading
  },
  computed: mapState(['loading', 'editData']),
  data() {
    return {
      id: null,
      name: '',
      image_url: '',
      price: '',
      stock: '',
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.editData === null) {
        this.$router.push('/admin');
      } else {
        this.id = this.editData.id;
        this.name = this.editData.name;
        this.image_url = this.editData.image_url;
        this.price = this.editData.price;
        this.stock = this.editData.stock;
      }
    },
    editProduct() {
      const data = {
        obj: {
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock,
        },
        id: this.id
      }
      this.$store.dispatch('editProduct', data);
    },
    cancel() {
      this.$router.push('/admin');
    }
  }
}
</script>