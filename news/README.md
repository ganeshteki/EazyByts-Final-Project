# **EazyByts News Aggregator - Documentation**

## **1. Project Overview**
EazyByts News Aggregator is a full-stack web application that aggregates and displays news from multiple sources, including RSS feeds and Twitter API. The application consists of a **React frontend** and a **Node.js & Express backend**.

### **Features:**
- Fetches the latest news articles from RSS feeds.
- Retrieves trending tweets related to the news.
- Provides a search functionality for specific news topics.
- Implements caching for performance optimization.
- Supports **dark mode** for better user experience.

---

## **2. Technology Stack**

### **Frontend (React.js)**
- React with functional components
- Redux for state management
- Axios for API requests
- Tailwind CSS for styling
- React Router for navigation

### **Backend (Node.js & Express.js)**
- Express for handling API requests
- Axios for fetching external data
- dotenv for environment variables
- Twitter API for fetching tweets
- CORS for enabling cross-origin requests

---

## **3. Installation & Setup Guide**

### **Prerequisites:**
- Install **Node.js** (Latest LTS recommended)
- Install **npm** (comes with Node.js)
- Install **Git** for version control

### **Clone the Repository**
```bash
 git clone https://github.com/ganeshteki/EazyByts-Final-Project.git
 cd EazyByts-Final-Project
```

---

## **4. Frontend Setup**

### **Steps to Run Frontend**
```bash
 cd news  # Navigate to the frontend directory
 npm install  # Install dependencies
 npm start  # Run the frontend server
```
- The React app should now be running on **http://localhost:3000**



---

## **5. Backend Setup**

### **Steps to Run Backend**
```bash
 cd backend  # Navigate to the backend directory
 npm install  # Install dependencies
```

### **Configure API Keys**
- Create a `.env` file in the **backend directory** and add:
  ```
  BEARER_TOKEN=your_twitter_api_key
  ```

### **Run the Server**
```bash
 node server.js  # Start the backend server
```
- The backend should now be running on **http://localhost:5000**


## **8. Future Enhancements**
- Implement user authentication.
- Add more news sources.
- Improve UI/UX with better design.
- Allow users to save and share news articles.

---

## **9. License**
This project is licensed under the **MIT License**.

For any queries, contact [your email].

