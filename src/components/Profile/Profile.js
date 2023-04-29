import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { verifyToken, addImage } from "../../utils/Constants";
import axios from '../../utils/axios';
import './Profile.css';
// import styles from './Profile.module.css';
import Swal from "sweetalert2";

import Cookies from 'js-cookie';
import { userAction } from '../../redux/usernameSlice';
import { userImageAction } from '../../redux/userImageSlice';

function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [email, setemail] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        const token = Cookies.get('jwt');
        if (!token) {
          navigate('/login');
    
        } else {
          const body = JSON.stringify({ token });
          axios.post(verifyToken, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
            // if (res.data.token) {
            console.log(res)
            setName(res.data.full_name)
            setemail(res.data.email)
            setImage(res.data.image)
            dispatch(userAction.setUsername(res.data.full_name))
            dispatch(userImageAction.setUserImage(res.data.image))
            // }
    
          })
        }

    }, [navigate, dispatch]);

    const Image = useSelector((state) => state.userImage.value);
  console.log(Image, '+++++++++');

  const userImage = async () => {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })

    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          Swal.fire({
            title: "img",
            imageUrl: e.target.result,
            imageHeight: 400,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Update',
            denyButtonText: `Change`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              uploading(file)
  
            } else if (result.isDenied) {
              userImage()
            }
          })
        }
        reader.readAsDataURL(file)
      }
      function uploading(file) {
        console.log(Cookies);
        const Token2 = Cookies.get("id");
        // const Stoken = JSON.stringify({Token2});
        let formData = new FormData();
        formData.append("image", file)
        axios.post(`${addImage}/${Token2}`, formData)
          .then((res) => {
            console.log(res.data, 'llllllllllll');
            console.log(res.data.image, 'kkkkkkkkkkkkkkkkkk');
            dispatch(userImageAction.setUserImage('http://127.0.0.1:8000' + res.data.image))
            navigate('/profile')
          }).catch((err) => {
            console.log(err);
          })
      }
    }
    return ( 
        <div className='profile-container' >
<div>
<img class="rounded-circle profile-img" onClick={userImage} width="150" src={'http://127.0.0.1:8000/' +image} alt="Profile Photo" />
</div>
  <div className='labell'>
    {/* <div className='label-field'>
      Name:
    </div> */}
    <div className='label-value'>
      {name}
      
    </div>
  </div>
  <div className='labell'>
    {/* <div className='label-field'>
      Email:
    </div> */}
    <div className='label-value'>
      {email}
      
    </div>
  </div>
</div>

  )
}

export default Profile 
  
