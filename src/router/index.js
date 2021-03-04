import { createRouter, createWebHashHistory } from 'vue-router'
import userModel from '@/models/userModel'
import Login from '../views/Login'
import Notes from '../views/Notes'
import store from '../store'
import Note from '@/views/Note'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: checkLogin,
    meta: {
      layout: 'Auth'
    }
  },
  {
    path: '/notes',
    component: Notes,
    meta: {
      auth: true
    }
  },
  {
    path: '/note/:id',
    name: 'note',
    component: Note,
    meta: {
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.path === from.path) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  }
})

async function checkLogin (to, from, next) {
  const token = localStorage.getItem('token')
  if (token) {
    const { user } = (await userModel.tokenLogin(token)).data
    store.commit('SET_USER', user)
    next('/notes')
  } else {
    next()
  }
}

router.beforeEach(async (to, from, next) => {
  if (to?.meta?.auth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/')
    } else if (!store.getters.getUser) {
      const { user } = (await userModel.tokenLogin(token)).data
      store.commit('SET_USER', user)
      next()
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
