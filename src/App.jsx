import React from 'react';
import AppRouter from './router/index.jsx';
import Sidebar from './components/sidebar.jsx';

function App() {
  return (
    <div>
      <Sidebar />  
      <AppRouter />
    </div>
  );
}

export default App;
