import { useFormik } from 'formik'
import React from 'react'
import { GROUPID, history } from '../../util/settings/config'
import { quanLyNguoiDungServices } from '../../services/quanLyNguoiDungServices'
import * as yup from 'yup'

function Register() {

const formik = useFormik({
  initialValues: {
    taiKhoan: '',
    matKhau: '',
    email: '',
    soDt: '',
    maNhom: GROUPID,
    hoTen: ''
  },
  validationSchema: yup.object({
    taiKhoan: yup.string().required('Tài khoản không thể để trống'),
    matKhau: yup.string().required('Mật khẩu không thể để trống').min(6, 'Mật khẩu tối đa 12 ký tự tối thiểu 6 ký tự').max(12, 'Mật khẩu tối đa 12 kí tự tối thiểu 6 kí tự'),
    email: yup.string().email('Địa chỉ email không hợp lệ').required('Email không thể để trống'),
    soDt: yup.number().required('Điện thoại không thể để trống'),
    hoTen: yup.string().required('Họ tên không thể để trống').min(6, 'Tối thiểu 6 ký tự tối đa 30 ký tự').max(30, 'Tối thiểu 6 ký tự tối đa 30 ký tự')
  }),
  onSubmit: async (values) =>{
    try{
       const result = await quanLyNguoiDungServices.dangKyNguoiDung(values)
       console.log(result)
       alert('Bạn đã đăng ký thành công!')
    }catch(err){
      console.log(err.response.data);
    }
  }
})

  return (
    <div>
    <section className="vh-100 bg-image" style={{backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")',}}>
  <div className="mask d-flex align-items-center h-100 gradient-custom-1 w-75 m-auto">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card bg-light" style={{borderRadius: 15}} >
            <div className="card-body p-4">
              <h2 className=" h4 text-center mb-3">Tạo một tài khoản</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-outline mb-2">
                <label className="form-label" >Tài khoản:</label>
                  <input type="text" name='taiKhoan' onChange={formik.handleChange} className="form-control form-control-sm" />
                  {formik.errors.taiKhoan && formik.touched.taiKhoan && (<p style={{color: 'red'}}>{formik.errors.taiKhoan}</p>)}                 
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" >Mật khẩu:</label>
                  <input type="password" name='matKhau' onChange={formik.handleChange} className="form-control form-control-sm" />
                  {formik.errors.matKhau && formik.touched.matKhau && (<p style={{color: 'red'}}>{formik.errors.matKhau}</p>)} 
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" >Nhập lại mật khẩu:</label>
                  <input type="password" name='matKhau' onChange={formik.handleChange} className="form-control form-control-sm" />
                  {formik.errors.matKhau && formik.touched.matKhau && (<p style={{color: 'red'}}>{formik.errors.matKhau}</p>)} 
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" >Họ tên:</label>
                  <input type="text" name='hoTen' onChange={formik.handleChange} className="form-control form-control-sm" />
                  {formik.errors.hoTen && formik.touched.hoTen && (<p style={{color: 'red'}}>{formik.errors.hoTen}</p>)} 
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" >Email:</label>
                  <input type="email" name='email' onChange={formik.handleChange} className="form-control form-control-sm" />
                  {formik.errors.email && formik.touched.email && (<p style={{color: 'red'}}>{formik.errors.email}</p>)} 
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" >Số điện thoại:</label>
                  <input type="number" name='soDt' onChange={formik.handleChange} className="form-control form-control-sm" />
                  {formik.errors.soDt && formik.touched.soDt && (<p style={{color: 'red'}}>{formik.errors.soDt}</p>)} 
                </div>
                <div className="form-check d-flex justify-content-center mb-3">
                  <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3cg" />
                  <label className="form-check-label" htmlFor="form2Example3g">
                  Tôi đồng ý tất cả các thông tin trong <a href="#!" className="text-body"><u>Điều khoản dịch vụ</u></a>
                  </label>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success btn-block btn-md gradient-custom-4 text-body">Register</button>
                </div>
                <p className="text-center text-muted mt-2 mb-0">Đã có tài khoản? <a style={{cursor: 'pointer'}} onClick={()=>{history.push('/login')}} className="fw-bold text-body"><u>Đăng nhập tại đây</u></a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Register
