<template>
<form @submit.prevent="registerUser">
  <h1>Create Account</h1>
  <input type="text" placeholder="Name" v-model="name" class="mb-1"/>
  <input type="email" placeholder="Email" v-model="email" class="mb-1"/>
  <input type="password" placeholder="Password" v-model="password" class="mb-2" />
  <button type="submit">Sign Up</button>
</form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: mapState(['slide']),
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  watch: {
    slide() {
      this.name = '';
      this.email = '';
      this.password = '';
    }
  },
  methods: {
    registerUser() {
      const obj = { name: this.name, email: this.email, password: this.password };
      this.$store.dispatch('registerUser', obj);
    }
  }
}
</script>


<style>

</style>