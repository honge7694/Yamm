import React, { useState , useEffect } from 'react';
import { useRouter } from "next/router";
import Memo from '../components/Memo'


function foodinfo(props) {

  const [ foodImage, setFoodImage ] = useState("")
  
  useEffect(() => {
    const Image = localStorage.getItem('image');
    setFoodImage(Image)
  }, [])

  const [ Memo, setMemo ] = useState()
  const [ checkFoodName, setCheckFoodName ] = useState()

  const openMemo = () => {
    
  }
  
  const router = useRouter();

  return (
    <div className="container mx-auto h-screen bg-slate-50 rounded-3xl" >
      <div className="flex flex-col items-center text-center">
        <div className="text-center pt-9">
          <img src={foodImage} className=" w-4/5 m-auto rounded-3xl"></img>
        </div>
        <div className="w-full pt-8">
          <div className="h-96 rounded-3xl drop-shadow-[0_-10px_20px_-5px_rgba(115,115,115,0.75)] bg-main">
            <div className="py-8 text-2xl font-bold">사진의 음식이 돈까스가 맞으신가요?</div>
            <button className="p-4 px-8 m-4 text-white font-bold bg-red-600 hover:bg-red-800 shadow-lg rounded-full">맞습니다</button>
            <button className="p-4 px-8 m-4 font-bold bg-white hover:bg-slate-300 shadow-lg rounded-full">아닙니다</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default foodinfo