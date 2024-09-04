import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // Remplacez par l'URL de votre API
});

// Ajoutez un intercepteur de requête pour ajouter le token aux en-têtes
axiosInstance.interceptors.request.use(
    (config) => {
        // Récupérez le token depuis localStorage
        const token = localStorage.getItem('token');
        
        // Si le token existe, ajoutez-le aux en-têtes
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        // Si l'erreur est liée à l'authentification, redirigez l'utilisateur ou effectuez une action
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Vous pouvez rediriger l'utilisateur vers une page de connexion
            // ou effectuer une autre action appropriée
            console.log('Authentication error:', error.response.data);
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;
