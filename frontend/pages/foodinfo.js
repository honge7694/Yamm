import React, { useState , useEffect } from 'react'
import { useRouter } from "next/router";


function foodinfo(props) {

  const [ foodImage, setFoodImage ] = useState("")
  
  useEffect(() => {
    const Image = localStorage.getItem('image');
    setFoodImage(Image)
  }, [])
  
  const router = useRouter();

  return (
    <div className="container mx-auto h-screen bg-slate-50 rounded-3xl" >
      <div className="flex flex-col items-center text-center">
        <div className="w-80 pt-9 ">
          <img src={foodImage} className="rounded-3xl"></img>
        </div>
        <div className="w-full pt-8 ">
          <p className="h-96 bg-main"></p>
        </div>
      </div>
    </div>
  )
}

export default foodinfo;
