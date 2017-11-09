// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { firebaseApp, db } from '@/firebaseConfig'

import http from 'http'
import fs from 'fs'
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})

Vue.config.productionTip = false

router.beforeEach( (to, from, next) => {
  var currentUser = firebase.auth().currentUser;

  var requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser)
    next( { name: 'Login'});
  else if (!requiresAuth && currentUser)
    next( {name: 'Hello'});
  else
    next();
})

let app;

// firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(
  user => {
    if (!app) {
      app = new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: { App }
      })
    }
  }
)

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App },
//   created() {
//     firebase.initializeApp(config);
//     firebase.auth().onAuthStateChanged(
//       user => {
//         if (user) {
//           this.$router.push( { name: 'Hello'} );
//         } else {
//           this.$router.push( { name: 'Login'} );
//         }
//       }
//     )
//   }
// })