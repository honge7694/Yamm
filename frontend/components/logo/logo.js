import { useEffect, useRef } from 'react';
import lottie from "lottie-web";
const Logo = ()=>{
    //lottie

 const likecontainer = useRef();
 useEffect(()=>{
   lottie.loadAnimation({
     container: likecontainer.current,
     renderer: 'svg',
     loop: true,
     autoplay:true,
     animationData:require("/Users/PC/Downloads/logo1.json")
   },[])

 },[])
   return(
       <div className='w-[100px] h-[100px]'>
           <div className='w-full h-full ' ref={likecontainer}></div>
       </div>
   )
}

export default Logo;