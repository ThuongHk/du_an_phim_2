import React from 'react'
import styles from './Loading.module.scss'

export default function LoadingLazy() {
  return (
    
       <div className={styles.loading}>
                <img src={require('./ld1.gif')}/>
            </div>
    
  )
}
