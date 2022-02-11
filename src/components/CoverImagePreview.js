import { useState, useEffect } from 'react';

const CoverImagePreview = ( { file, onClick } ) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (file) {
          setImageUrl(URL.createObjectURL(file));
        }
      }, [file]);

    return (
        <div onClick={onClick}>
            <div style={{width: "450px"}} >
                <img style={{width: "inherit", borderRadius: "20px"}}  src={imageUrl} />
            </div>
        </div>
    )
}

export default CoverImagePreview
