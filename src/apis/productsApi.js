import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (limit = 12, skip = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};
