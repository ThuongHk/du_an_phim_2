import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./bannerSlice";
import quanLyNguoiDungSlice from "./quanLyNguoiDungSlice";
import  quanLyFimSlice  from "./quanLyPhimSlice";
import quanLyRapSlice from "./quanLyRapSlice";
import quanLyDatVeSlice from "./quanLyDatVeSlice";
import loadingSlice from "./loadingSlice";



const store = configureStore({
    reducer: {
        bannerSlice,
        quanLyFimSlice,
        quanLyRapSlice,
        quanLyNguoiDungSlice,
        quanLyDatVeSlice,
        loadingSlice
    }
})

export default store