import React, { useState , useEffect } from 'react';
import { useRouter } from "next/router";
import Memo from '../components/Memo'
import moment from 'moment';
import axios from 'axios';
import 'moment/locale/ko';


function foodinfo(props) {

  const [ foodImage, setFoodImage ] = useState("")
  const [ foodImageFile, setFoodImageFile ] = useState()
  const nowTime = moment().format('YYYY-MM-DD');
  const [ date, setDate ] = useState(nowTime)
  const [ time, setTime ] = useState()
  const [ writeMemo, setWriteMemo ] = useState(false)
  const [ foodName, setFoodName ] = useState()
  const [ searchFoodName, setSearchFoodName ] = useState()
  

 
  useEffect(() => {
    const Image = localStorage.getItem('image');
    setFoodImage(Image)

    async function fetchData() {
      const url = {Image}

      fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "food_img",{ type: "image/png" })
        setFoodImageFile(file)
        console.log(file)

        const formData = new FormData();
        console.log(file)
        formData.append("image", file);
        const res = axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/yamm/distinction',
          data: formData,
      })
      })
    }
    
    fetchData();
  }, [])

  const openMemo = () => {
    setWriteMemo(true)
  }
  const closeMemo = () => {
    setWriteMemo(false)
  } 
  const changeDate = (e) => {
    setDate(e.target.value);
  }
  const router = useRouter();
  
  const moveMain = () => {

    async function fetchData() {

      const formData = new FormData();
      formData.append("food_name", "돈까스");
      formData.append("image", foodImage);
      formData.append("date", date);
      formData.append("memo", "메모추가필요");

      const res = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/yamm/distinction',
        data: formData,
    })
    console.log(res)
    }
    fetchData();
    router.push('/')
  }
  

  return (
    <div className="container mx-auto h-screen bg-slate-50 rounded-3xl" >
      <div className="flex flex-col items-center text-center">
        <div className="text-center pt-9">
          <img src={foodImage} className=" w-4/5 m-auto rounded-3xl"></img>
        </div>
        <div className="w-full pt-8">
          <div className="h-96 rounded-3xl drop-shadow-[0_-10px_20px_-5px_rgba(115,115,115,0.75)] bg-main">
            <div className="py-8 text-2xl font-bold">사진의 음식이 돈까스가 맞으신가요?</div>
            <button className="p-4 px-8 m-4 text-white font-bold bg-red-600 hover:bg-red-800 shadow-lg rounded-full" onClick={openMemo}>
              맞습니다</button>
            <button className="p-4 px-8 m-4 font-bold bg-white hover:bg-slate-300 shadow-lg rounded-full">아닙니다</button>

            { writeMemo ? <Memo 
            closeMemo={closeMemo} 
            nowTime={nowTime} 
            date={date}
            time={time}
            changeDate={changeDate}/> : null }
            { searchFoodName ? <Memo/> : null }

            <div>
              <button className="p-4 px-8 mt-32 text-white font-bold bg-red-600 hover:bg-red-800 shadow-lg rounded-full" onClick={moveMain}>확인</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default foodinfo
