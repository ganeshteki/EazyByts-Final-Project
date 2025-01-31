import axios from "axios";

const fetchTweets = async (retries = 3, delay = 5000) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/tweets`);
    console.log("📌 Raw Twitter API Response:", response.data);

    return response.data?.data || []; // Ensure correct data structure
  } catch (error) {
    console.error("❌ Error fetching tweets:", error.response?.data || error.message);

    if (error.response?.status === 429 && retries > 0) {
      console.warn(`⚠️ Rate limit hit! Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
      return fetchTweets(retries - 1, delay * 2);
    }

    return { error: error.response?.data || "Failed to fetch tweets" };
  }
};

export default fetchTweets;
