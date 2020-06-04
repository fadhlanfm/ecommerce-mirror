<template>
<form @submit.prevent="loginUser">
  <h1>Sign In</h1>
  <input type="email" placeholder="Email" v-model="email" class="mb-1" />
  <input type="password" placeholder="Password" v-model="password" class="mb-2" />
  <a href="" @click.prevent="forgotPassword">Forgot your password?</a>
  <button type="submit">Sign In</button>
</form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: mapState(['slide']),
  data() {
    return {
      email: '',
      password: '',
    }
  },
  watch: {
    slide() {
      this.email = '';
      this.password = '';
    }
  },
  methods: {
    loginUser() {
      const obj = { email: this.email, password: this.password };
      this.$store.dispatch('loginUser', obj);
    },
    forgotPassword() {
      this.$router.push('/forgotpassword')
    }
  }
}
</script>

<style>

</style>