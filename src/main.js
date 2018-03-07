import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import App from './App'
import RecipeList from './components/RecipeList'
import RecipePage from './components/RecipePage'
import DoughEditor from './components/DoughEditor'
import LoginPage from './components/LoginPage'

Vue.config.productionTip = false
Vue.use(VueRouter)

/* eslint-disable no-new */
const routes = [
  { path: '/', component: RecipeList },
  { path: '/:userId/doughs/:doughId', component: RecipePage, props: true },
  { path: '/:userId/doughs/:doughId/edit', component: DoughEditor, props: true },
  { path: '/:userId/add', component: DoughEditor, props: true },
  { path: '/auth', component: LoginPage }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

const config = {
  apiKey: 'AIzaSyD739TnqiRTSQcNsMaE4yj5SNeT7V9vLj4',
  authDomain: 'pizzalab2-e80ef.firebaseapp.com',
  databaseURL: 'https://pizzalab2-e80ef.firebaseio.com',
  projectId: 'pizzalab2-e80ef',
  storageBucket: 'pizzalab2-e80ef.appspot.com',
  messagingSenderId: '911004980652'
}

new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      } else {
        this.$router.push('/auth')
      }
    })
  }
})
