import React, { useEffect } from 'react'
import Checkout from '../../pages/checkout/Checkout'
import { USER_LOGIN, history } from '../../util/settings/config'

function CheckoutTemplate() {
    if(!localStorage.getItem(USER_LOGIN)){
        history.push('/login')
    }
    useEffect(()=>{
      window.scrollTo(0,0)
    })
  return (
    <div>
      <Checkout/>
    </div>
  )
}

export default CheckoutTemplate
