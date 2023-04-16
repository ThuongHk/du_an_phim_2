import React, { Component } from "react";
import Slider from "react-slick";
import clsx from 'clsx'
import styles from './MultipleSlick.module.scss'
import Film_flip from "../../pages/home/movieCard/film/Film_flip";
import { useDispatch } from "react-redux";
import { changePhimDC, changePhimSC } from '../../redux/quanLyPhimSlice'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles['slick-next']} ${style}`}
      // className={clsx(styles.className, styles.slick_next)}
      // style={{ ...style, display: "block", fontSize: '3rem' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles['slick-prev']} ${style}`}
      // style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

export default function MultipleRows(props) {
const dispatch = useDispatch()
 const renderFilm = () =>{
    return props.arrFim.map((item,index)=>{
      return <div key={index}>
        <Film_flip item={item}/>
      </div>
    })
    
  }
 
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      rows: 2,
      slidesPerRow: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return (
      <div className="container">
       <div className="text-center mb-4">
       <button className="btn btn-secondary mr-2 bg-black" onClick={()=>{dispatch(changePhimDC(true))}}>PHIM ĐANG CHIẾU</button>
       <button className="btn btn-secondary mr-2 bg-black" onClick={()=>{dispatch(changePhimSC(true))}}>PHIM SẮP CHIẾU</button>
       </div>
       
        <Slider {...settings}>

        {renderFilm()}
         
        </Slider>
      </div>
      
    );
  }
