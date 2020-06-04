<template>
<div>
  <AdminNavbar class="mb-2" />
  <Loading style="margin-top: 100px;" v-if="loading" />
  <AdminShowProduct />
</div>
</template>

<script>
import AdminNavbar from '../components/AdminNavbar.vue';
import AdminShowProduct from '../components/AdminShowProduct.vue';
import Loading from '../components/Loading.vue';
import { mapState } from 'vuex';
export default {
  components: {
    AdminNavbar,
    AdminShowProduct,
    Loading
  },
  computed: mapState(['loading']),
}
</script>