import TopNav from '../board/TopNav';
import BoardImage from '../board/BoardImage';
import ProfileTag from '../board/ProfileTag';
import BoardContent from '../board/BoardContent';
import { withRouter, useRouter } from 'next/router';
import BottomNav from '../../../components/BottmNav/BottomNav';
import React, { useState } from 'react';
import UpLoadImg from '../../../components/community/writeboard/uploadimg';

// API(BE->FE) title, nick, content, tag, foodImg
// SEO router.push 안쓰고 Link 쓴다 ?

const WriteBoard = (props) => {
    const router = useRouter();
    // idx는 API 요청 할 때 쓸 것
    const {idx, image, hit, content } = router.query;
    const [toggleProfileTag, setToggleProfileTag] = useState(false);
    const onclickEmoji = (e) => {
        console.log(e.target.innerText)
    }
    const imoji = ["😀", "😱", "❤️", "🥳", "😇","😈", "😭", "👋", "☂️", "🔥", "🌟", "⛅️"];
    const menuList = imoji.map((item, i) => (<div key={i} onClick={onclickEmoji} className=' w-1/4 h-[50px] bg-white bg-opacity-70  drop-shadow-lg text-2xl flex justify-center items-center'>{item}</div>));
    
    return (
        <div className="">
            <TopNav />
            {/* <BoardImage imageUrl={image} /> */}
            <UpLoadImg />
            <div className=' bg-white mr-5 ml-5'>
              <ProfileTag hit={hit} setToggleProfileTag={setToggleProfileTag} toggleProfileTag={toggleProfileTag}/>
            </div>
            { 
                toggleProfileTag &&
                    <div className='mr-5 ml-5 mt-8'>
                        <div className=' flex flex-wrap  w-full bg-gray-200 p-6 rounded-2xl'>
                                {menuList}
                        </div>
                        
                    </div>
            }
        
        <div className=' mt-8 rounded-xl bg-neutral-200 flex items-center justify-center ml-5 mr-5 p-3' >
          <textarea className="h-[100px] focus:h-[170px] bg-white p-3 break-words w-11/12 placeholder:italic placeholder:text-center placeholder:text-slate-400 " placeholder='올리실 글을 작성해 주세요!'>
            
          </textarea>
        </div>
            
            <div className=''>
              <BottomNav></BottomNav>
            </div>
        </div>
    );
} 

export default WriteBoard;