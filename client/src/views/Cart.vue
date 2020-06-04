<template>
<div>
  <UserNavbar />
  <h1>Cart</h1>
  <ShowCartCard />
</div>
</template>

<script>
import Loading from '../components/Loading.vue';
import ShowCartCard from '../components/ShowCartCard.vue';
import UserNavbar from '../components/UserNavbar.vue';
export default {
  components: {
    Loading,
    ShowCartCard,
    UserNavbar
  },
}
</script>