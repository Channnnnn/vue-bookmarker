<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <router-link class="bttn" :to="{name: 'about'}">About</router-link>
      <router-link class="bttn" :to="{name: 'Hello'}">Profile</router-link>
      <router-link class="bttn" :to="{name: 'bookmarker'}">Bookmarker</router-link>
      <button @click="logout">Logout</button>
    </ul>
    <hr>
    <router-view></router-view>

  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Firebase Authentication tutorial'
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then( () => {
        this.$router.push( { name: 'Login'});
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

a.bttn, button{
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
a.bttn:hover, bttn:hover{
  opacity: .75;
}
</style>
