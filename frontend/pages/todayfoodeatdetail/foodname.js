import React, { useEffect, PureComponent } from 'react'
import { withRouter } from 'next/router';
import FontTitle from '../../components/font/fontTitle';
import Image from 'next/image';
import { Chart } from '../../components/chart/index';
import moment from 'moment';
import 'moment/locale/ko';
import { useRouter } from "next/router";

// withRouter 사용법 알아 둘 것!!

function FoodInFoFoodName({ router: { query } }) {

  const router = useRouter();

  const nowTime = moment().format('YY년 MM월 DD일');
  const routeBackFuntion = () => {
    router.push('/todayfoodeatdetail')
  }
  return (
    <div>

      <div className='flex justify-between m-5'>
            <div onClick={(e)=>{routeBackFuntion()}} className='w-[30px] h-[30px]'>
                <Image src="/Arrow2.svg" width="100%" height="100%" />
            </div>
            <div className='mt-1 text-2xl font-bold'>
                <FontTitle marginTop="" textSize="text-xl" />
            </div>
            
            <div onClick={(e)=>{routeUpLoadFuntion()}} className='rounded-2xl w-[60px] flex justify-center items-center bg-red-600 text-white' id="testForm"> 
                수정
            </div>
      </div>
      
      <div className='flex justify-end ml-5 mr-5 mt-10 font-sans text-bold'>
        {nowTime}
      </div>

      {<div className='flex justify-center mt-12'>
        <div className='w-[250px] h-[250px] relative' >
          <Image className={'rounded-2xl shadow-2xl'} src={query["img"]} layout="fill" />
        </div>
      </div>}
      
      <div className=' flex justify-center min-h-[200px] bg-neutral-200 mt-10 ml-5 mr-5 rounded-2xl'>
        <div className='h-full'>
          {Chart()}
        </div>
      </div>

          
      <div className=' flex-col item justify-center bg-neutral-200 mt-10 rounded-2xl ml-5 mr-5'>
        <div className='items-center justify-center flex font-["Jalnan"]'>📌 Ya---M 일기</div>
        <div className='mt-7 items-center justify-center flex'>{query["memo"]}</div>
      </div>
    </div>
  )
}

export default withRouter(FoodInFoFoodName);