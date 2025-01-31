// src/services/newsService.js
import axios from 'axios';

const API_KEY = '771d87f99a9b4f8d9eba864840492eb9'; // Replace with your actual API key
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

// src/services/newsService.js
export const fetchNews = async (country = 'us', category = 'general') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        country: country,
        category: category,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};



