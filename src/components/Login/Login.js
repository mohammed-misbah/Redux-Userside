import React, { useState,useEffect } from 'react'
import './Login.css'
import { useNavigate} from 'react-router-dom';
import axios from "../../utils/axios";
import { loginPost } from "../../utils/Constants";
import { userAction } from "../../redux/usernameSlice"
// import { change } from "../../redux/usernameReducer";
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
// import jwt_decode from "jwt-decode";6
import Cookies from 'js-cookie';
import { userImageAction } from '../../redux/userImageSlice';

function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        const token = Cookies.get('jwt')
        if(token){
          navigate('/')
          }
        },[navigate])

        const handleLogin = (e) =>{
      
            e.preventDefault();
            const body = JSON.stringify({
              email,
              password,
            });
            if (email==='' || password ===''){
                Swal.fire("Please fill the components....")
              } else{
                axios.post(loginPost,body,{
                  headers : {"Content-Type": "application/json"},
                }).then((response)=>{
                  console.log(response.data.status);
                    if (response.data.status ==="Wrong password" || response.data.status === "Email is not found" || response.data.status === "no user" ){
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Email or Password is incorrect",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }else{
                        console.log(response.data.user_jwt);
                        Cookies.set("jwt",String(response.data.user_jwt))
                        Cookies.set("id",String(response.data.id))
                        Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Login Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      if (response.status === 200){
                        console.log(response.data);
                        dispatch(userAction.setUsername(response.data.payload.email));
                        dispatch(userImageAction.setUserImage(response.data.payload.image));
                        navigate("/")
                      }
                      }
                    })
                }
              };
              
    return (
        <div>
  <h1>Welcome To Login Page</h1>
  
  <form class="login-form">
  <label for="email">Email:</label>
  <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
  <label for="password">Password:</label>
  <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
 <button type="button" onClick={handleLogin}>Login</button>
  </form>
</div>

    );
}

export default Login