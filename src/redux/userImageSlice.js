import { createSlice } from "@reduxjs/toolkit";
// import { Navigate, useNavigate} from "react-router-dom";
// import Cookies from "js-cookie";

const name = "image"
const initialState = createInitialState();
const reducers = createReducers();

const userImageslice = createSlice({
    name,
    initialState,
    reducers
  })

function createInitialState(){
    return {
      value: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
}

function createReducers(){
    return {
      setUserImage,
    }
    function setUserImage(state, action){
      console.log(state.value,"state.value")
      console.log(action.payload,"pppppppppppp.value")
      state.value = action.payload;
    }
}
  
export const userImageAction = {...userImageslice.actions}
export const userImageReducers = userImageslice.reducer
export default userImageReducers