import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callApiLayDanhSachPhongVe, callApiDatVe, themVePhim } from "../../redux/quanLyDatVeSlice";
import { ACCESS_TOKEN, USER_LOGIN, history } from "../../util/settings/config";
import { CloseOutlined, HomeOutlined } from '@ant-design/icons'
import './Checkout.scss'
import clsx from "clsx";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
// antd
import { Tabs } from 'antd';
import { callApiThongTinNguoiDung } from "../../redux/quanLyNguoiDungSlice";
import moment from "moment";
import _ from "lodash";
const onChange = (key) => {
  console.log(key);
};


export function Checkout(props) {
  const { danhSachPhongVe, dsGheDangDat } = useSelector(state => state.quanLyDatVeSlice)


  const { danhSachGhe, thongTinPhim } = danhSachPhongVe
  console.log(danhSachGhe)

  const { id } = useParams()
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))


  const dispatch = useDispatch()
  useEffect(() => {
    const actionThunk = callApiLayDanhSachPhongVe(id)
    dispatch(actionThunk)
  }, [])
  const renderSeats = () => {
    return danhSachGhe?.slice(0, 100).map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
      let classGheDangDat = '';

      let findIndex = dsGheDangDat.findIndex(g => g.maGhe === ghe.maGhe)
      if (findIndex != -1) {
        classGheDangDat = 'gheDangDat'
      }

      return <Fragment key={index}>

        <button onClick={() => { dispatch(themVePhim(ghe)) }}
          disabled={ghe.daDat} className={`ghe  ${classGheVip} ${classGheDangDat} ${classGheDaDat}   `}>{ghe.daDat ? <CloseOutlined /> : ghe.stt}</button>
        {(index + 1) % 10 === 0 ? <br /> : ''}

      </Fragment>
    })
  }
  return (
    <div className='row'>

      <div className="col-8">
        <div className="container w-100 m-auto">
          <div className="bg-dark m-auto mt-5" style={{ height: '15px', width: '80%', boxShadow: '0px 10px 5px 9px gray' }}>
          </div>
          <h5 className="text-center opacity-30">Màn hình</h5>
          <div className="row">
            <div className="text-center m-auto mt-5">
              {renderSeats()}
            </div>
          </div>
        </div>
        <div className="container mt-4">

          <table className='table table-borderless' style={{ width: '80%', margin: 'auto' }}>
            <thead>
              <tr>
                <th>Ghế thường</th>
                <th>Ghế vip</th>
                <th>Ghế đã đặt</th>
                <th>Ghế đang đặt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><button className='ghe'>ghế</button></td>
                <td><button className='ghe gheVip'>ghế</button></td>
                <td><button className='ghe gheDaDat'>ghế</button></td>
                <td><button className='ghe gheDangDat'>ghế</button></td>
              </tr>
            </tbody>

          </table>
        </div>

      </div>
      <div className="col-4">
        <h1 className="text-center text-success my-3 h1">{dsGheDangDat.reduce((total, ghe) => { return total += ghe.giaVe }, 0).toLocaleString()}đ</h1>
        <hr />
        <div className="my-3">
          <h5 className='h4'>{thongTinPhim?.tenCumRap}</h5>
          <p><b>Địa điểm: {thongTinPhim?.diaChi}</b></p>
          <p><b>Ngày chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</b></p>
        </div>
        <hr />
        <div className="d-flex justify-around my-3">
          <h5 className="pr-5 text-danger">Ghế: {dsGheDangDat.map((i, index) => {
            return <span className="text-success mr-1" key={index}><b>{i.stt}</b></span>
          })}</h5>
          <h5 className="text-success">{dsGheDangDat.reduce((total, ghe) => { return total += ghe.giaVe }, 0).toLocaleString()} đ</h5>
        </div>
        <hr />
        <div className="my-3">
          <p><b><i>Email</i></b></p>
          <p><b>{userLogin.email}</b></p>
        </div>
        <hr />
        <div className="my-3">
          <p><b><i>Phone</i></b></p>
          <p><b>{userLogin.soDT}</b></p>
        </div>
        {/* <hr/> */}

        <div onClick={() => {
          const thongTinDatVe = new ThongTinDatVe()
          thongTinDatVe.maLichChieu = id
          thongTinDatVe.danhSachVe = dsGheDangDat
          dispatch(callApiDatVe(thongTinDatVe))
        }} className="cursor-pointer h5 align-items-center justify-content-center text-light  bg-success text-center py-3 ">
          ĐẶT VÉ
        </div>

      </div>
    </div>
  );
}


const items = [

  {
    key: '1 ',
    label: `1 CHỌN GHẾ & THANH TOÁN`,
    children: <Checkout />,
  },
  {
    key: '2',
    label: `2 KẾT QUẢ ĐẶT VÉ`,
    children: <KetQuaDatVe />,
  }


];


const PhongVe = () => {
  // tabBarExtraContent của antd
  const operations = <div className='d-flex'> <button className='btn btn-outline-primary' onClick={() => {
    localStorage.removeItem(USER_LOGIN)
    localStorage.removeItem(ACCESS_TOKEN)
    history.push('/login')
    window.location.reload()
  }}>Đăng xuất</button>
    <div style={{ fontSize: '25px', lineHeight: '25px', marginLeft: '15px' }}><NavLink to='/'><HomeOutlined /></NavLink></div>
  </div>
  //  tabBarExtraContent end

  const { toggleTab } = useSelector(state => state.quanLyDatVeSlice)
  console.log(toggleTab)
  return <div className="container">
   
    <Tabs defaultActiveKey={toggleTab} items={items} onChange={onChange} tabBarExtraContent={operations} />
  </div>;
}

export default PhongVe;


export function KetQuaDatVe(props) {
  const dispatch = useDispatch()
  const { thongTinNguoiDung } = useSelector(state => state.quanLyNguoiDungSlice);

  console.log(thongTinNguoiDung)
  useEffect(() => {
    const actionthunk = callApiThongTinNguoiDung()
    dispatch(actionthunk)
  }, [])

  const renderTTDV = () => {
    return thongTinNguoiDung.thongTinDatVe?.map(ve => {
      return <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ve.hinhAnh} />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">{ve.tenPhim}</h2>
            <p className="text-gray-500">Ngày chiếu: {moment(ve.ngayDat).format('DD-MM-YYYY')} - Giờ chiếu: {moment(ve.ngayDat).format('hh:mm A')}</p>
            <p>Tên hệ thống rạp: {_.first(ve.danhSachGhe).tenHeThongRap} - Cụm rập: {_.first(ve.danhSachGhe).tenCumRap}</p>
          </div>
        </div>
      </div>
    })
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch sử đặt vé</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
        </div>
        <div className="flex flex-wrap -m-2">
          {renderTTDV()}

        </div>
      </div>
    </section>

  )
}