import React, {useState, useRef, useCallback, useEffect} from 'react'
import Webcam from "react-webcam";
import { useRouter } from "next/router";

const videoConstraints = {
    width: 500,
    height: 700,
    facingMode: "user"
};



export default function Camera(props) {
    

    // const videoConstraints = {
    //     facingMode: { exact: "environment" }
    //   };
    
    // 후면 카메라를 기본 카메라로 하기 위해서는 위 주석 해제 

    const webcamRef = useRef(null);
    
    
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();        
        localStorage.setItem("image", imageSrc);
        moveFoodInfo();
        },        
        [webcamRef] 
    );
    
    

    const router = useRouter();
<<<<<<< HEAD
=======
    
>>>>>>> feature_community_board
    const moveFoodInfo = () => {
        router.push({
            pathname: '/foodinfo',
        })
    }

    return (
        <>
        <Webcam
            className="rounded-3xl"
            audio={false}
            width={500}
            height={700}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
        />
        <div className="pt-8 text-center">
            <button className="p-4 rounded-3xl bg-main drop-shadow-xl" onClick={capture} >사진 촬영</button>
        </div>
        </>
    );
};