import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import api from '../services/apiService.js'


export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    userLogged: null,
    loading: false,
    error: null
  }),
  actions: {
  async fetchUsers() {
    this.loading = true
    this.error = null
    try {
      const response = await api.get('http://localhost:8080/api/users')
      this.users.value = response.data
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    } finally {
      this.loading.value = false
    }
  },
  async actionGetMe(params = {}) {
    try {  
      const response = await api.get('/me')
        this.userLogged = response.data.data
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
    }
  }

  }
})
