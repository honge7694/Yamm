import Camera from "../components/Camera";
import Calendar from "../components/Calendar";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home({images}) {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };

  return (
    <>
    <div className="container mx-auto h-screen bg-slate-50 rounded-3xl">
      <div className="w-80 h-40 p-8 flex text-left flex-col justify-center">
        <span className="font-bold text-3xl text-main ">안녕하세요. ---님</span><br/>
        <span className="font-bold ">오늘은 어떤 음식을 드셨나요?</span>
      </div>

      <div className="font-bold px-8 py-2 text-xl">사진 업로드</div>
        <div className="flex justify-center px-8 ">
          <div className="w-full h-48 top-1/2 bg-slate-800 rounded-3xl flex justify-center text-white ">
            <span className="pt-8">오늘 먹은 음식을 추가해주세요</span>
            {/* <Camera/> */}
          </div>
        </div>
        
      <div className="font-bold px-8 pt-6 pb-2 text-xl">오늘 먹은 음식</div>
      
        <div>
          <Slider {...settings}>
          {images.map(image => (
            <div  key={image.id}>
              <img className="w-auto px-2 rounded-3xl" src={image.url}></img>
            </div>
          ))}
          </Slider>
        </div>


      <div className="font-bold px-8 pt-6 pb-2 text-xl">식단 분석표</div>
        <div className="px-8">
          <Calendar/>
        </div>
    </div>
    </>
  )
}

export const getServerSideProps = async() => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=4`)
  const images = await res.json();

  return {
    props: {
      images
    }
  }
}
