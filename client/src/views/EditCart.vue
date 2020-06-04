<template>
<div>
  <UserNavbar />
  <EditCartCard />
</div>
</template>

<script>
import EditCartCard from '../components/EditCartCard.vue';
import UserNavbar from '../components/UserNavbar.vue';
export default {
  components: {
    EditCartCard,
    UserNavbar
  }
}
</script>