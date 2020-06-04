<template>
<div>
  <AdminNavbar />
  <div style="margin-top: 80px;">
    <h1>Edit Your Product</h1>
    <EditProductCard />
  </div>
</div>
</template>

<script>
import EditProductCard from '../components/EditProductCard.vue';
import AdminNavbar from '../components/AdminNavbar.vue';
export default {
  components: {
    EditProductCard,
    AdminNavbar
  }
}
</script>