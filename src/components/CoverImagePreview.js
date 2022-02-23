import { useState, useEffect } from 'react';
import './CoverImagePreview.css'

const CoverImagePreview = ({coverId}) => {

    return (
        <div>
            <div className='cover-image-preview-outer'>
                <img 
                    style={{width: "inherit", borderRadius: "20px"}}  
                    src={`https://covers.openlibrary.org/b/id/${coverId}.jpg`}
                    alt="aye" 
                />
            </div>
        </div>
    )
}

export default CoverImagePreview
