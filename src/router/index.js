import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import Movies from '../views/Movies'

import guest from '../middleware/guest'
import auth from '../middleware/auth'
import isSubscribed from '../middleware/isSubscribed'

import middlewarePipeline from '../middleware/middlewarePipeline'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      middleware: [ guest ]
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      middleware: [ auth ]
    },
    children: [{
      path: '/dashboard/movies',
      name: 'dashboard.movies',
      component: Movies,
      meta: {
        middleware: [ auth, isSubscribed ]
      },
    }],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  // 需要驗證
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  /* 
    middleware[0] is a function and
    parameters are your (next, store) to decide your final action; 
  */
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
