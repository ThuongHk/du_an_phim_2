import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../redux/quanLyNguoiDungSlice'
import { NavLink } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch()
  const loginForm = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: ''
    },
    onSubmit: values =>{
      const actionThunk = userLogin(values)
      dispatch(actionThunk)
    }
  })
  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 m-auto">
  <div className="mb-8 text-center">
    <h1 className="my-3 text-4xl font-bold">Đăng nhập</h1>
    <p className="text-sm dark:text-gray-400"><b>Đăng nhập để truy cập thông tin</b></p>
  </div>
  
  <form onSubmit={loginForm.handleSubmit}  className="space-y-12 ng-untouched ng-pristine ng-valid" >
    <div className="space-y-4">
      <div>
        <label htmlFor="taiKhoan" className="block mb-2 text-sm"><b>Tài khoản</b></label>
        <input  value={loginForm.values.taiKhoan} onChange={loginForm.handleChange} id="taiKhoan" name="taiKhoan" placeholder="Nhập vào tài khoản của bạn" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <label htmlFor="password" className="text-sm"><b>Mật khẩu</b></label>
          <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">Bạn quên mật khẩu?</a>
        </div>
        <input type='password' value={loginForm.values.matKhau} onChange={loginForm.handleChange} id='matKhau' name="matKhau"  placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
      </div>
    </div>
    <div className="space-y-2">
      <div>
        <button type="submit" className="w-full px-8 py-3 font-semibold dark:bg-violet-400 dark:text-gray-900 bg-violet-400 rounded-full">Sign in</button>
      </div>
      <p className="px-6 text-sm text-center dark:text-gray-400">Bạn đã có tài khoản chưa?
      <NavLink rel="noopener noreferrer" to='/register' className="hover:underline dark:text-violet-400">Đăng ký</NavLink>.
      </p>
    </div>
  </form>
</div>

  )
}

export default Login
