import React ,{ Fragment, useEffect, useState } from "react";
import './UserList.css';
// import './users.css';
import Footer from  './Footer/Adminfooter';
// import Header from './Header/AdminHeader';
import Swal from 'sweetalert2';
import AdminHeader from "./Header/AdminHeader";
import { useNavigate } from "react-router-dom";
import { adminUserList ,adminDeleteUser} from "../../utils/Constants";
import axios from '../../utils/axios';
import Cookies from "js-cookie";

function UserList() {
    const navigate = useNavigate()
    const [users,setUsers] = useState([])
    const [records, setRecords] = useState([])

    useEffect (()=>{
        const token = Cookies.get('admin_jwt')
            if (token){
          console.log('i am in the user list section',token);
                navigate('/userlist')
          getUserList();
            }
        else{
          navigate('/adminlogin')
        }
      },[navigate])
      const getUserList=()=>{
        axios.get(adminUserList).then((response)=>{
          setUsers(response.data)
        }).catch((err=>
          console.log("error")))
      }
      const deleteUser=(id)=>{
        console.log(id,"idddddd")
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes,delete it!'
        }).then((result)=>{
          if (result.isConfirmed){
            axios.get(`${adminDeleteUser}/${id}`).then((response)=>{
              getUserList();
            })
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            )
          }
        })
      }
      function handleFilter(e) {

    
        const newData = users.filter((user) => {
       
          return user.full_name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setRecords(newData);
      }

  return (
    <Fragment>
    <div className="userlist">
      <AdminHeader />
      <br />
      {/* <br /> */}
      {/* <button onClick={() => {console.log(users);}}>dfsdfsdfd</button> */}
    
      <div className="searchInput" >
      <input type="text" placeholder="Search User" onChange={handleFilter} />
</div>
      <button className="addButtonAdmin" onClick={()=>navigate(`/adminAddUser`)}>Add</button>
      <br />
 
      <button className="addButtonAdmin" onClick={()=>navigate(`/adminAddUser`)}>Add</button>
        <table id="customers">
        <tr>
            <th className="w-5">No</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Action</th>
            <th>Action</th>
        </tr>                 
        {records.length > 0
        ? records.map((user,index)=>(
          <tr>
          <td>{index+1}</td>
          <td>{user.full_name}</td>
          <td>{user.email}</td>
          <td>
            <button  onClick={()=>navigate(`/updateUser/${user.id}`)}>Edit</button>
          </td>
          <td> 
            <button  onClick={()=>deleteUser(user.id)}>Delete</button>
          </td>
          </tr>
          )):users.map((user,index)=>(
            <tr className="tablefont">
            <td>{index+1}</td>
            <td>{user.full_name}</td>
            <td>{user.email}</td>
            <td>
              <button  onClick={()=>navigate(`/updateUser/${user.id}`)}>Edit</button>
            </td>
            <td> 
              <button  onClick={()=>deleteUser(user.id)}>Delete</button>
            </td>
            </tr>
  
          ))
        }
  
          </table>
      </div>
          <Footer />
      </Fragment>
  )
}

export default UserList
