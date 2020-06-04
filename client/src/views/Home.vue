<template>
  <div>
    <UserNavbar />
    <UserShowProduct />
    <Footer />
  </div>
</template>

<script>

import UserNavbar from '../components/UserNavbar.vue';
import UserShowProduct from '../components/UserShowProduct.vue';
import Footer from '../components/Footer.vue';
export default {
  name: 'Home',
  components: {
    UserNavbar,
    UserShowProduct,
    Footer
  }
}
</script>
