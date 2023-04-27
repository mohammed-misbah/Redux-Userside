import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { useState } from "react";

// export const fetchUser = createAsyncThunk("cart/fetchUser", async (id)=>{
//     const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
//     return response.data;
// });
const INITIAL_STATE = {
    cartList: [],
    cartCount: 0,
    userDetail:{},
};

const cartSlice = createSlice ({
    name :"cart",
    initialState: INITIAL_STATE,
    reducers: {
        updateUser : (state,action) => {
            state.userDetail.push(action.payload);
        },
        addTocart: (state,action) =>{
            const itemExist = state.cartList.find((item) => item.id === action.payload.id);
            if (itemExist){
                state.cartList.forEach((item) => {
                    if(item?.id === action.payload.id){
                        item.count = 1;
                    }
                   });
                   return;
            } 
                state.cartList.push({
                    ...action.payload,
                    count: 1,
             });
        },
        increment: (state,action) => {
           const productID = action.payload;
           state.cartList.forEach(item => {
            if(item?.id === productID){
                item.count++;
            }
           });
        },
        decrement: (state,action) => {
           const productID = action.payload;
           state.cartList.forEach(item => {
            if(item?.id === productID){
                item.count--;
            }
           })
        },
    },
    // extraReducers:{
    //     [fetchUser.pending]: (state,action) => {
    //     },
    //     [fetchUser.fulfilled]: (state,action) => {    
    //         
    //     },
    //     [fetchUser.rejected]: (state,action) => {
    //     },
    // },
});

export const {increment, decrement, addTocart,updateUser} = cartSlice.actions;

export default cartSlice.reducer;