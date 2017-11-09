<template>
  <div class="sign-up">
      <p>Let's create a new account!</p>
        <input type="text" ref="name" v-model="user.name" placeholder="Full Name"><br>
        <span v-show="this.warn.name" v-html="this.warn.name"></span>
        <input type="text" ref="email" v-model="user.email" placeholder="Email"><br>
        <span v-show="this.warn.email" v-html="this.warn.email"></span>
        <input type="password" v-model="user.password1" placeholder="Password"><br>
        <input type="password" ref="password2" v-model="user.password2" placeholder="Confirm password"><br>
        <span v-show="this.warn.pass" v-html="this.warn.pass"></span>
        <input type="text" ref="url" v-model="user.url" placeholder="Facebook URL"><br>
        <span v-show="this.warn.url" v-html="this.warn.url"></span>
        <input type="text" ref="birth" v-model="user.birth" v-validate="'required|date_format:DD/MM/YYYY'" name="birth" placeholder="DD/MM/YYYY Date of Birth"><br>
        <span v-show="errors.has('birth')">{{errors.first('birth')}}</span>
        <button  @click="validateBeforeSubmit">Sign Up</button>
      <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase';
import { db } from '@/firebaseConfig';
import vee from 'vee-validate';

const config = {
    errorBagName: 'errors', // change if property conflicts
    fieldsBagName: 'fields',
    delay: 0,
    locale: 'en',
    dictionary: null,
    strict: true,
    classes: false,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true,
    validity: false,
    aria: true
};

Vue.use(vee,config);
var md5 = require('md5');
let usersRef = db.ref('users');

export default {
  name: 'signUp',
  data() {
      return {
          user: {
              name: '',
              email: '',
              password1: '',
              password2: '',
              url: '',
              birth: ''
          },
          warn:{
              name: '',
              email: '',
              url: '',
              pass: '',
          }
      }
  },
  watch: {
    'user.name' : function(){
        var nameRegex = /[A-Z][a-z]*\s+[A-Z][a-z]*/;
        if(!this.user.name.match(nameRegex) && this.user.name){
            this.warn.name = '<pre>Name must be in "<i>First-name</i> <i>Last-name</i>" format.</pre>'
        } else { this.warn.name = ''; }
    },
    'user.email' : function(){
        var mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if(!this.user.email.match(mailRegex) && this.user.email){
            this.warn.email = '<pre>Email must be in "<i>address</i>@<i>domain</i>.<i>tld</i>" format.</pre>'
        } else { this.warn.email = ''; }
    },
    'user.password2' : function(){
        if(this.user.password1 == this.user.password2){
            this.warn.pass = '';
        } else { this.warn.pass = '<pre>Password mismatch</pre>'; }
    },
    'user.url' : function(){
        var fbRegex = /(https?:\/\/|^)(w{3}\.facebook\.com\/profile\.php\?id=[0-9]+)|(https?:\/\/|^)(w{3}\.facebook\.com\/[^.][aA-zZ0-9.]+)+\/?$/;
        if(!this.user.url.match(fbRegex) && this.user.url){
            this.warn.url = '<pre>Input must be a valid facebook url.</pre>'
        } else { this.warn.url = ''; }
    }
      
  },
  methods: {
      validateBeforeSubmit() {
            if (this.user.name && this.user.email && this.user.password2 &&
                    this.user.password1 === this.user.password2 &&
                    this.warn.email === '' && this.warn.url==='' && !this.error){
                this.signup();
            } else {
                if(!this.user.name) {
                    alert('Name cannot be empty');
                    this.$refs.name.focus();
                    return;
                }
                if(!this.user.email) {
                    alert('Email cannot be empty');
                    this.$refs.email.focus();
                    return;
                }
                if(this.user.password1 != this.user.password2) {
                    alert('Password mismatch');
                    this.$refs.password2.focus();
                    return;
                }
                if(!this.user.email.match(mailRegex)){
                    alert('Invalid Email');
                    return;
                }
                if(!this.user.url.match(urlRegex)){
                    alert('Invalid url');
                    return;
                }
            }
      },
      signup() {
            firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password1).then( 
                user => {
                    alert('Your accound has been created!');

                    /* add user info to database */
                    var newUser = this.addUserInfo();

                    this.$router.push({ name: 'Hello'});
                }, 
                error => {
                    var errorCode = error.code;
                    var errorMsg = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too week');
                    } else {
                        alert('Oops.' + errorMsg);
                    }
                }
            );
      },
      addUserInfo() {
          var newUser = {
              name: this.user.name,
              email: this.user.email,
              birthday: this.user.birth,
              fbUrl: this.user.url
          }

          var uid = md5(this.user.email);
          console.log(uid);
          db.ref('users/'+ uid).set(newUser);

      }
    }
}
</script>

<style scoped>
    .signUp {
        margin-top: 40px;
    }
    input {
        margin: 5px 0;
        width: 40%;
        padding: 15px;
    }
    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }
    span {
        display: block;
        color: darkorange;
        /* margin-top: 20px; */
        font-size: 11px;
    }

</style>

