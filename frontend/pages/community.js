import BoardCards from '../components/BoardCards';
import { memo, useCallback, useEffect, useMemo, useState, useRef } from "react";
import Loader from "../components/Loader";
import Dummy from '../components/Dummy';
import BottomNav from '../components/BottmNav/BottomNav';
import { dataDummy } from '../components/Dummy';
import axios from 'axios';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const targetCSS = "w-screen h-[140px] flex justify-center text-center items-center";
const container = "flex";
const itemWrapper = "flex flex-col w-1/2";

const Community = ()=>{
  const { accessToken } = useSelector((state)=>(state.user))
  const bottomNav = useRef(null);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState(dataDummy);

  const [itemLoading, setItemLoading] = useState(true);
  const [boardItem, setBoardItem] = useState([]);
   // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  });
  const listener = (e) => {
    setCurrentScrollY(-document.body.getBoundingClientRect().y);
    const scrollDirection =  (lastScrollTop < currentScrollY ? "down" : "up");
    setLastScrollTop(currentScrollY);
    (scrollDirection == "down" ? bottomNav.current.className = 'hidden' : bottomNav.current.className = 
    '') 
  };

  const itemListMap = useMemo(() => {
    let oddResult =  boardItem.map((item, i) => {
      if( item.images[0] == undefined){
        console.log("sdsdadasd")
      }
      if(i%2!=0){
        return <BoardCards classNameCSS="ml-2 mr-2" key={i} image={`http://localhost:8000${item.images[0]["img"]}`}  boardTitle={item.title} content={item.content} idx={item.id} hit={"12"} />
        // return <BoardCards classNameCSS="ml-2 mr-2" key={i} image={itemLists[i]["foodImg"]} boardTitle={itemLists[i]["title"]} content={itemLists[i]["content"]} idx={itemLists[i]["idx"]} hit={itemLists[i]["hit"]} />;
      }
    });
    let evenResult =  boardItem.map((item, i) => {
      if(i%2==0){
        return <BoardCards classNameCSS="ml-2 mr-2" key={i} image={`http://localhost:8000${item.images[0]["img"]}`}  boardTitle={item.title} content={item.content} idx={item.id} hit={"12"} />
        // return <BoardCards classNameCSS="ml-2 mr-2" key={i} image={itemLists[i]["foodImg"]} boardTitle={itemLists[i]["title"]} content={itemLists[i]["content"]} idx={itemLists[i]["idx"]} hit={itemLists[i]["hit"]} />;
      }
    });
    return [evenResult, oddResult];
  }, [itemLists, boardItem]);
  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // API 호출로 수정
    let Items = dataDummy;
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
  
  useEffect(()=>{
    axios.get('http://localhost:8000/board/')
    .then((res)=>{
      console.log(res.data)
      setBoardItem([...res.data]);
      setItemLoading(false);
    })
    .catch(error => console.log(error))
    
  },[]);
  console.log(boardItem,"ere")

  useEffect(()=>{
    if(accessToken){
      console.log(accessToken,'56567')
      // fetch("http://127.0.0.1:8000/user/info/", {
      //   method: "GET",
      //   headers: {
      //     "Authorization": accessToken,
      //   },
      // }).then((response) => console.log(response))
      // .catch((err)=>{console.log(err)});
      axios.get("http://127.0.0.1:8000/user/info/", {}, {
        Authorization : {
          accessToken
        }
      })
      .then((res)=>{
        console.log(res,'kkkkkkkkkkkk')
        return res.status;
      })
      .catch(error => {
        console.log(error.response,'ssssss')
        return error.response.data;
      });
    
    }
  }, [accessToken])


  return (
    <>
      
      <div ref={bottomNav} className='hidden'>
        <BottomNav></BottomNav>
      </div>
      {/* Dummy.js 에서 함수 받아 와서 itemList 들어 있는 배열 가져 올 것, API 비동기 처리 할 것  */}
      {/* 두개로 받아서 성능 이슈 map 함수 하나로 할 것 */ }
      {itemLoading === false && (<div className={container} >
          <div className={itemWrapper} >
            {itemListMap[0]}
          </div>
          <div className={itemWrapper} >
            {itemListMap[1]}
          </div>
        </div>)}
        <div>sdss</div>

      {/* <div className={targetCSS} ref={setTarget} >
          {isLoaded && <Loader /> }
      </div> */}

    </>
  );
};

export default memo(Community);

