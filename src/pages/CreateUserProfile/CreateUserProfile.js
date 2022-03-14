import React, { useState, useCallback } from 'react'
import { BsFillPlusCircleFill } from "react-icons/bs"
import './CreateUserProfile.css'
import Cropper from 'react-easy-crop'
import { getOrientation } from 'get-orientation/browser'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import Slider from '@material-ui/core/Slider'
import { Grid, GridItem } from '@chakra-ui/react'

const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
}

const CreateUserProfile = () => {
    const [imageSrc, setImageSrc] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        // console.log(croppedArea, croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {
        const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
            rotation
        )
            setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])
    
    const onClose = useCallback(() => {
        setCroppedImage(null)
    }, [])

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)
    
            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            }
    
            setImageSrc(imageDataUrl)
        }
    }

    return (
        <>
            {imageSrc ? (
                <div>
                    <div className="crop-container">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            style="width: 200px"
                            />
                    </div>
                    <div className="controls">
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.01}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                    </div>
                </div>
            ) : (
                <input type="file" onChange={onFileChange} accept="image/*" />
            )}
        </>
    )
}

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}

export default CreateUserProfile