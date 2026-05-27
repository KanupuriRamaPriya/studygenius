
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style.css';

// Ensure this matches the ID in your index.html exactly
ReactDOM.createRoot(document.getElementById('App')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);