<template>
<div>
  <UserNavbar />
  <AddCartCard />
</div>
</template>

<script>
import UserNavbar from '../components/UserNavbar.vue';
import AddCartCard from '../components/AddCartCard.vue';
export default {
  components: {
    UserNavbar,
    AddCartCard
  }
}
</script>