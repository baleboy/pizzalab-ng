import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import RecipeList from './components/RecipeList'
import RecipePage from './components/RecipePage'
import DoughEditor from './components/DoughEditor'

Vue.config.productionTip = false
Vue.use(VueRouter)

/* eslint-disable no-new */
const routes = [
  { path: '/', component: RecipeList },
  { path: '/:userId/doughs/:doughId', component: RecipePage, props: true },
  { path: '/:userId/doughs/:doughId/edit', component: DoughEditor, props: true },
  { path: '/:userId/add', component: DoughEditor, props: true }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
