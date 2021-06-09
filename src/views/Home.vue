<template>
  <div class="home">
    <h1>Home</h1>
    <router-link :to="{ name: 'User' }">User</router-link> ||||
    <router-link :to="{ name: 'Login' }">Login</router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
