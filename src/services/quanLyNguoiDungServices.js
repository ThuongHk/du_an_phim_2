import { BasicServices } from "./basicServices";


export class QuanLyNguoiDungServices extends BasicServices {
      constructor(){
        super();
      }
    dangnhap = (thongTinND) =>{
      return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinND)
    }
    layThongTinNguoiDung = () =>{
      return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }

}

export const quanLyNguoiDungServices = new QuanLyNguoiDungServices();