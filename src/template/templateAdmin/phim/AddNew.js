import { Button, Cascader, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, TreeSelect } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { GROUPID } from '../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { callApiThemPhim } from '../../../redux/quanLyPhimSlice';


const AddNew = () => {
  const dispatch = useDispatch()
  const [componentSize, setComponentSize] = useState('default');
  const [srcImage, setSrcImage] = useState('')

  const formikAddFilm = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: '',
      sapChieu: '',
      hot: '',
      danhGia: 0,
      hinhAnh: {}


    },
    onSubmit: values => {
     console.log(values)
     let formData = new FormData()
     for(let key in values){
      if(key !== 'hinhAnh' ){
       formData.append(key, values[key]);
      }else{
        formData.append('File', values.hinhAnh, values.hinhAnh.name)
      }
     }
     dispatch(callApiThemPhim(formData))
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

  const handleChangeInputImg = (e) => {
    let file = e.target.files[0]      // lấy file ra từ e (một trong các thuộc tính trong sự kiện e) 
    if(file.type === 'image/png' || file.type === 'image/jpg' ){
    let reader = new FileReader()     // tạo đối tượng để đọc file 
    reader.readAsDataURL(file)        // đọc file và trả ulr ra để load 
    reader.onload = (e) => {
      setSrcImage(e.target.result)
    }
  }
  formikAddFilm.setFieldValue('hinhAnh', file)
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
        <Input name='tenPhim' onChange={formikAddFilm.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name='trailer' onChange={formikAddFilm.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name='moTa' onChange={formikAddFilm.handleChange} />
      </Form.Item>
      <Form.Item label="DatePicker">
        <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
      </Form.Item>
      <Form.Item label="Select">
        <Form.Item label="Đang chiếu" valuePropName="checked" >
          <Switch onChange={handleChangeSwitch('dangChieu')} />
        </Form.Item>
        <Form.Item label="Sắp chiếu " valuePropName="checked" >
          <Switch onChange={handleChangeSwitch('sapChieu')} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked" >
          <Switch onChange={handleChangeSwitch('hot')} />
        </Form.Item>
        <Form.Item label="Danh gia">
          <InputNumber onChange={handleChangeSwitch('danhGia')} />
        </Form.Item>
        <Form.Item label="Hình ảnh" >
          <input type='file' onChange={handleChangeInputImg} accept='image/png, image/jpg' />
          <img src={srcImage} style={{ width: 100, height: 100 }} className='mt-2' />
        </Form.Item>

      </Form.Item>


      <Form.Item label="Button">
        <button type='submit' className='btn btn-outline-primary btn-sm'>Thêm phim</button>
      </Form.Item>
    </Form>
  );
};
export default AddNew;