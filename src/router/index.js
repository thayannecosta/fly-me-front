import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../views/layouts/MainLayout.vue'
import Users from '../views/Users.vue'
import TravelRequests from '../views/TravelRequests.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/auth/Login.vue'
import FormTravelRequest from '../views/FormTravelRequest.vue'

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
        component: Users
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
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')


  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})
export default router
