import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/apiService.js'


export const useUserStore = defineStore('user', {
  state: () => ({
    users: ref([]),
    userLogged: ref(null),
    god: false,
    usersCount: 0,
  }),
  actions: {
  async fetchUsers() {
    try {
      const response = await api.get('http://localhost:8080/api/users')
      this.users.value = response.data
      this.usersCount = Array.isArray(this.users.value)
          ? this.users.value.length
          : 0
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    } 
  },
  async actionGetMe(params = {}) {
    try {  
      const response = await api.get('/me')
        this.userLogged = response.data.data
        this.god = response.data.data.permissions?.some(p => p.name === 'god')
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
    }
  },
  totalUsersCount() {
      this.usersCount = Array.isArray(this.users.value)
        ? this.users.value.length
        : 0
    },
  }
})
