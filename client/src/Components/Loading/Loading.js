import React from 'react'
import CssStyles from './Loading.module.css';

import loading from '../../assets/Dual Ball-1s-200px (1).gif'

function Loading() {
    return (
        <div className={CssStyles.root}>
            <img src={loading} alt="loading..." />
        </div>
    )
}

export default Loading
