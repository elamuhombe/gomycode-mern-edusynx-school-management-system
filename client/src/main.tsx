import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles

// Get the root container element from the DOM
const container = document.getElementById('root');

// Create a root for React to render into
const root = createRoot(container!);

// Render the App component into the root
root.render(<App />);
