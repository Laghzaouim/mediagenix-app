import ReactDOM from 'react-dom/client';
import {  QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';
import { queryClient } from './api/queryClient';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./api/mocks/browser');
  worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
