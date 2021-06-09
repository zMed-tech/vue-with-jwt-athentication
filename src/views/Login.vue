<template>
  <div id="login">
    <Authenticate />
  </div>
</template>

<script>
import Authenticate from "@/components/Authenticate.vue";

export default {
  name: "Login",
  components: {
    Authenticate,
  },
};
</script>
