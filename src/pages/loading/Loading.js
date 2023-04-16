import React from 'react'
import styles from './Loading.module.scss'
import { useSelector } from 'react-redux'

const Loading = () => {
     const {isLoading} = useSelector(state => state.loadingSlice);
     if(isLoading){
        return (
            <div className={styles.loading}>
                <img src={require('./ld1.gif')}/>
            </div>
        )
     }else {
        return ''
     }

       
   
}

export default Loading