import React, { useEffect } from 'react'
import Login from '../../pages/login/Login'


function UserLogin() {
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  return (
    <div>
      <Login/>
    </div>
  )
}

export default UserLogin
