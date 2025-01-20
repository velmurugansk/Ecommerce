import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>,
)
