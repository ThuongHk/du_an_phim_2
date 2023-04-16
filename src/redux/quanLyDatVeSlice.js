import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quanLyDatVeServices } from '../services/quanLyDatVeServices';
import { toggleLoading } from './loadingSlice';

const initialState = {
  danhSachPhongVe: {},
  dsGheDangDat: [],
  toggleTab: '1'

}

const quanLyDatVeSlice = createSlice({
  name: 'quanLyDatVeSlice',
  initialState,
  reducers: {
    layDanhSachPhongVe: (state, action) => {
      state.danhSachPhongVe = action.payload
    },
    themVePhim: (state, action) => {
      let dsGheCapNhat = [...state.dsGheDangDat]
      let findIndex = dsGheCapNhat.findIndex(ghecn => ghecn.maGhe === action.payload.maGhe)
      if (findIndex != -1) {
        dsGheCapNhat.splice(findIndex, 1)
      } else {
        dsGheCapNhat.push(action.payload)
      }
      state.dsGheDangDat = dsGheCapNhat
    },
    clearDsGheDangDat: (state, action) =>{
      state.dsGheDangDat = action.payload
    },
    toggleTabs: (state, action)=>{
      state.toggleTab = action.payload
    }
  }

});

export const { layDanhSachPhongVe, themVePhim, clearDsGheDangDat, toggleTabs } = quanLyDatVeSlice.actions

export default quanLyDatVeSlice.reducer



export const callApiLayDanhSachPhongVe = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeServices.layDanhSachPhongVe(id)
      dispatch(layDanhSachPhongVe(result.data.content))
    } catch (err) {
      console.log(err)
    }
  }
}
export const callApiDatVe = (thongTinDatVe) => {
  return async (dispatch) => {
    try {
      await dispatch(toggleLoading(true))
      const result = await quanLyDatVeServices.datVe(thongTinDatVe)
      await dispatch(toggleTabs('2'))
      console.log(result)
    } catch (err) {
      console.log(err)
    }
      await dispatch(callApiLayDanhSachPhongVe(thongTinDatVe.maLichChieu))
      await dispatch(toggleLoading(false))
      await dispatch(clearDsGheDangDat([]))
      
  }
}
