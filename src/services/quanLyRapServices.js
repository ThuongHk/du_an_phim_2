import { GROUPID } from "../util/settings/config";
import { BasicServices } from "./basicServices";


export class QuanLyRapServices extends BasicServices {
    constructor(){
        super();
    }

    layDanhSachLichChieuHeThongRap = () =>{
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }
    layThongTinHeThongRap = () =>{
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`)
    }
    layThongTinCumRap = (maHeThongRap) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}

export const quanLyRapServices = new QuanLyRapServices()