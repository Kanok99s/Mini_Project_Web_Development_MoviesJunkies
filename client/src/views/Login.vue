<template>
    <div class="container-sm">
        <b-form >
          <div class="header">
            <h1>Login</h1>
          </div>
          <div class="enterinput">
            <b-input type="email" class="input" v-model="email" placeholder="Email"/>
          </div>
    <div class="enterinput">
            <b-input type="password" class="input" v-model="password" placeholder="Password" />
          </div>
          <div>
            <b-button type="button" id="signinButton" @click="signIn()">Sign In</b-button>
          </div>
          <b-form-group>
            <b-form-text class="text"
              >Dont have an acccount?
              <router-link to="/signup">Sign Up</router-link>
            </b-form-text>
            </b-form-group>
        </b-form>
        </div>
      </template>
<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      const user = {
        email: this.email,
        password: this.password
      }
      Api.post('/users/login', user).then(
        res => {
          // if successfull
          if (res.status === 200) {
            localStorage.setItem('email', res.data.email)
            this.$emit('handleLogin', true)
            this.$router.push('/home')
          }
          localStorage.clear()
        },
        err => {
          console.log(err.response)
          this.error = err.response.data.error
          alert('Invalid credentials!')
        }
      )
    }
  }
}
</script>
<style scoped>

* {
  font-family: monospace, Avenir, Helvetica, Arial, sans-serif;
  color: white;
}
#signinButton {
  background-color: #eec3c0;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
  margin: 0 auto;
  display: block;
}
.input{
    background-color: #eec3c0;
    margin: 6px 0;
}
</style>
