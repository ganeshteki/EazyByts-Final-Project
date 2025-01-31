require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;
const TWITTER_API_URL = "https://api.twitter.com/2/tweets/search/recent";
const BEARER_TOKEN = process.env.BEARER_TOKEN;

if (!BEARER_TOKEN) {
  console.error("❌ ERROR: Twitter Bearer Token is missing! Set it in .env file.");
  process.exit(1);
}

app.use(cors({ origin: "http://localhost:3000" })); // Allow frontend requests
app.use(express.json());

let cachedTweets = null;
let lastFetchedTime = 0;
const CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutes in milliseconds

// Function to filter English tweets
const isEnglishTweet = (tweet) => /^[A-Za-z0-9\s.,!?'"()#@:-]*$/.test(tweet.text);

app.get("/api/tweets", async (req, res) => {
  const query = req.query.query || "news";
  const now = Date.now();

  if (cachedTweets && now - lastFetchedTime < CACHE_EXPIRY) {
    console.log("🟢 Returning cached tweets");
    return res.json(cachedTweets);
  }

  try {
    console.log(`🔎 Fetching new tweets for: ${query}`);

    const response = await axios.get(TWITTER_API_URL, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      params: {
        query,
        "tweet.fields": "created_at,text,lang",
        "max_results": 10,
      },
    });

    console.log("✅ Twitter API Response:", response.data);

    // Filter only English tweets before caching
    const englishTweets = response.data.data?.filter((tweet) => tweet.lang === "en") || [];

    if (englishTweets.length === 0) {
      console.warn("⚠️ No English tweets found.");
    }

    // Store only filtered tweets in cache
    cachedTweets = { data: englishTweets };
    lastFetchedTime = now;

    res.json(cachedTweets);
  } catch (error) {
    console.error("❌ Twitter API Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
