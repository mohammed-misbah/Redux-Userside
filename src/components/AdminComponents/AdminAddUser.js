import React ,{ useState } from'react';
import Footer from './Footer/Adminfooter';
import AdminHeader from './Header/AdminHeader';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import Swal from 'sweetalert2';
import { userSignUp } from '../../utils/Constants';

function AdminAddUser(){
  const navigate = useNavigate();
  const [full_name,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit=(e)=>{
    e.preventDefault()
    const body =JSON.stringify({
      full_name,
      email,
      password
    });
    axios.post(userSignUp,body,{
      headers:{"Content-Type": "application/json"},
    }).then((response)=>{
      console.log(response.status)
      if (response.status === 201){
        navigate("/userlist")
      } else{
        Swal.fire({
          position: "center",
          icon: "warning",
          title: response.data.error,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }).catch((error)=>{
      Swal.fire({
        position: "center",
        icon: "warning",
        title: error.data.error,
        showConfirmButton: false,
        timer: 1500,
      });
    })
  };

  return(
    <div>
      <AdminHeader />
      <form className='updateForm' onSubmit={(e)=>handleSubmit(e)} >
        <div className="container1">
          <h1>ADD USER</h1>
          <label for="username"><b>Fullname</b></label>
          <input
            type="text"
            placeholder="Enter username"
            value={full_name}
            onChange={(e) => setUserName(e.target.value)}
            id="username"
            required=""
          />

          <label for="email"><b>Email</b></label>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required=""
          />
          
          <label for="email"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required=""
          />
          <button type="submit">Add User</button>
        </div>
      </form>
      <Footer />
    </div>
  )
}


export default AdminAddUser