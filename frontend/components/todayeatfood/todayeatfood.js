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
const dummyFoodImage = ["/asset/떡볶이.png","/asset/삼겹살.png","/asset/비빔밥.png", "/asset/떡볶이.png"] 

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
      <div className="bg-gray-200 px-8 ml-5 mr-5 rounded-2xl" onClick={(e)=>{routeTodayFoodEatDetail()}}>
        <Slider {...settings}>
          { images.map((image, i) => (
            <div className="h-[155px] relative  " key={image.id}>
              <Image className=" rounded-2xl " src={dummyFoodImage[i]} layout="fill" />
            </div>
          )) }
        </Slider>
      </div>
    </div>
  );
};

export default TodayEatFood;
