import BoardCards from '../components/BoardCards';
import { memo, useCallback, useEffect, useMemo, useState, useRef } from "react";
import Loader from "../components/Loader";
import Dummy from '../components/Dummy';
import BottomNav from '../components/BottmNav/BottomNav';

const targetCSS = "w-screen h-[140px] flex justify-center text-center items-center";
const container = "flex";
const itemWrapper = "flex flex-col w-1/2";

const Community = ()=>{

  const bottomNav = useRef(null);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([1,2,3,4,5,6,7,8]);
   // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  });
  const listener = (e) => {
    setCurrentScrollY(-document.body.getBoundingClientRect().y);
    const scrollDirection =  (lastScrollTop < currentScrollY ? "down" : "up");
    setLastScrollTop(currentScrollY);
    (scrollDirection == "down" ? bottomNav.current.className = 'hidden fixed top-0 left-0 right-0' : bottomNav.current.className = 'animate-[wiggle_1s_ease-in-out] fixed left-1/4 bottom-20') 
  };

  const itemListMap = useMemo(() => {
    console.log("re", itemLists)
    let oddResult =  itemLists.map((v, i) => {
      if(i%2!=0){
        return <BoardCards classNameCSS="m-2" number={i + 1} key={i} image="/vercel.svg" boardTitle={i+" 번째 게시글"} />;
      }
    });
    let evenResult =  itemLists.map((v, i) => {
      if(i%2==0){
        return <BoardCards classNameCSS="m-2" number={i + 1} key={i} image="/vercel.svg" boardTitle={i+" 번째 게시글"}  />;
      }
    });
    return [evenResult, oddResult];
  }, [itemLists]);
  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // API 호출로 수정
    let Items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    setItemLists((itemLists) => itemLists.concat(Items));
    //console.log("www", itemLists)
    setIsLoaded(false);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.4, });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      
      <div ref={bottomNav} className='hidden'>
        <div>Y offset : {currentScrollY}</div>
        <BottomNav></BottomNav>
      </div>
      {/* Dummy.js 에서 함수 받아 와서 itemList 들어 있는 배열 가져 올 것, API 비동기 처리 할 것  */}
      <Dummy>
      </Dummy>
      {/* 두개로 받아서 성능 이슈 map 함수 하나로 할 것 */ }
      <div className={container} >
        <div className={itemWrapper} >
          {itemListMap[0]/* 짝수 번째 게시글*/ }
        </div>
        <div className={itemWrapper} >
          {itemListMap[1]/* 홀수 번째 게시글*/}
        </div>
      </div>

      <div className={targetCSS} ref={setTarget} >
          {isLoaded && <Loader /> /* 로딩 */}
      </div>
    </>
  );
};

export default memo(Community);
