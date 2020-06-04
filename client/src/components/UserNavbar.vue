<template>
  <div style="height: 60px; position: fixed; width: 100%; top: 0; z-index: 1000;" class="bg-dark">
    <a href="">
      <img src="https://i.imgur.com/KgtHZon.png?1"
      alt="Shopping Cart"
      style="position: fixed; z-index:2000;left: 20px; top: 10px; position: fixed"
      @click.prevent="showCart">
    </a>
    <div class="mt-2" v-if="this.$route.path !== '/'">
      <a href="" @click.prevent="home" style="text-decoration: none;">
        <span class="Heading"></span>
      </a>
    </div>
    <div v-if="this.$route.path === '/'" class="mt-2"></div>
    <button class="btn btn-danger"
    style="right: 20px; top: 10px; position: fixed;"
    v-if="storage"
    @click.prevent="logoutUser">
      <i class="fas fa-sign-out-alt"></i> Logout
    </button>
    <button class="btn btn-primary"
    style="right: 20px; top: 10px; position: fixed;"
    v-if="!storage"
    @click.prevent="loginUser">
      <i class="fas fa-sign-in-alt"></i> Login
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser');
    },
    loginUser() {
      this.$router.push('/login');
    },
    showCart() {
      this.$router.push('/cart');
    },
    home() {
      this.$router.push('/');
    }
  },
  computed: {
    storage() {
      return localStorage.getItem('token');
    }
  }
}
</script>

<style>

.Heading {
    font-family: Montserrat,sans-serif;
    vertical-align: middle;
    font-weight: 500;
    font-style: normal;
    color: #1c1b1b;
    transition: color 0.2s ease-in-out;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
    font-size: 19px;  
}
</style>