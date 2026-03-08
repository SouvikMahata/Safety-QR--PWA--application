// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './components/common/ErrorBoundary';
import './index.css';

// Register PWA service worker
import { registerSW } from 'virtual:pwa-register';
import App from './App';
registerSW({ onNeedRefresh() { }, onOfflineReady() { } });

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
