import axios from 'axios';

const API_URL = 'http://localhost:5000/api/subscriptions';

export const getSubscriptions = async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
};

export const addSubscription = async (subData) => {
    const response = await axios.post(API_URL, subData);
    return response.data;
};

export const deleteSubscription = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};