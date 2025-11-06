import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../views/layouts/MainLayout.vue'
import Users from '../views/Users.vue'
import TravelRequests from '../views/TravelRequests.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/auth/Login.vue'
import FormTravelRequest from '../views/FormTravelRequest.vue'
import {useUserStore} from '../store/userStore'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { 
        path: '/users',
        name: 'Users',
        component: Users,
        meta: { requiresGod: true }
      },
      {
        path: '/trips',
        name: 'TravelRequests',
        component: TravelRequests
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/travel-request/new',
        name: 'FormTravelRequest',
        component: FormTravelRequest
      },
      {
        path: '/travel-request/edit/:id',
        name: 'EditFormTravelRequest',
        component: FormTravelRequest
      }
    ]
  },    
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const userStore = useUserStore()

  if (token && !userStore.userLogged) {
    try {
      await userStore.actionGetMe()
    
      localStorage.setItem('user', JSON.stringify(userStore.userLogged))
    } catch (e) {
      console.error('Erro ao buscar /me no guard:', e)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  // Proteção de autenticação básica
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.path === '/login' && token) {
    return next('/')
  }

  if (to.meta.requiresGod) {
    const isGodFromStore = !!userStore.god 

    let isGodFallback = false
    if (!isGodFromStore) {
      const userRaw = localStorage.getItem('user')
      if (userRaw) {
        try {
          const user = JSON.parse(userRaw)
          isGodFallback = user?.permissions?.some(p => p.name === 'god')
        } catch (err) {
          console.warn('user no localStorage inválido', err)
        }
      }
    }

    if (!isGodFromStore && !isGodFallback) {
      return next('/dashboard')
    }
  }

  return next()
})

export default router
