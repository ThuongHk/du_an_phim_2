import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import styles from './HomeCarousel.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { callApiBannerSlice } from '../../redux/bannerSlice';

const HomeCarousel = () => {
 const {listBanner} = useSelector(state => state.bannerSlice)
 const dispatch = useDispatch()
 
useEffect(()=>{
const actionThunk = callApiBannerSlice()
dispatch(actionThunk)
},[])
   
    return (
        <div className={styles.home_carousel}>
            <Carousel effect='fade'   autoplay>
                {listBanner.map((ban,index) => {
                    return  <div key={index}>
                    <img className='w-full z-10' style={{height: '500px', objectFit: 'cover'}} src={ban.hinhAnh} alt={ban.hinhAnh} />
                </div>
                })}
               
               
            </Carousel>

        </div>
    )
}

export default HomeCarousel