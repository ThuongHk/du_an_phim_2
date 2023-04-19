import React, { useEffect, useState } from 'react'
import { quanLyRapServices } from '../../../services/quanLyRapServices'
import { Button, Select, Form,DatePicker, InputNumber } from 'antd';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';
import { quanLyDatVeServices } from '../../../services/quanLyDatVeServices';

function ShowTime() {
  const {id} = useParams()
  // console.log(id)
 
  const [state, setState] = useState({
     thongTinHeThongRap: [],
     cumRapChieu: []
  })
//  4. Dùng formik lấy dữ liệu call Api gửi lên server

const formik = useFormik({
  initialValues: {
    maPhim: id,
    ngayChieuGioChieu: '',
    maRap: '',
    giaVe: ''

  },
  onSubmit: async  (values) =>{
   try{
      const result = await quanLyDatVeServices.taoLichChieu(values)
     console.log(result)
   }catch(err){
    console.log(err.response.data);
   }
  }

})
 

// 3. Từ event của select filte Hệ thống rạp, khi user select, call Api lấy thông tin cụp rạp trong onChange
  const onChangeSelect = async (value) =>{
    try{
        const result = await quanLyRapServices.layThongTinCumRap(value)
        setState({ 
          ...state,
          cumRapChieu: result.data.content
        })
    }catch(err){
      console.log(err.response.data);
    }
  }

  const handleChangeMaCumRap = (value) =>{
     formik.setFieldValue('maRap', value )
  }

 const onChangeDate = (value) =>{
     formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss') )
 }

 const onOk = (value) => {
  formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss') )
};

const onChangeInputNumber =(value)=>{
formik.setFieldValue('giaVe', value)
}


 
 
// 1. viết function call Api lấy thông tin hệ thống rạp
  const layThongTinRap = async ()=> {    
      try{
        let result = await quanLyRapServices.layThongTinHeThongRap()
       
        setState({ 
          ...state,
          thongTinHeThongRap: result.data.content
        })
       }catch(err){
        console.log(err.response.data)
       }
     }
   
// 2. khi page vừa bật lên thì dùng useEffect gọi hàm
  useEffect( () =>{
    layThongTinRap()
  },[])

  const heThongRap = () =>{
    return state.thongTinHeThongRap?.map((htr,index)=>{
      return {label: htr.tenHeThongRap, value: htr.maHeThongRap}
    })
  }
  const cumRap = () =>{
    return state.cumRapChieu?.map((cr,index)=>{
      return {label:cr.tenCumRap, value: cr.maCumRap}
    })
  }
 
  
  return (
    <div className='w-50 m-auto'>
      <h1 className='text-center mb-4 h2'>Tạo Lịch Chiếu</h1>
       <Form name="basic" onSubmitCapture={formik.handleSubmit}>
    <Form.Item label="Hệ thống rạp" >
    <Select options={heThongRap()} onChange={onChangeSelect} />
    </Form.Item>
    <Form.Item label="Rạp" >
    <Select options={cumRap()} onChange={handleChangeMaCumRap} />
    </Form.Item>
    <Form.Item label="Ngày chiếu giờ chiếu" >
    <DatePicker showTime onChange={onChangeDate} onOk={onOk} />
    </Form.Item>
    <Form.Item label="Giá vé" >
    <InputNumber min={1} max={10} defaultValue={0} onChange={onChangeInputNumber} />
    </Form.Item>
   
     <Button className='btn btn-outline-primary btn-sm' htmlType="submit">Tạo Lịch Chiếu</Button> 
    </Form>

    </div>
  )
}

export default ShowTime
