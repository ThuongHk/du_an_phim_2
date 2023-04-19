import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quanLyFimServices } from '../services/quanLyPhimServices';

const initialState = {
    arrFim: [
        {
            "maPhim": 11078,
            "tenPhim": "Avatar: Dòng chảy của nước 4",
            "biDanh": "avatar-dong-chay-cua-nuoc-4",
            "trailer": "https://www.youtube.com/watch?v=gq2xKJXYZ80",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/avatar-dong-chay-cua-nuoc_gp01.jpg",
            "moTa": "avartar 2 dong chay nuoc",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2023-03-10T11:09:24.35",
            "danhGia": 8,
            "hot": false,
            "dangChieu": true,
            "sapChieu": false
          }
    ],
    phimDetail: {},
    listPhimAdmin: {}
   
}

const quanLyFimSlice = createSlice({
  name: 'quanLyFimSlice',
  initialState,
  reducers: {
    getListFim: (state, action) =>{
     
        state.arrFim = action.payload
    },
    changePhimDC: (state, action) =>{
      state.arrFim = state.arrFim.filter(item => item.dangChieu === action.payload)
    },
    changePhimSC: (state, action) =>{
      state.arrFim = state.arrFim.filter(item => item.sapChieu === action.payload)
    },
    thongTinPhim: (state, action) =>{
       state.phimDetail = action.payload
    },
    thongTinPhimAdmin: (state, action) =>{
      state.listPhimAdmin = action.payload
    }
  }
});

export const {getListFim, changePhimDC, changePhimSC, thongTinPhim, thongTinPhimAdmin} = quanLyFimSlice.actions

export default quanLyFimSlice.reducer

export const layDanhSachFim = (tenPhim = '') =>{  // slice
  return async dispatch => { 
     try{
     const result = await quanLyFimServices.layDanhSachFim(tenPhim);
    
      dispatch(getListFim(result.data.content))
    }catch(err) {
        console.log(err);
    }
}}

export const callApiPhimDetail = (id) => {  // detail
  return async (dispatch) => {
    try{
           const result = await quanLyFimServices.layThongTinPhim(id)
           dispatch(thongTinPhim(result.data.content))
    }catch(err){
      console.log(err);
    }
  }
}

export const callApiThemPhim  = (formData) =>{    // admin
    return async (dispatch) => {
       
      try{
        const result = await quanLyFimServices.themPhimUploadHinh(formData)
        console.log(result)
      }catch(err){
        console.log(err.response.data);
      }

    }
}

export const callApiTTPhimAdmin = (maPhim) =>{  // tt phim admin
  return async (dispatch) =>{
    try{
       const result = await quanLyFimServices.layThongTinPhimAdmin(maPhim)
      dispatch(thongTinPhimAdmin(result.data.content))
    }catch(err){

    }
  }
}
export const callApiUpdatPhim = (formData) =>{  // update admin
  return async dispatch =>{
    try{
      const result = await quanLyFimServices.capNhatPhimUpload(formData)
      alert('Cập nhật thành công!')
      console.log(result)

    }catch(err){
      console.log(err);
    }
  }
}

export const callApiDeletePhim = (maPhim) =>{
  
  return async (dispatch) =>{
    try {
       const result = await quanLyFimServices.deletePhimAdmin(maPhim)
     alert('Xoa phim thanh cong')
     dispatch(layDanhSachFim())
    }catch(err) {
      console.log(err);
    }
  }
}