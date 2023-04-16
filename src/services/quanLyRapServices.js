import { GROUPID } from "../util/settings/config";
import { BasicServices } from "./basicServices";


export class QuanLyRapServices extends BasicServices {
    constructor(){
        super();
    }

    layDanhSachLichChieuHeThongRap = () =>{
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }
}

export const quanLyRapServices = new QuanLyRapServices()