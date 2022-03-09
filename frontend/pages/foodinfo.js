import React, { useState , useEffect } from 'react';
import { useRouter } from "next/router";
import Memo from '../components/Memo'
import Search from '../components/Search';
import axios from 'axios';


function foodinfo(props) {

  const [ foodImage, setFoodImage ] = useState("")
  const [ foodImageFile, setFoodImageFile ] = useState()

  const [ writeMemo, setWriteMemo ] = useState(false)
  const [ searchFoodName, setSearchFoodName ] = useState(false)
  const [ searchResult, setSearchResult ] = useState('')
  const [ foodName, setFoodName ] = useState()
  
  const nowDate  = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]; 
  const nowTime = new Date().toTimeString().split(" ")[0];

  const [ todayDate, setTodayDate ] = useState(nowDate)
  const [ time, setTime ] = useState(nowTime)
  const [ memo, setMemo ] = useState('')
  
  // console.log(todayDate+' '+time)
  // Form data 시간 형태

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

      const formData = new FormData();
      
      formData.append("image", file);

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/yamm/distinction',
        data: formData,
      })
      .then((response) => {setFoodName(response.data.food_name)})
      console.log(file)

      })
    }
    fetchData();
  }, [])

  const toggleSearch = () => setSearchFoodName(prev => !prev);
  
  const toggleMemo = () => setWriteMemo(prev => !prev);
  const changeDate = (e) => setTodayDate(e.target.value);
  const changeTime = (e) => setTime(e.target.value);
  const changeMemo = (e) => setMemo(e.target.value);

  const router = useRouter();
 
  const searchFood = (e) => {
    setSearchResult(e.target.value)
  }
  console.log(searchResult)
  const selectFood = (e) => {
    setFoodName(e.target.value)
    console.log('성공')
  }


  const moveMain = () => {

    async function fetchData() {

      const formData = new FormData();

      formData.append("food_name", '돈가스')
      formData.append("image", foodImageFile)
      formData.append("date", "2022-03-08 21:16:00")
      formData.append("memo", memo);
      let content_length = JSON.stringify(formData).length;

      for (let key of formData.keys()) {
        console.log(key);
      }
      for (let value of formData.values()) {
        console.log(value);
      }
      const res = await axios({
        method: 'post',
        header: { 
          'Content-Length': content_length, 
          'Content-Type': 'multipart/form-data' }, 
        url: 'http://127.0.0.1:8000/yamm/food/eaten',
        data: formData,
    })
    }
    fetchData();
  

    // router.push('/')
  }
  
  return (
    <div className="container mx-auto h-screen bg-slate-50 rounded-3xl" >
      <div className="flex flex-col items-center text-center">
        <div className="m-auto text-center pt-9">
          <img src={foodImage} className="w-4/5 m-auto rounded-3xl"></img>
        </div>
        <div className="fixed bottom-0 w-full pt-8">
          <div className="h-96 rounded-t-3xl drop-shadow-[0_-10px_20px_-5px_rgba(115,115,115,0.75)] bg-main">
            <div className="py-8 text-2xl font-bold">사진의 음식이 {foodName} 맞으신가요?</div>
            <button className="p-4 px-8 m-4 text-white font-bold bg-red-600 hover:bg-red-800 shadow-lg rounded-full" onClick={toggleMemo}>
              맞습니다</button>
            <button className="p-4 px-8 m-4 font-bold bg-white hover:bg-slate-300 shadow-lg rounded-full" onClick={toggleSearch}>아닙니다</button>
            
            { searchFoodName ? <Search
              closeSearch={toggleSearch}
              searchFood={searchFood}
              searchResult={searchResult}
              selectFood={selectFood}
              foodName={foodName}
            /> : null }

            { writeMemo ? <Memo 
              closeMemo={toggleMemo} 
              nowTime={nowTime}
              nowDate={nowDate} 
              todayDate={todayDate}
              time={time}
              memo={memo}
              changeDate={changeDate}
              changeTime={changeTime}
              changeMemo={changeMemo}/> : null }
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
