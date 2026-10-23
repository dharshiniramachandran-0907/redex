// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';

import { store, persistor } from './app/store';

import App from './App';
import './App.css';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <Provider store={store}>
    <PersistGate loading={<p>Loading cart...</p>} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
