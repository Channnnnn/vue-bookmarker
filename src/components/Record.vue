<template>
  <div class="well">
        <h3>{{record.name}}
            <a class="bttn" target="_blank" :href="record.url">Visit</a>
            <a @click="$emit('remove-self')" class="bttn danger">Delete</a>
        </h3>
    </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/firebaseConfig'

var md5 = require('md5');
export default {
    name: 'Record',
    props: ['record'],
}
</script>

<style scoped>
.well{
    text-align: left;
    width: 75%;
    background-color: #eee;
    padding: .25em 1.5em;
    margin: 1em auto;
    box-sizing: border-box;
    border-radius: 15px;
}
a.bttn{
    text-align: center;
    display: inline-block;
  font-weight: normal;
  text-decoration: none;
  font-size: 0.8rem;
  border: 0;
  background-color: #42b983;
  color: white;
  padding: 1em;
  min-width: 50px;
  margin: 0 .5em;
  border-radius: 5px;
  cursor: pointer;
  transition: all .15s;
}
a.bttn.danger{
  background-color: #e85757;
}
a.bttn:hover{
  opacity: .75;
}
</style>
