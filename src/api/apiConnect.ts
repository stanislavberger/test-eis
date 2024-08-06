import axios from 'axios';

const API_URL = 'https://showroom.eis24.me/api/v4/test/meters/';

export const fetchMeters = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch meters:", error);
        return [];
    }
};