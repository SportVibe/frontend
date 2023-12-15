import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import store from './redux/store';
import App from './App';

import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider domain='sportvibe.us.auth0.com' 
    clientId='VJvDwdnCWBZmJgqm6LjxvNc6HWCFIOIj' 
    authorizationParams={{
      redirect_uri: window.location.origin,
     // audience:"this is a unique identifier",
    }}
    scope='openid email profile'
    >

    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    </Auth0Provider>
  </React.StrictMode>
);