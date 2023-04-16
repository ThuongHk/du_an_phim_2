import { GROUPID } from "../util/settings/config";
import { BasicServices } from "./basicServices";



export class QuanLyFimServices extends BasicServices {
    constructor(){
        super();
    }

    layDanhSachFim = (tenPhim = '') =>{
        if(tenPhim !== ''){
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }
    layThongTinPhim = (maPhim) =>{
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`)
    }
    themPhimUploadHinh = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData)
    }
    layThongTinPhimAdmin = (maPhim) =>{
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
    capNhatPhimUpload = (formData) =>{
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData)
    }
    deletePhimAdmin = (maPhim) =>{
        console.log(maPhim)
        // return this.delete(`/api/QuanLyPhim/XoaPhim?maPhim=${maPhim}`)
    }
}

export const quanLyFimServices = new QuanLyFimServices();