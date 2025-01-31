// src/services/rssService.js
import axios from 'axios';

const fetchRSSFeed = async (rssUrl) => {
  try {
    const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
};

export default fetchRSSFeed;
