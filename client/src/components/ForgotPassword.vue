<template>
<div class="container">
  <div style="margin: 50px 0px;">
    <h1>Reset Your Password!</h1>
  </div>
  <form id="formContainer" class="card shadow bg-white rounded" @submit.prevent="resetPassword">
    <div class="form-group">
      <label>Enter Your Email address</label>
      <input type="email" class="form-control" v-model="email">
    </div>
    <div class="form-group">
      <label>New Password</label>
      <input type="password" class="form-control" v-model="newPassword">
    </div>
    <div class="form-group">
      <label>Confirm New Password</label>
      <input type="password" class="form-control" v-model="confirmPassword">
    </div>
    
    <div class="mt-2" style="width: 400px;">
      <button type="submit" class="btn btn-primary mx-1">Submit</button>
      <button type="button" class="btn btn-danger mx-1" @click.prevent="cancel">Cancel</button>
    </div>
  </form>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  methods: {
    cancel() {
      this.$router.push('/login');
    },
    resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.$store.dispatch('showError', { message: 'Please enter the same password' });
      } else {
        const obj = {
          email: this.email,
          newPassword: this.newPassword
        }
        this.$store.dispatch('resetPassword', obj);
      }
    }
  }
}
</script>

<style>
#formContainer {
  width: 400px;
  margin: auto;
  padding: 20px;
  height: 400px;
}

</style>