<template>
  <div id="authenticate">
    <transition name="slide" mode="out-in">
      <component :is="comp" @swit="swit" />
    </transition>
  </div>
</template>

<script>
import SignUp from "@/components/SignUp.vue";
import SignIn from "@/components/SignIn.vue";

export default {
  name: "Authentication",
  components: { SignUp, SignIn },

  data() {
    return {
      comp: SignIn,
    };
  },

  methods: {
    swit(value) {
      if (value == "signUp") {
        this.comp = SignUp;
      } else {
        this.comp = SignIn;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#authenticate {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-enter-active,
.slide-leave-active {
  transition: all ease-in-out 1s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(120px);
  opacity: 0;
}
</style>
