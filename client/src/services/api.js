import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add this to use for handle Login 
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));


apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {

        if (error.response && error.response.status === 401) {
            console.warn("User not authenticated.");
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (error.response && error.response.status === 419) {
            try {
                const response = await axios.post('http://localhost:3001/auth/refresh-access-token', {},
                    { withCredentials: true });
                const { access_token } = response.data;
                localStorage.setItem('access_token', access_token);

                //Retry the original request with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed', refreshError);
                await axios.post('http://localhost:3001/auth/logout',{},
                { withCredentials: true });
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);


// Function to make a GET request
export const get = async (endpoint, config = {}) => {
    const response = await apiClient.get(endpoint, config);
    return response.data;
};

// Function to make a POST request
export const post = async (endpoint, data = {}) => {
    const response = await apiClient.post(endpoint, data);
    return response.data;
};

// Function to make a PUT request
export const put = async (endpoint, data) => {
    const response = await apiClient.put(endpoint, data);
    return response.data;
};

// Function to make a DELETE request
export const del = async (endpoint) => {
    const response = await apiClient.delete(endpoint);
    return response.data;
};
