import { Button, Cascader, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, TreeSelect } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GROUPID } from '../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { callApiTTPhimAdmin, callApiThemPhim, callApiUpdatPhim } from '../../../redux/quanLyPhimSlice';
import { useParams } from 'react-router-dom';


const Edit = () => {
  const dispatch = useDispatch()
  const { listPhimAdmin } = useSelector(state => state.quanLyFimSlice);
  
  const [componentSize, setComponentSize] = useState('default');
  const [srcImage, setSrcImage] = useState('')
  const {id} = useParams()


  useEffect(()=>{    
    const actionThunk = callApiTTPhimAdmin(id)
    dispatch(actionThunk)
  },[])

  const formikAddFilm = useFormik({
    enableReinitialize: true,
    initialValues: {
      // maPhim: formikAddFilm.maPhim,
      tenPhim: listPhimAdmin.tenPhim,
      trailer: listPhimAdmin.trailer,
      moTa: listPhimAdmin.moTa,
      ngayKhoiChieu: listPhimAdmin.ngayKhoiChieu,
      dangChieu: listPhimAdmin.dangChieu,
      sapChieu: listPhimAdmin.sapChieu,
      hot: listPhimAdmin.hot,
      danhGia: listPhimAdmin.danhGia,
      hinhAnh: null

    },
    onSubmit: values => {
   
     let formData = new FormData()
     for(let key in values){
      if(key !== 'hinhAnh' ){
       formData.append(key, values[key]);
      }else{ 
        if(values.hinhAnh !== null){
          formData.append('File', values.hinhAnh, values.hinhAnh.name)
        }
       
      }
     }
     dispatch(callApiUpdatPhim(formData))
    }
  })
  // Ngày tháng
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
    formikAddFilm.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)

  }
// switch and number
  const handleChangeSwitch = (name) => {
    return value => {
      formikAddFilm.setFieldValue(name, value)
    }
  }

  const handleChangeInputImg = async (e) => {
    let file = e.target.files[0]      // lấy file ra từ e (một trong các thuộc tính trong sự kiện e) 
    if(file.type === 'image/png' || file.type === 'image/jpg' ){
     await formikAddFilm.setFieldValue('hinhAnh', file)
    let reader = new FileReader()     // tạo đối tượng để đọc file     
    reader.readAsDataURL(file)        // đọc file và trả ulr ra để load 
    reader.onload = (e) => {
      setSrcImage(e.target.result)


    }
  }
  
}
// antd
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };


  return (
    <Form
      onSubmitCapture={formikAddFilm.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input name='tenPhim' onChange={formikAddFilm.handleChange} value={formikAddFilm.values.tenPhim} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name='trailer' onChange={formikAddFilm.handleChange} value={formikAddFilm.values.trailer}/>
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name='moTa' onChange={formikAddFilm.handleChange} value={formikAddFilm.values.moTa} />
      </Form.Item>
      <Form.Item label="DatePicker">
        <DatePicker format='DD/MM/YYYY' onChange={handleChangeDatePicker} value={moment(formikAddFilm.values.ngayKhoiChieu,'DD/MM/YYYY')} />
      </Form.Item>
      <Form.Item label="Select">
        <Form.Item label="Đang chiếu" valuePropName="checked"  >
          <Switch onChange={handleChangeSwitch('dangChieu')} checked={formikAddFilm.values.dangChieu} />
        </Form.Item>
        <Form.Item label="Sắp chiếu " valuePropName="checked"  >
          <Switch onChange={handleChangeSwitch('sapChieu')} checked={formikAddFilm.values.sapChieu} />
        </Form.Item> 
        <Form.Item label="Hot" valuePropName="checked"  >
          <Switch onChange={handleChangeSwitch('hot')} checked={formikAddFilm.values.hot}/>
        </Form.Item>
        <Form.Item label="Danh gia">
          <InputNumber onChange={handleChangeSwitch('danhGia')} checked={formikAddFilm.values.danhGia} />
        </Form.Item>
        <Form.Item label="Hình ảnh" >
          <input type='file' onChange={handleChangeInputImg} accept='image/png, image/jpg' />
          <img src={srcImage==='' ? srcImage.hinhAnh : srcImage} style={{ width: 100, height: 100 }} className='mt-2' />
        </Form.Item>

      </Form.Item>


      <Form.Item label="Button">
        <button type='submit' className='btn btn-outline-primary btn-sm'>Cập nhật</button>
      </Form.Item>
    </Form>
  );
};
export default Edit;