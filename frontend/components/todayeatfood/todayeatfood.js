import Slider from "react-slick";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import Image from "next/image";

const settings = {
    className: " ",
    centerMode: true,
    infinite: true,
    centerPadding: "30px",
    slidesToShow: 1,
    speed: 500
  };
const dummyFoodImage = ["/asset/떡볶이.png","/asset/삼겹살.png","/asset/삼겹살.png", "/asset/떡볶이.png"] 

const TodayEatFood = ({ images }) => {
  
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  
  const routeTodayFoodEatDetail = () => {
    
    
    if (user==null) { 
      router.push({
        pathname: '/login',
        query : { "url" : "/todayfoodeatdetail" }
    })}else{
      router.push("/todayfoodeatdetail");
    }
  }
  
  return (
    <div>
      <div className="font-bold px-8 pt-6 pb-2 mt-6 text-xl animate-pulse  delay-1000">
          <p>오늘 먹은 음식</p>
      </div>
      <div className= "px-8 ml-5 mr-5 rounded-2xl" onClick={(e)=>{routeTodayFoodEatDetail()}}>
        <Slider {...settings}>
          { images.map((image, i) => (
            <div className="" key={image.id}>
              <img className="w-auto h-auto rounded-t-3xl px-2 " src={dummyFoodImage[i]} layout="fill"></img>
              <div className="px-2">
                <div className="w-auto h-20 pt-1 px-4 bg-main rounded-b-3xl">
                  <p className="text-lg pt-2">음식이름</p>
                  <p className="text-sm">칼로리: 탄수화물: 단백질: 지방:</p>
                </div>
              </div>
            </div>
            )) }
        </Slider>
      </div>
    </div>
  );
};

export default TodayEatFood;
