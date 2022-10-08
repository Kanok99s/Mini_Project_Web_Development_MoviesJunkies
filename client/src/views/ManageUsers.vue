<template>
    <div class="container">
      <h1>Welcome to the admin page!</h1>
      <div class="row">
        <div class="col-sm">
          <button v-on:click="getUsers()"
            >Refresh list of Accounts:</button
          >
        </div>
      </div>
      <div class="row">
        <div class="mt-2 col-sm">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">User name</th>
                <!-- <th scope="col">Email</th> -->
                <th scope="col">Password</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" v-bind:key="user._id">
                <td>{{ user.userName }}</td>
                <!-- <td>{{ user.email }}</td> -->
                <td>{{ user.password }}</td>
                <td>
                  <button v-on:click="putUserbyID(user._id)"
                    >Update this user</button
                  >
                  <div class="row">
        <div class="mt-2 col-sm">
          <input v-model="userName" placeholder="Enter new user name" />
          <!-- <input v-model="email" placeholder="Enter new Email" /> -->
          <input v-model="password" placeholder="Enter new Password" />
        </div>
      </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
export default {
  data() {
    return {
      Users: [],
      users: {
        userName: '',
        email: '',
        password: ''
      },
      user: { userName: '', email: '', password: '' }
    }
  },
  mounted: function () {
    this.getUsers()
  },
  methods: {
    getUsers() {
      Api.get('/users')
        .then((response) => {
          console.log(response.data.users)
          this.users = response.data.users
        })
        .catch((error) => {
          this.users = error
        })
    },
    putUserbyID(UserId) {
      Api.put('/users/' + UserId, {
        userName: this.userName,
        email: this.email,
        password: this.password
      })
        .then((response) => {
          alert('user changed')
        })
        .catch((error) => {
          this.users = error
        })
    }
  }
}
</script>

  <style scoped>
  #title-between {
    margin-top: 10px;
  }

  input {
        background-color: #eec3c0;
        border: none;
        padding: 8px 15px;
        margin: 6px 0;
        width: calc(60% - 30px);
        border-radius: 15px;
        border-bottom: 1px solid #ddd;
        box-shadow: insert 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff,
          0 1px 0 #fff;
        overflow: hidden;

      }
      button {
      border-radius: 20px;
      border: 1px solid #eec3c0;
      background-color: #eec3c0;
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
      padding: 10px 40px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: transform 0.1s ease-in;
      }
  .btn_message {
    margin-bottom: 1em;
  }
  #navbar {
    color: #eec3c0;
  }
  </style>
