import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Signup.css'
import { signUpPost } from "../../utils/Constants";
import Swal from "sweetalert2";
// import axios from 'axios';
import axios from "../../utils/axios";

function Signup() {

    const [full_name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      const body = JSON.stringify({
        full_name,
        email,
        password,
      });
      e.preventDefault();
      axios
        .post(signUpPost, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.status)
          console.log(response.data);
          if (response.status === 201) {
            navigate("/login");
          } else {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: response.data.error,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: err.data.error,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      };
      return (
        <div className="signup-page">
       <h1>Sign up</h1>
       <form onClick={handleSubmit} >
         <label htmlFor="full_name">Username</label>
         <input 
           type="text"
           id="full_name"
           value={full_name}
           onChange={(event) => setUsername(event.target.value)}
           required
         />
         <label htmlFor="email">Email</label>
         <input 
           type="email"
           id="email"
           value={email}
           onChange={(event) => setEmail(event.target.value)}
           required
         />
         <label htmlFor="password">Password</label>
         <input 
           type="password"
           id="password"
           value={password}
           onChange={(event) => setPassword(event.target.value)}
           required
         />
         <button type="submit">Sign up</button>
       </form>
     </div>
   )
 }
 
 export default Signup