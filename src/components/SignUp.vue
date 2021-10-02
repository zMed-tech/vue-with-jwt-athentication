<template>
  <div id="sign-up">
    <h2>Sign Up</h2>
    <div class="input">
      <input v-model="username" type="text" placeholder="Username :" />
    </div>
    <div class="input">
      <input v-model="email" type="email" placeholder="Email :" />
    </div>
    <div class="input">
      <input v-model="password" type="password" placeholder="Password :" />
    </div>
    <div class="buttons">
      <button @click="signUp">Sign Up</button>
      <button @click="cancel">Cancel</button>
    </div>
    <div class="switch">
      <button @click="$emit('swit', 'signIn')">Sign In ?</button>
    </div>

    <div class="msg">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",

  data() {
    return {
      username: "",
      email: "",
      password: "",
      message: "",
    };
  },

  methods: {
    async signUp() {
      this.message = "";
      let obj = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      let { data } = await axios.post("http://localhost:3000/signup", obj);

      if (data == "err") {
        this.message = "Error";
      } else {
        localStorage.setItem("key", data);
        this.$router.push({ name: "User" });
      }
    },

    cancel() {
      this.username = "";
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style lang="scss" scoped>
#sign-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 2px solid gray;
  border-radius: 2rem;

  & .input {
    border: 1px solid gray;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    margin: 1rem 0;

    & input {
      font-size: 1.2rem;
      outline: none;
      border: none;
    }
  }

  & .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & button {
      padding: 0.2rem 0.5rem;
      font-weight: bold;
      background-color: gray;
      color: black;
      cursor: pointer;
      margin: 0 0.3rem;
      transition: all ease-in-out 0.7s;

      &:hover {
        color: red;
        transform: scale(1.2);
      }
    }
  }

  & .switch {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    & button {
      text-decoration: underline;
      color: blue;
      font-size: 0.8rem;
      cursor: pointer;
      outline: none;
      background: none;
      border: none;
    }
  }
}
</style>
