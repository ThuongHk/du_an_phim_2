import React, { useEffect, useState } from 'react'
import './Detail.scss'
import { NavLink, useParams } from 'react-router-dom'
import { Radio, Space, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { callApiPhimDetail } from '../../redux/quanLyPhimSlice';
import moment from 'moment';


function Detail(props) {
    const { phimDetail } = useSelector(state => state.quanLyFimSlice)
    console.log(phimDetail)
    const dispatch = useDispatch()
    const { id } = useParams()
    const [tabPosition, setTabPosition] = useState('left');
    const changeTabPosition = (e) => {
        setTabPosition(e.target.value);
    };

    useEffect(() => {
        const actionThunk = callApiPhimDetail(id)
        dispatch(actionThunk)

    }, [])

    const tabs = [
        {
            id: 'Lịch chiếu', content: <div className="container bg-white">
                <Tabs
                tabPosition={tabPosition}
                items={phimDetail.heThongRapChieu?.map((item, i) => {
                    const id = String(i + 1);
                    return {
                        label: <div> <img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src={item.logo} alt={item.tenPhim} /> <h5>{item.tenHeThongRap}</h5></div>,
                        key: id,
                        children:  <Tabs
                        tabPosition={tabPosition}
                        items={item.cumRapChieu.map((crc, i) => {
                          const id = String(i + 1);
                          return {
                            label: <div className="mt-1">
                            <div className='grid grid-cols-2 text-left'>
                               <img src={'https://picsum.photos/50/50'} alt='123'/>
                               <h6 className='text-left'>{crc.tenCumRap}</h6>
                            </div>
                            <div className='grid grid-cols-3'>
                                {crc.lichChieuPhim?.map((lc,index)=>{
                                    return <NavLink to={`/checkout/${lc.maLichChieu}`} key={index} className='text-left col-span-1'>{moment(lc.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                                })}
                            </div>
                            </div>,
                            key: id,
                            
                          };
                        })}
                      />
                    };
                })}
            />
            </div>
        },
        { id: 'Thông tin', content: <div className="container bg-white"></div> },
        { id: 'Đánh giá', content: <div className="container bg-white"></div> }
    ];

    return (
        <div style={{ backgroundImage: 'url(https://f4n3x6c5.stackpathcdn.com/UploadFile/eda428/css-image-opacitytransparency/Images/Transparent-Image-in-HTML.png)', minHeight: '100vh', objectFit: 'cover', width: '100%', backgroundSize: '100%' }}>

            <div className="grid grid-cols-12">
                <div className="col-span-4 col-start-4">
                    <div className="grid grid-cols-2  mt-40">
                        <img src={phimDetail.hinhAnh} alt='123' className='z-3' style={{ opacity: '1' }} />
                        <div className='ml-2 justify-center align-items-center text-xl mt-20'>
                            <h5> <b> {phimDetail.tenPhim}</b></h5>
                            <p> {moment(phimDetail.ngayChieu).format('DD.MM.YYYY')}</p>
                            <p className='w-full text-sm leading-3 text-align-jutify text-light mt-2'><b>Mô tả:</b> {phimDetail.moTa}</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-4 text-right ml-20  mt-40'>
                    <div className="c100 p50 big ">
                        <span>50%</span>
                        <div className="slice">
                            <div className="bar" />
                            <div className="fill" />
                        </div>
                    </div>
                </div>


            </div>
            <div className="container mt-5 w-8/12 m-auto bg-white">

                <Tabs
                    defaultActiveKey="1"
                    centered
                    items={tabs.map((item, i) => {
                        const id = String(i + 1);
                        return {
                            label: <h5>{item.id}</h5>,
                            key: id,
                            children: <div className="container  ">{item.content}</div>,
                        };
                    })}
                />




            </div>


        </div>
    )
}

export default Detail
