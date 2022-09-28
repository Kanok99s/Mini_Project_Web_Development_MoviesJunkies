<template>
    <article>
        <div class="container" :class="{'sign-up-active' : signUp}">
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-left">
                        <h2>Welcome to MoviesJunkies!</h2>
                        <p>Please login with your personal info!</p>
                        <button class="invert" id="signIn" @click="signUp = !signUp">Sign in</button>

                    </div>
                    <div class="overlay-right">
                        <h2>Hello Friend</h2>
                        <p>Please enter your personal details</p>
                        <button class="invert" id="signUp" @click="signUp = !signUp">Sign up</button>

                    </div>
                    <!-- <div class="sign-up">
                        <button v-on:id="sign_Up" @click="submit()">sign up</button>
                    </div> -->
                </div>

            </div>
            <form class="sign-up" action="#">
                <h2>Create login</h2>
                <div>Use your email for registration</div>
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button v-on:id="sign_Up" @click="submit()">Sign Up</button>
            </form>
            <form class="sign-in" action="#">
                <h2>Sign In</h2>
                <div>Use your account</div>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
    </article>
</template>
<script>
// @ is an alias to /src
import { Api } from '@/Api'
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      signUp: false
    }
  },
  methods: {
    submit() {
      Api.post('/users', {
        userName: this.userName,
        email: this.email,
        password: this.password
      })
        .then((response) => {
          this.users = response.data
          console.log(response.data)
        })
        .catch((error) => {
          this.message = error.message
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
    .container {
        position: relative;
        width: 768px;
        height: 480px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                0 10px 10px rgba(0, 0, 0, .2);
                background: linear-gradient(to bottom, #c45c4c, #eec3c0);

                .overlay-container {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    width: 50%;
                    height: 100%;
                    overflow: hidden;
                    transition: transform .5s ease-in-out;
                    z-index: 100;
                }

                .overlay {
                    position: relative;
                    left: -100%;
                    height: 100%;
                    width: 200%;
                    background: linear-gradient(to bottom right, #c45c4c,#eec3c0);
                    color: #fff;
                    transform: translateX(0);
                    transition: transfrom .5s ease-in-out;
                }

                @mixin overlays($property) {
                    position: absolute;
                    top: 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-direction: column;
                    padding: 80px 40px;
                    width: calc(50% - 80px);
                    height: calc(100% - 140px);
                    text-align: center;
                    transform: translateX($property);
                    transition: transform .5s ease-in-out;
                }

                .overlay-left {
                    @include overlays(-20%);

                }

                .overlay-right{
                    @include overlays(0);
                    right: 0;

                }
    }

    h2 {
        margin: 0;

    }
    p {
        margin: 20px 0 30px;
    }
    a {
        color: #c45c4c;
        text-decoration: none;
        margin: 15px 0;
        font-size: 1rem;
    }

    button {
        border-radius: 20px;
        border: 1px solid #eec3c0;
        background-color:#eec3c0;
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        padding: 10px 40px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform .1s ease-in;

        &:active {
            transform: scale(.9);
        }

        &:focus {
            outline: none;
        }
    }

    button.invert {
        background-color: transparent;
        border-color:#fff;

    }
    form {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding: 90px 60px;
        width: calc(50% - 120px);
        height: clac(200px - 180px);
        text-align: center;
        background: linear-gradient(to bottom, #efefef, #ccc);
        transition: all .5s ease-in-out;

        div {
            font-size: 1rem;
        }

        input {
            background-color: #eec3c0;
            border: none;
            padding: 8px 15px;
            margin: 6px 0;
            width: calc(100% - 30px);
            border-radius: 15px;
            border-bottom: 1px solid #ddd;
            box-shadow: insert 0 1px 2px rgba(0, 0, 0, .4),
                               0 -1px 1px #fff,
                               0 1px 0 #fff;
            overflow: hidden;

            &:focus {
                outline: none;
                background-color: #fff;

            }

        }

    }
    .sign-in {
        left: 0;
        z-index: 2;
    }

    .sign-up {
        left: 0;
        z-index: 1;
        opacity: 0;

    }

    .sign-up-active {
        .sign-in {
            transform: translateX(120%);
        }

        .sign-up {
            transform: translateX(130%);
            opacity: 1;
            z-index: 5;
            animation: show .5s;
        }
        .overlay-container {
            transform: translate(-100%);
        }

        .overlay {
            transform: translateX(50%);
        }
        .overlay-left {
            transform: translate(0);
        }
        .overlay-right {
            transform: translate(20%);
    }
}
@keyframes show {
    0% {
        opacity: 0;
        z-index: 1;
    }
    49% {
        opacity: 0;
        z-index: 1;
    }
    50% {
        opacity: 1;
        z-index: 10;
    }
}

</style>
