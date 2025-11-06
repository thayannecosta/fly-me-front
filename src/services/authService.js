import api from 'axios';

const API_URL = 'http://localhost:8080/api';

export default {
    async login(credentials) {

        const response = await api.post(`${API_URL}/login`, credentials);

        return response;
    },
};