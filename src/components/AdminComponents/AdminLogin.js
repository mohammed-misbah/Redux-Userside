import React, {useEffect, useState}from 'react'
import { adminLogin } from '../../utils/Constants';
import { userAction } from '../../redux/usernameSlice';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import axios from '../../utils/axios';
import Cookies from 'js-cookie';
import './AdminLogin.css'

function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("");

    useEffect (() =>{
        const token = Cookies.get ('admin_jwt')
        if (token){
            navigate('/userlist')
        }
    },[navigate])
    // checking a condition
    const handleAdminLogin = (e) =>{
        e.preventDefault();
        const body = JSON.stringify({
            email,
            password,
        });
        // print pop up
        if (email === " " || password === " "){
            Swal.fire(
                'Please fill the components..',
            )
        }else{
            axios.post(adminLogin,body,{
                headers:{"Content-Type":"application/json"},
            }).then((response)=>{
                // console.log(response);
                if (response.data.status === 'Wrong Password' || response.data.status === "Email or Password is Wrong" || response.data.status === "not admin"){
                    // Email password incorrect print as pop up
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Email or Password is incorrect",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }else{
                        Cookies.set("admin_jwt",String(response.data.admin_jwt))
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login Successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        if (response.status === 200 ){
                            dispatch(userAction.setUsername(response.data.payload.email))
                            navigate("/userlist");
                        }
                    }
                })
            }
          };
  return (
    <form onSubmit={(e) => handleAdminLogin(e)} class='login-form'>
        <h1>Admin Login</h1>
        <div className='input-fields'>
            <input type="email" name="email" value={email}
            onChange={(e) => setEmail(e.target.value)} class="input-box"/>
            <p>Admin Email </p>
        </div>
        <div className="input-fields">
            <input type="password" name="password" value={password}
                onChange={(e) => setPassword(e.target.value)} class="input-box"/>
            <p>Password</p>
        </div>
        <input type="submit" value="Login" class="btn" />
    </form>
  )
}

export default AdminLogin
