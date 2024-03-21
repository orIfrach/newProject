import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from "./LoginForm";
import ErrorPage from "./ErrorPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/LoginForm" element={<LoginForm setLoggedInUser={setLoggedInUser} />} />
        <Route path="/" element ={<LoginForm/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;