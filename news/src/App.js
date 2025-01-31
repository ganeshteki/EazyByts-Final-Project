import React, { useState,useEffect} from 'react';
import NewsList from './components/NewsList';
import './App.css';  // Import the CSS file

function App() {
  // Define the state for dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Define the function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  //Apply or remove the dark class on body when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);
  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <header>
        <h1>News Aggregator</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>
      <NewsList />
    </div>
  );
}

export default App;
