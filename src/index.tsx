// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './styles/tailwind.css';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);