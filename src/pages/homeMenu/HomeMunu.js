import React from 'react'
import { Radio, Space, Tabs } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

const HomeMenu = ({ lichChieuHeThongRap }) => {
   console.log(lichChieuHeThongRap)
  const [tabPosition, setTabPosition] = useState('left');
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const tabs = [
    { id: 1, content: 'content1' },
    { id: 2, content: 'content2' },
    { id: 3, content: 'content3' }
  ];

  return (
    <div>

      <Tabs
        tabPosition={tabPosition}
        items={lichChieuHeThongRap.map((htr, index) => {
          return {
            label: <img key={index} src={htr.logo ? htr.logo : require('../../assets/img/hd.jpg')} alt='123' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />,
            key: index,
            children: <Tabs 
              tabPosition={tabPosition}
              items={htr.lstCumRap.slice(0, 5).map((cr, index) => {
                return {
                  label: <div key={index}><img src={cr.hinhAnh ? cr.hinhAnh : require('../../assets/img/hd.jpg')} alt='123' style={{ width: '50px', height: '50px' }} /> <h6>{cr.tenCumRap}</h6> </div>,
                  key: index,
                  children: <Tabs 
                    tabPosition={tabPosition}
                    items={cr.danhSachPhim.slice(0, 3).map((phim, index) => {
                      return {
                        label: <div key={index} className='d-flex w-full'>
                          <img src={phim.hinhAnh} alt='123' style={{ width: '50px', height: '50px' }} onError={(e) => (e.target.onerror = null)((e.target.src = "https://cf.shopee.vn/file/a2f1755308884a6e097e2d354bf32734"))} />
                          <div className='text-left ml-2'>
                            <h4>{phim.tenPhim}</h4>
                            <h5>{cr.diaChi}</h5>
                            <div className="grid grid-cols-6 gap-2">{phim.lstLichChieuTheoPhim?.map((gio, index) => { return <NavLink key={index} to={`/checkout/${gio.maLichChieu}`}>{moment(gio.ngayChieuGioChieu).format('DD:MM:YYYY A')}</NavLink> })}</div>
                          </div>
                        </div>,
                        key: phim.id,
                        // children: '123'
                      };
                    })}
                  />



                };
              })}
            />


          };
        })}
      />


    </div>
  )
}

export default HomeMenu


