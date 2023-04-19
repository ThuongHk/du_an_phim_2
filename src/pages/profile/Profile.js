import React from 'react'
import { USER_LOGIN } from '../../../src/util/settings/config';

function Profile() {
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
  return (
    <div className='container'>
      <div className='row mt-4'>
       <div className='col-4'>
       <img src={'https://picsum.photos/200/200'} alt='123' className='rounded-circle' />
       </div>
       <div className='col-8'>
        <form>
          <h1 className='h4 text-center'>Thông tin cá nhân</h1>
          <div className='row'>
            <div className='col-6'>
              <div className='form-group'>
                <p>Họ tên:</p>
                <input type='text' value={userLogin.hoTen} className='form-control'/>
              </div>
              <div className='form-group'>
                <p>Số điện thoại:</p>
                <input type='text' value={userLogin.soDt} className='form-control'/>
              </div>
            </div>
            <div className='col-6'>
              <div className='form-group'>
                <p>Email:</p>
                <input type='text' value={userLogin.email} className='form-control'/>
              </div>
              <div className='form-group'>
                <p>Địa chỉ:</p>
                <input type='text' className='form-control'/>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <button className='btn btn-warning btn-sm text-dark mt-2' type='submit'>Cập nhật</button>
          </div>
        </form>
       </div>
      </div>
    </div>
  )
}

export default Profile
