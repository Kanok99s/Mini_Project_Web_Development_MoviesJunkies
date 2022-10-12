<template>
    <div class=" d-flex align-items-center justify-content-center"
  style="bottom: 0; overflow-y: auto" id="signup-page">
  <div class="box">
    <b-form>
        <div>
            <img class="logo" src="../assets/movie.png" />
          </div>
            <div class="header">
              <h1>Sign Up</h1>
            </div>
             <div class="enterinput">
              <b-input
                type="text" class="input" v-model="userName" placeholder="Enter your username"/>
            </div>
           <div class="enterinput">
              <b-input type="email" class="input" v-model="email" placeholder="Enter your email" />
            </div>
            <div class="enterinput">
              <b-input type="password" class="input" v-model="password" placeholder="Enter your password"/>
            </div>
            <b-button type="button" id="signupButton" @click="preventSignup()">Sign Up</b-button>
              <b-form-group>
            <b-form-text class="text"
              >Already have an account?
              <router-link to="/">Login</router-link>
            </b-form-text>
            </b-form-group>
         </b-form>
         </div>
        </div>
      </template>
<script>

import { Api } from '@/Api'
export default {
  name: 'SignUp',
  data() {
    return {
      userName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    preventSignup() {
      if (this.userName === '') {
        alert('User name is empty')
        this.$router.push('/signup')
      }
      if (this.email === '') {
        alert('Email is empty')
        this.$router.push('/signup')
      }
      if (this.password === '') {
        alert('Password is empty')
        this.$router.push('/signup')
      } else {
        this.submit()
      }
    },
    submit() {
      Api.post('/users', {
        userName: this.userName,
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.users = response.data
          console.log(response.data)
          this.$router.push('/')
        })
        .catch(error => {
          this.message = error.message
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>

* {
  font-family: monospace, Avenir, Helvetica, Arial, sans-serif;
  color: white;
}
#signupButton {
  background-color: #eec3c0;
  border: none;
  padding: 8px 15px;
  margin: auto;
  margin: 0 auto;
  display: block;
}
.input {
  background-color: #eec3c0;
  border: none;
  margin: 6px 0;
}
.logo {
  width: 150px;
  align-content: center;
  padding: 1%;
}

.box{
  border-radius: 15px 50px;
  background: #7b8aaa;
  padding: 3%;
    border-width: 5px;
     border-style: outset;
     border-color: #67789e;
}

#signup-page {
   align-items: center;
   display: flex;
   height: 100vh;
}
</style>
