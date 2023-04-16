import React, { useEffect } from 'react'
import HomeMenu from '../homeMenu/HomeMunu'
import MovieCard from './movieCard/MovieCard'
import styles from './Home.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import MultipleSlick from '../../components/reactSlick/MultipleSlick'
import { layDanhSachFim } from '../../redux/quanLyPhimSlice'
import { callApiLichChieuHeThongRap } from '../../redux/quanLyRapSlice'
import HomeCarousel from '../homeCarousel/HomeCarousel'



const Home = () => {

    const { arrFim } = useSelector(state => state.quanLyFimSlice)
   const { lichChieuHeThongRap } = useSelector(state => state.quanLyRapSlice)
  

    const dispatch = useDispatch()
    useEffect(() => {
    dispatch(layDanhSachFim())
    dispatch(callApiLichChieuHeThongRap())
    }, [])

    
    return (
        <>
         <HomeCarousel />
        <div className={styles.container}>            
            <div className='row mt-5'>
                <MultipleSlick arrFim={arrFim} />
              
            </div>
            <div className='row mt-5 mb-5'>
                <HomeMenu lichChieuHeThongRap={lichChieuHeThongRap}/>
            </div>
        </div>
        </>
    )
}

export default Home