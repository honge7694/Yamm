import Image from "next/image";
import { format } from "date-fns";
import Slider from "react-slick";
import { useRouter } from "next/router";
import SmileClick from "./smileclick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Link from "next/link";

const settings = {
  className: " w-full ",
  centerMode: true,
  infinite: true,
  centerPadding: "50px",
  slidesToShow: 1,
  speed: 500
};

const FoodItemm = ({ foodData, testData }) => {

    const router = useRouter();
    let date = new Date(foodData["date"]);
    let formatDate = format(date, "yyyy do H:mma");
    const [testData1, setTestData1] = useState(testData)
    const routeFoodname = () => {
      router.push({
        pathname : `/todayfoodeatdetail/foodname`,
        query: { "data" : testData1 } 
    });
    }
    return (

        <div className="flex">
            {console.log(foodData)}
            <div className="w-2/6 mt-2  flex flex-col items-center justify-center">
                    <div className=" col-span-1 rounded-full  w-4/6 min-h-[50px] min-w-[50px]  flex justify-center items-center relative" >
                      <SmileClick />
                    </div>
                    <div className="flexitems-center justify-center text-xs mt-1" >
                      <div>{formatDate}</div>
                    </div>
                    <div className="flex items-center justify-center text-xs" >
                      <div>좋아요</div>
                    </div>
            </div>
            {/* 여기 슬라이더 css 살짝 안맞음 수정할 것*/}
            <div className='w-4/6 flex justify-end mt-2 '>
              <div className=" rounded-2xl w-2/3 min-h-[100px] h-full  flex items-center justify-center">
              <Slider {...settings}>
                { testData.map((test, i) => (
                  <Link key={i}  href={{
                    pathname: '/todayfoodeatdetail/foodname',
                    query: { "img" : test["img"], "name" : test["name"], "memo" : test["memo"], "date" : test["date"]  },
                  }} >
                    <a className='w-full h-full'>
                      <Image className={'rounded-2xl shadow-2xl'} src={test["img"]} width="100%" height="100%" />
                    </a>
                  </Link>
                ))
                }
              </Slider>
              </div>
            </div>
        </div>
    );
};

export default FoodItemm;