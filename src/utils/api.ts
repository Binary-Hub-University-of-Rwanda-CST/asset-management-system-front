
import axios from 'axios';

// Example function for making API requests
export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling in components or services
  }
};
