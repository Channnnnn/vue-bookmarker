<template>
  <div>
    <h2>User information:</h2>
    <div v-if="user.photoURL">
    <p>Profile Photo:</p>
    <img :src="user.photoURL" style="height: 120px">
    </div>
    <h6 class="disp" >ID: {{ user.userId }}</h6>
    <h1 class="disp" v-if="user.name">Name: {{ user.name }}</h1>
    <h2 class="disp" >Email: {{ user.email }}</h2>
    <p>Facebook: {{ user.fbUrl }}</p>
    <p>Birthday: {{ user.birthday }}</p>
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '@/firebaseConfig'

var md5 = require('md5');
export default {
    name: 'profile',
    data () {
    return {
      user: {
        photoURL: '',
        userId: '',
        name: '',
        email: '',
        fbUrl: '',
        birthday: ''
      }
    }
  },
  created() {
    var user = firebase.auth().currentUser;

    if (user) {
      this.user.photoURL = user.photoURL;
      this.user.userId = user.uid;
      this.user.name = user.displayName;
      this.user.email = user.email;

      var uid = md5(user.email);
      console.log(uid);

      db.ref('users/' + uid).once('value').then(
        snapshot => {
          if (snapshot) {
            console.log(snapshot);
            this.user.name = snapshot.val().name;
            this.user.fbUrl = snapshot.val().fbUrl;
            this.user.birthday = snapshot.val().birthday;
          }
      });

    }
  }
}
</script>

<style>
.disp{
  margin: 1rem;
}
h1, h2 {
  font-weight: normal;
}
hr{
  width: 75%;
  border: 0;
  border-top: 1px solid #ddd;
}
ul {
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

a.button, button{
  text-decoration: none;
  font-size: 0.8rem;
  border: 0;
  background-color: #42b983;
  color: white;
  padding: 1em;
  min-width: 100px;
  border-radius: 5px;
  cursor: pointer;
  transition: all .15s;
}
button{
  background-color: #e85757;
}
a.button:hover, button:hover{
  opacity: .75;
}
</style>
