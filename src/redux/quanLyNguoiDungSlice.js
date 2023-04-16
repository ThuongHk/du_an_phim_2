import { createSlice } from '@reduxjs/toolkit'
import {  quanLyNguoiDungServices } from '../services/quanLyNguoiDungServices';
import { ACCESS_TOKEN, USER_LOGIN, history } from '../util/settings/config';


let usLogin = {}
if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}
const initialState = {
    userLogin: usLogin,
    thongTinNguoiDung: {}
}

const quanLyNguoiDungSlice = createSlice({
  name: 'quanLyNguoiDungSlice',
  initialState,
  reducers: {
    loginUser: (state,action)=>{       
        state.userLogin = action.payload
        localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken)
        localStorage.setItem(USER_LOGIN,JSON.stringify(action.payload))
       
    },
    layThongTinND: (state,action) =>{
        state.thongTinNguoiDung = action.payload
    }
  }
});

export const {loginUser,layThongTinND } = quanLyNguoiDungSlice.actions

export default quanLyNguoiDungSlice.reducer

export const userLogin = (thongTinND) =>{
    console.log(thongTinND)
    return async (dispatch) =>{
        try{
             const result = await quanLyNguoiDungServices.dangnhap(thongTinND)
            console.log(result)
             dispatch(loginUser(result.data.content))
             history.push(`/checkout/id`)
        }catch(err){
            console.log(err)
        }
    }
}

export const callApiThongTinNguoiDung = () =>{
    return async (dispatch) =>{
        try{
           const result = await quanLyNguoiDungServices.layThongTinNguoiDung()
          dispatch(layThongTinND(result.data.content))
        }catch(err){
            console.log(err)
                
            }
        }
    }
