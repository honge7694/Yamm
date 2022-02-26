import Slider from "react-slick";
import { useRouter } from "next/router";

const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 1,
    speed: 500
  };
  const dummyFoodImage = ["/asset/떡볶이.png","/asset/삼겹살.png","/asset/비빔밥.png", "/asset/떡볶이.png"] 
  const TodayEatFood = ({ images }) => {
  
  const router = useRouter();

  const routeFoodInfo = () => {
    console.log("routeTodayFoodEatDetail")
    router.push('/todayfoodeatdetail')
  }
  
  return (
    <div>
      <div className="font-bold px-8 pt-6 pb-2 text-xl">
          <p>오늘 먹은 음식</p>
      </div>
      <div className="bg-gray-200 px-8" onClick={(e)=>{routeFoodInfo()}}>
        <Slider {...settings}>
          { images.map((image, i) => (
          <div key={image.id}>
            <img className="w-auto px-2 rounded-3xl" src={dummyFoodImage[i]}></img>
          </div>
          )) }
        </Slider>
      </div>
    </div>
  );
};

export default TodayEatFood;