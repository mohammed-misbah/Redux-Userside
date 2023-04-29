import React, { useEffect } from 'react'
import Login from '../components/Login/Login'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    useEffect(() => {
      const Token = localStorage.getItem("token");
      if (Token) {
        navigate("/");
      }
    }, [navigate]);
  return (
    <div>
      <Login/>
    </div>
  )
}

export default LoginPage
