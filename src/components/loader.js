import React from 'react'
import { TailSpin } from  'react-loader-spinner'
import './loader.css'


const Loader = () => {
    return (
        <div className='outer-container'>
            <div className='inner-container'>
                <TailSpin color="rgb(255, 0, 77)" height={40} width={40} />
            </div>
        </div>
    )
}

export default Loader