import React, { useEffect } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import styles from './HomeTemplate.module.scss'

const HomeTemplate = ({ children }) => {
    useEffect(()=>{
        window.scrollTo(0,0)
      })
    return (
        <div>
            <div className={styles.HomeTemplate}>               
                <div className={styles.header}>
                    <Header />
                </div>
            </div>
            {children}
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    )
}

export default HomeTemplate