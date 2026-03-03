import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Apply theme immediately before React renders to prevent flash
const initTheme = () => {
  // Always use browser preference - ignore any stored preference
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  // Apply theme class to HTML element
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
};

// Initialize theme before anything else
initTheme();

// Listen for browser theme changes - always follow browser preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(newTheme);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
