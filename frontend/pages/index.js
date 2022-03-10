import { useRouter } from "next/router";
import axios from 'axios';
import Calendar from "../components/calendar/index";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TodayEatFood from "../components/todayeatfood/todayeatfood";
import TodayEatFoodNull from "../components/todayeatfood/todayeatfoodnull";
import BoardTest from '../components/boardtest';
import { useSelector } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
<<<<<<< HEAD
import { useEffect } from "react";
=======
import { useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
>>>>>>> feature_community_board

export default function Home({ images }) {
  const router = useRouter();
<<<<<<< HEAD

=======
  const { me } = useSelector((state) => (state.user));
  
  
>>>>>>> feature_community_board
  const moveCapture = () => {
    router.push('/capture')
  }
  


  useEffect(() => {
    const nowDate  = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]; 

    const fetchDate = () => {
      const res = axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/yamm/food/eaten',
        params: {
          "date": nowDate
        }
      })  
      .then((res)=> console.log(res.data.shift()))
    }
    fetchDate();
  }, [])

  return (
    <>
<<<<<<< HEAD
    <div className="w-full h-full m-auto bg-slate-50 rounded-3xl">
      <div className="w-80 h-40 p-8 flex text-left flex-col justify-center">
        <span className="font-bold text-3xl text-main ">안녕하세요. ---님</span><br/>
        <span className="font-bold ">오늘은 어떤 음식을 드셨나요?</span>
=======
    <div className="container mx-auto h-full bg-slate-50 rounded-3xl">
      
      <div className=" h-40 p-8  text-left w-full ">
        { me == null ? (<span className=" flex justify-end font-bold text-3xl text-main ">
                            안녕하세요. --- 님 
                          </span>)
                      : (
                      <div className=' w-full font-bold text-3xl text-yellow1 '>
                        <div className='flex justify-end  items-center'> 
                          안녕하세요 &nbsp; 
                          <div className=' rounded-3xl relative w-[30px] h-[30px]'>
                            <Image className=' rounded-3xl' src={me.data["profile_img"]} layout={"fill"} />
                          </div>
                        </div>
                        <div className='flex justify-end '> 
                          "<span className='font-["Jalnan"] '>{ me.data["nickname"] }</span>" 님
                          <br/>
                        </div>  
                        
                      </div>)
        }
        <div className="flex justify-end text-gray-400 font-bold mt-2">오늘은 어떤 음식을 드셨나요?</div>
>>>>>>> feature_community_board
      </div>

      <div className="font-bold px-8 py-2 text-xl">사진 업로드</div>
      <div className="flex justify-center px-8 ">
        <button className="w-full h-48 top-1/2 bg-slate-800 rounded-3xl flex flex-col items-center text-white" onClick={moveCapture}>
          <div className="pt-8 text-2xl">오늘 먹은 음식을 추가해주세요</div>
          <div className="pt-4 text-main">
            <AddCircleIcon fontSize="large"/>
          </div>
        </button>
      </div>
      {true ? <TodayEatFood images={images}/> : <TodayEatFoodNull/>}
      <div className="font-bold px-8 pt-8 text-xl">달력</div>
      <div className="mt-0">      
        <Calendar className="mt-0"/>  
      </div>
      
      <BoardTest /* 임시 이름 */ />
        
    </div>
    </>
  )
}
export const getServerSideProps = async() => {
  // 달력 여기서 처리할 것
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=4`)
  const images = await res.json();
  return {
    props: {
      images
    }
  }
}

// export const getStaticProps = async() => {
//   const nowDate  = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]; 
//   const res = await fetch({
//     method: 'get',
//     url: 'http://127.0.0.1:8000/yamm/food/eaten',
//     params: {
//       "date": nowDate
//     }
//   })
//   const data = await res.json()
//   return {
//     props: 
//       { data }
//   }
// }
