import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/newsService';
import fetchRSSFeed from '../services/rssService';
import fetchTweets from '../services/twitterService';
import './NewsList.css';

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

const NewsList = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [rssFeeds, setRssFeeds] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('general');
  const [tab, setTab] = useState('news');

  useEffect(() => {
    let isMounted = true;
    
    const getNews = async () => {
      setLoading(true);

      if (tab === 'news') {
        const news = await fetchNews('us', category);
        if (isMounted) setNewsArticles(news);
      } 

      if (tab === 'rss') {
        const rss = await fetchRSSFeed('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
        if (isMounted) setRssFeeds(rss);
      } 

      if (tab === "tweets") {
        console.log(`🔎 Fetching tweets...`);
        const tweetsData = await fetchTweets();

        if (isMounted) {
          if (tweetsData?.error) {
            console.error("❌ Twitter API Error:", tweetsData.error);
            setTweets(null);
          } else {
            setTweets(tweetsData);
          }
        }
      }

      setLoading(false);
    };
  
    getNews();
    
    return () => {
      isMounted = false;
    };
  }, [tab, category]);

  return (
    <div>
      <h2>Top News</h2>

      <div className="tabs">
        <button onClick={() => setTab('news')}>News</button>
        <button onClick={() => setTab('rss')}>RSS Feeds</button>
        <button onClick={() => setTab('tweets')}>Tweets</button>
      </div>

      {tab === 'news' && (
        <div className="filter-container">
          <label htmlFor="category">Select Category: </label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading && <div>Loading...</div>}

      {!loading && tab === 'news' && (
        <div className="news-list">
          {newsArticles.map((article, index) => (
            <div className="news-item" key={index}>
              <img src={article.urlToImage} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div>
      )}

      {!loading && tab === 'rss' && (
        <div className="rss-list">
          {rssFeeds.map((feed, index) => (
            <div className="rss-item" key={index}>
              <h3>{feed.title}</h3>
              <p>{feed.description}</p>
              <a href={feed.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div>
      )}

      {!loading && tab === "tweets" && tweets ? (
        tweets.length > 0 ? (
          <div className="tweets-list">
            {tweets.map((tweet, index) => (
              <div className="tweet-item" key={index}>
                <p>{tweet.text}</p>
                <small>Posted at: {new Date(tweet.created_at).toLocaleString()}</small>
              </div>
            ))}
          </div>
        ) : (
          <div>No tweets found.</div>
        )
      ) : !loading && tab === "tweets" && tweets === null ? (
        <div>❌ Failed to fetch tweets. Please try again later.</div>
      ) : null}
    </div>
  );
};

export default NewsList;
