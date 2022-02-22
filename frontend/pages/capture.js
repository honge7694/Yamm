import React from 'react'
import Camera from '../components/Camera'
import Modal from '../components/Modal'
import { useRouter } from "next/router";


function capture() {

  const router = useRouter();
  
  const moveFoodInfo = () => {
      router.push('/foodinfo')
  }

  return (
    <div className="container mx-auto h-screen bg-slate-50 rounded-3xl">
        <div className="flex justify-center">
            {/* <Modal/> */}
            <div className="text-white bg-main/30 p-2 pd-8 rounded-3xl">
                <Camera onClick={moveFoodInfo}/>
            </div>

            {/* <Camera/> */}
        </div>
    </div>
  )
}

export default capture