import React, {useState, useRef, useCallback} from 'react'
import Webcam from "react-webcam";
import { useRouter } from "next/router";

const videoConstraints = {
    width: 500,
    height: 700,
    facingMode: "user"
};

export default function Camera() {
    
    const [image, setImage] = useState();

    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        moveFoodInfo();
        setImage(imageSrc)
        },        
        [webcamRef] 
    );

    const router = useRouter();

    const moveFoodInfo = () => {
        router.push('/foodinfo')
    }

    return (
        <>
        <Webcam
            className="rounded-3xl"
            audio={false}
            height={700}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={videoConstraints}
        />
        <div className="pt-8 text-center">
            <button className="p-4 rounded-3xl bg-main drop-shadow-xl" onClick={capture} >사진 촬영</button>
        </div>
        </>
    );
};