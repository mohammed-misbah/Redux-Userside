import React,{useEffect,useState} from 'react'
import AdminHeader from './Header/AdminHeader';
import Footer from './Footer/Adminfooter';
import { useNavigate, useParams } from 'react-router-dom';
import { adminEditUser, adminUpdateUser, } from '../../utils/Constants';
import axios from '../../utils/axios';
import Swal from 'sweetalert2';
import './UpdateUser.css'

function UpdateUser() {
    const params = useParams();
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`${adminEditUser}/${params.id}`).then((response)=>{
            console.log(response.data.id);
            setUserName(response.data.full_name)
            setEmail(response.data.email)
        }).catch((error)=>{
            alert(error)
        })
    },[])
    const handleUpdateDetails =(e)=>{
        e.preventDefault(e);
        const body = {
          username : username,
          email : email
        }
        const swalWithBootstrapButtons = Swal.mixin({ 
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,Update it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result)=>{
            if (result.isConfirmed){
            //   console.log('yyyyyyyyyyyyyy')
              if (body.email === '' || body.name === ''){
                Swal.fire(
                  'Please Fill the components?',
                  'That thing is still around?',
                  'question'
                )
            }else{
                axios.put(`${adminUpdateUser}/${params.id}`,body,{
                  headers: { "Content-Type": "application/json" } 
                }).then((response)=>{
                  if (response.data.userexists){
                    Swal.fire({
                      title: 'Oops...USER EXISTS',
                      text: "try again",
                  })
                  }else{
                    swalWithBootstrapButtons.fire(
                      'Updated!',
                      'User file has been Updated.',
                      'success'
                    )
                    navigate('/userlist')
                  }
                }).catch((err)=>{
                  Swal.fire({
                    title: 'Oops...',
                    text: "try again",
                      height: "5rem",
                })
                })
              }
            }else if(
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'User is not updated:)',
                  'error',
                )
              }
            })
          };
  return (
    <div>
      <AdminHeader /> 
      <form className='updateForm' onSubmit={(e)=>handleUpdateDetails(e)}>
        <div className='container1'>
          <h1>UPDATE USER</h1>
          <label for="username"><b>Username</b></label>
          <input 
          type="text"  
          placeholder ="Enter username" 
          value={username} 
          onChange={(e)=>setUserName(e.target.value)}
          id="username" 
          required=""/>
          
          <label for="username"><b>Email</b></label>
          <input 
          type="text"  
          placeholder ="Enter email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
          id="email" 
          required=""/>

          <button type="submit">Update User</button>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default UpdateUser
