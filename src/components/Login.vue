<template>
  <div class="login">
      <h3>Sign in</h3>
      <input type="text" v-model="user.username" placeholder="Username"><br>
      <input type="password" v-model="user.password" placeholder="Password"><br>
      <button @click="login">Login</button>
      <p>You don't have an account? You can <router-link to="/signup"> create one</router-link>
      <hr>
      <p>Sign-in with <span @click="loginGoogle">Google</span> or <span @click="loginFacebook">Facebook</span> account.</p>
      <p>Sign-in with Firebase UI <router-link to='/firebaseauth'>click here</router-link></p>

  </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data() {
        return {
            user: {
                username: '',
                password: ''
            }

        }
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.user.username, this.user.password).then(
                user => {
                    alert('User authentication successful');
                    this.$router.push({name: 'Hello'});
                },
                err => {
                    if (err.code === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else if (err.code === 'auth/user-not-found') {
                        alert('User not found!');
                    } else if (err.code === 'auth/invalid-email') {
                        alert('Invalid email');
                    } else {
                        alert('Oops. ' + err.message);
                    }
                    
                }
            ).catch (error => {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong password')
                } else {
                    alert(error.message);
                }
            })
        },
        loginGoogle() {
            console.log("Google login");
            // Using a popup.
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(
                result => {
                    if (result) {
                        // This gives you a Google Access Token.
                        var token = result.credential.accessToken;
                        // The signed-in user info.
                        var user = result.user;

                        console.log('token: ' + token);
                        console.log(user);

                        this.$router.push('/hello');
                    }
                    
                },
                err => {
                    alert('Oops. ' + err.message);
                }
            );
        },
        loginFacebook() {
            console.log("Facebook login");
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('public_profile');
            provider.setCustomParameters({
                'display': 'popup'
            });
            
            firebase.auth().signInWithPopup(provider).then(
                result => {
                    if (result) {
                        // This gives you a Google Access Token.
                        var token = result.credential.accessToken;
                        // The signed-in user info.
                        var user = result.user;

                        console.log('token: ' + token);
                        console.log(user);

                        this.$router.push('/hello');
                    }
                    
                },
                err => {
                    alert('Oops. ' + err.message);
                }
            );        
        }
    }
}
</script>

<style scoped>
    .login {
        margin-top: 40px;
    }
    input {
        margin: 10px 0;
        width: 40%;
        padding: 15px;
    }
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
    p {
        margin-top: 40px;
        font-size: 13px;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }

</style>
