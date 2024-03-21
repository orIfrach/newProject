import React,{useState,useEffect} from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from "./LoginForm";
import ErrorPage from "./ErrorPage"
import NavBar from './NavBar';
import SignupForm from './SignupForm';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
    <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Routes>
          <Route path="/LoginForm" element={<LoginForm setLoggedInUser={setLoggedInUser} />} />
          <Route path="/" element ={<LoginForm/>} />
          <Route path="/SignupForm" element={<SignupForm/>} />
          <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;