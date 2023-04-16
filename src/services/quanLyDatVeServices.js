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
}

export const quanLyDatVeServices = new QuanLyDatVeServices()