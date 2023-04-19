import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { ACCESS_TOKEN, USER_LOGIN, history } from '../../../util/settings/config'
import { useSelector } from 'react-redux'
import _ from 'lodash'


const Header = () => {
  // const { userLogin } = useSelector(state => state.quanLyNguoiDungSlice)
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
  const renderProfile = () => {
    if (_.isEmpty(userLogin)) {
      return <Fragment>
        <button className="self-center px-8 py-3 rounded" onClick={() => history.push('/login')}>Login</button>
        <button onClick={() => history.push('/register')} className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Register</button>
      </Fragment>
    }
    return <Fragment>
      <button className="self-center px-8 py-3 rounded" onClick={() => history.push('/profile')}> Hello {userLogin.taiKhoan}</button>
      <button className='btn btn-outline-primary text-light' onClick={() => {
        localStorage.removeItem(USER_LOGIN)
        localStorage.removeItem(ACCESS_TOKEN)       
        window.location.reload()
      }}>Đăng xuất</button>
    </Fragment>
  }
 
  return (
    <header className="p-4 bg-gray-800 text-gray-100 bg-opacity-60 z-10 ">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink to='/' className="flex">
          <img src={require('../../../assets/img/cyberlearn.jpg')} alt='123' />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink to="/" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">Home</NavLink>
          </li>
          <li className="flex">
            <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">Contact</NavLink>
          </li>
          <li className="flex">
            <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent  text-white" activeClassName="border-b-2 border-white">News</NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderProfile()}
        </div>
        <button className="p-4 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>

  )
}

export default Header