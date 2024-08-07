import axios from 'axios';

const testApi = async () => {
  try {
    const response = await axios.get(
      'http://showroom.eis24.me/api/v4/test/meters/?limit=1&offset=0'
    );
    console.log('Test API response:', response.data.results[1]);
  } catch (error) {
    console.error('Test API error:', error);
  }
};

export default testApi;
