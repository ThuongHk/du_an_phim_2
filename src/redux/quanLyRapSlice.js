import { createSlice } from '@reduxjs/toolkit'
import { quanLyRapServices } from '../services/quanLyRapServices';

const initialState = {
  lichChieuHeThongRap: [
    
  ]
}

const quanLyRapSlice = createSlice({
  name: 'quanLyRapSlice',
  initialState,
  reducers: {
    dsRapChieu: (state, action) =>{
      state.lichChieuHeThongRap = action.payload
    }
  }
});

export const {dsRapChieu} = quanLyRapSlice.actions

export default quanLyRapSlice.reducer


export const callApiLichChieuHeThongRap = ()=>{
 return async (dispatch) => {
  try{
    const result = await quanLyRapServices.layDanhSachLichChieuHeThongRap()
     dispatch(dsRapChieu(result.data.content))
   }catch(errors){
     console.log(errors)
   }
 }
}