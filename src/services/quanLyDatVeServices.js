import { BasicServices } from "./basicServices";



export class QuanLyDatVeServices extends BasicServices {
    constructor(){
        super();
    }
    layDanhSachPhongVe = (maLichChieu) =>{
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }
    datVe = (thongTinDatVe) =>{
        return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe)
    }
    taoLichChieu = (thongTinLC) =>{
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLC)
    }
}

export const quanLyDatVeServices = new QuanLyDatVeServices()