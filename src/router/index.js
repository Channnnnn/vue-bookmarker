import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import FirebaseAuth from '@/components/FirebaseAuth'
import Profile from '@/components/Profile'
import About from '@/components/About'
import Bookmarker from '@/components/Bookmarker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      component: HelloWorld,
      meta: {
        requiresAuth: true
      },
      children:[
          {
            path: '/',
            name:'Hello',
            component: Profile
          },
          {
            path: '/about',
            name: 'about',
            component: About
          },
          {
            path: '/bookmarker',
            name: 'bookmarker',
            component: Bookmarker
          }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '*', 
      redirect: { name: 'Login'}
    },
    {
      path: '/firebaseauth',
      name: 'Auth',
      component: FirebaseAuth
    }
  ],
  mode: 'history',
})



