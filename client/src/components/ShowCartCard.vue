<template>
<div class="container mt-4">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="text-muted">Your cart</h2>
        <span class="badge badge-secondary badge-pill">{{ userCart.length }}</span>
      </h4>
      <Loading v-if="loading" />
      <ul class="list-group mb-3" v-if="!loading" >
        <li class="list-group-item d-flex justify-content-between lh-condensed" v-for="userCart in userCart" :key="userCart.id">
          <div>
            <h4 class="my-0">{{ userCart.name }}</h4>
            <h6 class="text-muted">Stock you want to buy: {{ userCart.Cart.stock }}</h6>
          </div>
          <h3 class="text-muted">Rp. {{ (userCart.price * userCart.Cart.stock).toLocaleString() }}</h3>
          <div>
            <a href="" @click.prevent="deleteCart(userCart.Cart.id)" style="font-size: 30px; text-decoration: none;">
              &#10008;
            </a>
            <a href="" @click.prevent="editCartForm(userCart.Cart.id, userCart.id)" style="font-size: 30px; text-decoration: none;">
              &#9998;
            </a>
          </div>
        </li>
        
        <li class="list-group-item d-flex justify-content-between">
          <h5>Total (IDR)</h5>
          <h4>Rp. {{ total.toLocaleString() }}</h4>
        </li>
      </ul>
      <button type="button" class="mx-2" @click.prevent="cancel">
        Continue Shopping
      </button>
      <button type="button" class="mx-2" @click="checkout" v-if="!loading && userCart.length !== 0">
        Checkout
      </button>
</div>

</template>

<script>
import { mapState } from 'vuex';
import Loading from './Loading.vue';
export default {
  components: {
    Loading
  },
  created() {
    this.getCart();
    this.$store.dispatch('getProducts');
  },
  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
    cancel() {
      this.$router.push('/');
    },
    deleteCart(id) {
      this.$store.dispatch('deleteCartConfirmation', id);
    },
    editCartForm(cartId, productId) {
      const obj = { cartId, productId };
      this.$store.dispatch('editCartForm', obj)
    },
    checkout() {
      this.$store.dispatch('checkoutConfirmation');
    }
  },
  computed: mapState(['userCart', 'loading', 'total']),
}
</script>