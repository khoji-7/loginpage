import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/loginPage/loginPage.jsx';
import HomePage from './pages/homePage/homePage.jsx';
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

function App() {
  const token = localStorage.getItem('tokenbek');
  let navigate = useNavigate()
  useEffect(()=>{
    if(token?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")){
      
      navigate("/home")
    }
    else{
      navigate("/")
    }
  },[])
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
      </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
