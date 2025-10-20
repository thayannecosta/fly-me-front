import { defineStore } from 'pinia'
import apiService from '../services/apiService.js'
import { ref } from 'vue'


export const useTravelRequestStore = defineStore('travelRequests', {
  state: () => ({
    travelRequests: ref([]),
    travelRequest: ref(null),
    travelCount: 0,
    approvedTravelCount: 0
  }),

  actions: {
    async actionGetTravelRequests(params = {}) {
      try {
        const response = await apiService.get('travel-requests', { params })
        this.travelRequests.value = response.data.data 

        this.travelCount = Array.isArray(this.travelRequests.value)
          ? this.travelRequests.value.length
          : 0
          
        this.totalTravelCount()

        
      } catch (error) {
        console.error('Erro ao buscar solicitações de viagem:', error)
      }
    },
    async actionFilterTravelRequests(params = {}) {
      try {
        const response = await apiService.get('travel-requests', params)
        this.travelRequests.value = response.data.data 
      } catch (error) {
        console.error('Erro ao buscar solicitações de viagem:', error)
      }
    },
    async actionCreateTravelRequest(payload) {
      try {
        const response = await apiService.post('travel-request', payload)
        await this.actionGetTravelRequests()
        return response.data
      } catch (error) {
        console.error('Erro ao criar solicitação de viagem:', error)
        throw error
      }
    },

    async actionGetTravelRequest(id) {
      try {
        const response = await apiService.get(`travel-request/${id}`)
        this.travelRequest = response.data.data
        return response.data.data
      } catch (error) {
        console.error('Erro ao buscar detalhes da solicitação:', error)
      }
    },

    async actionUpdateTravelRequest(id, payload) {
      try {
        const response = await apiService.put(`travel-request/${id}`, payload)
        await this.actionGetTravelRequests()
        return response.data
      } catch (error) {
        console.error('Erro ao atualizar solicitação de viagem:', error)
        throw error
      }
    },

    async actionDeleteTravelRequest(id) {
      try {
        const response = await apiService.delete(`travel-request/${id}`)
        this.travelRequests = this.travelRequests.filter(req => req.id !== id)
        return response.data
      } catch (error) {
        console.error('Erro ao deletar solicitação de viagem:', error)
        throw error
      }
    },

    async actionSetStatusTravelRequest(id, status) {
      try {
        const response = await apiService.post(`travel-request/${id}/status`, { status })
        await this.actionGetTravelRequests()
        return response.data
      } catch (error) {
        console.error('Erro ao atualizar status da solicitação:', error)
        throw error
      }
    },    
    async totalTravelCount() {
      const list = Array.isArray(this.travelRequests.value) ? this.travelRequests.value : []
      this.travelCount = list.length

      this.travelCount = Array.isArray(this.travelRequests.value)
        ? this.travelRequests.value.length
        : 0      

      this.approvedTravelCount = list.filter(req =>
        req?.travel_request?.status === 'approved'
      ).length

    },
  }
})