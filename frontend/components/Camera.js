import React, {useRef, useCallback} from 'react'
import Webcam from "react-webcam";


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

export default function Camera() {
    
    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc)
        },
        [webcamRef] 
    );
        
    return (
        <>
        <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={720}
            videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
        </>
    );
};