<template>
  <div v-if="user" id="user">
    <h1>Hello {{ user.username }}</h1>
    <div>
      <button @click="signOut">Se Deconnecter</button>
    </div>
  </div>
  <div v-else>
    <p>Loading ....</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "User",
  data() {
    return {
      user: null,
    };
  },
  async created() {
    const { data } = await axios.get("http://localhost:3000/user", {
      headers: { authorization: "Bearer " + localStorage.getItem("key") },
    });
    this.user = data;
  },

  methods: {
    signOut() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>
