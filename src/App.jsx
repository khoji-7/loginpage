import React from 'react';
import AppRouter from './router/index.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <div>
      <ToastContainer />
      <AppRouter />
    </div>
  );
}

export default App;
