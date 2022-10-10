<template>
  <div class="container">
    <h1>Welcome to the admin page!</h1>
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
                <b-button id="updateButton" v-on:click="UpdateUser(user._id)">
                  Click to update!
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row">
                  <div class="mt-2 col-sm">
                    <b-form-input id="usernameInput" type="text" v-model="userName"
                      placeholder="Enter new user name"
                    />
                    <!-- <input v-model="email" placeholder="Enter new Email" /> -->
                    <b-form-input id="passInput" type="password" v-model="password"
                      placeholder="Enter new Password"
                    />
                  </div>
                </div>
                <div class="row">
      <div class="col-sm">
        <b-button id="refreshButton" v-on:click="getUsers()">Refresh Accounts</b-button>
      </div>
      <div class="col-sm">
        <b-button id="deleteUsers" v-on:click="deleteUsers()">Delete Users</b-button>
      </div>
    </div>
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
      users: {},
      userName: '',
      email: '',
      password: ''
    }
  },
  mounted: function () {
    this.getUsers()
  },
  methods: {
    getUsers() {
      Api.get('/users')
        .then(response => {
          console.log(response.data.users)
          this.users = response.data.users
        })
        .catch(error => {
          this.users = error
        })
    },
    UpdateUser(UserId) {
      Api.put('/users/' + UserId, {
        userName: this.userName,
        email: this.email,
        password: this.password
      })
        .then(response => {
          alert('user changed')
        })
        .catch(error => {
          this.users = error
        })
    },
    deleteUsers() {
      Api.delete('/users')
        .then((response) => {
          console.log(response.data)
          alert('you deleted all the users!')
        })
        .catch((error) => {
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

#title-between {
  margin-top: 10px;
}

#passInput {
  background-color: #eec3c0;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
}
#usernameInput {
  background-color: #eec3c0;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
}
#updateButton {
  border-radius: 20px;
  border: 1px solid #c45c4c;
  background-color: #eec3c0;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;

}
#refreshButton {
  border-radius: 20px;
  border: 1px solid #c45c4c;
  background-color: #eec3c0;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;

}
#deleteUsers {
  background-color: #eec3c0;
  padding: 10px 40px;
  font-weight: bold;

}

#navbar {
  color: #eec3c0;
}
</style>
