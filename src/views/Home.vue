<template>
  <div class="home">
    <Authenticate />
  </div>
</template>

<script>
import Authenticate from "@/components/Authenticate.vue";

export default {
  name: "Home",
  components: {
    Authenticate,
  },
};
</script>
