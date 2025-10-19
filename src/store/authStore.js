import { defineStore } from 'pinia'
import axios from 'axios'
import authService from '../services/authService'
import api from '../services/apiService'
import {useRouter} from 'vue-router'
import { ref } from 'vue'




export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
  }),
  actions: {
    async login(credentials) {
      try {          
        const response = await authService.login(credentials);
            if(!response.data.status){
              throw error;
            }            
            this.user = response.data.user;
            this.token = response.data.token;            
            this.isAuthenticated = true;
            localStorage.setItem('token', this.token);
            return response.data.status;
        } catch (error) {
            throw error;
      }
    },
    async logout(){
      const router = useRouter()

      try {
        await api.post('/logout', { withCredentials: true })
        this.user = null
        this.isAuthenticated = false
        localStorage.removeItem('token');
        return true

      } catch (error) {
        
      }
    }
  }
})
