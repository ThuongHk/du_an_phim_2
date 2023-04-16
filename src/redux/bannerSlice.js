import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  listBanner: [
    {
      "maBanner": 1,
      "maPhim": 1282,
      "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png"
    },
  ]
}
 


const bannerSlice = createSlice({
  name: 'bannerSlice',
  initialState,
  reducers: {
    listBannerReducer: (state, action) =>{
      state.listBanner = action.payload
    }
  }
});

export const { listBannerReducer } = bannerSlice.actions

export default bannerSlice.reducer



export const callApiBannerSlice = () =>{
  return async dispatch => {
    try{
        const result = await axios({
          url: 'https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner'
        })
        const action = result.data.content
        dispatch(listBannerReducer(action))
    }catch(err){
      console.log(err);
    }
  }
}