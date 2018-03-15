import Vue from 'vue'
import VueRouter from 'vue-router'
import VuejsDialog from 'vuejs-dialog'
import firebase from 'firebase'

import App from './App'
import RecipeList from './components/RecipeList'
import RecipePage from './components/RecipePage'
import LoginPage from './components/LoginPage'
import NewDoughPage from './components/NewDoughPage'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VuejsDialog, {
  okText: 'Confirm',
  cancelText: 'Cancel'
})

/* eslint-disable no-new */
const routes = [
  { path: '/', component: RecipeList },
  { path: '/:userId/doughs/:doughId', component: RecipePage, props: true },
  { path: '/:userId/add', component: NewDoughPage, props: true },
  { path: '/auth', component: LoginPage }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// Move to top of page after route change. For some reason scrollBehavior
// (https://router.vuejs.org/en/advanced/scroll-behavior.html) doesn't work
router.afterEach((to, from) => {
  document.getElementById('app').scrollIntoView()
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
