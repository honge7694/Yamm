import TopNav from './TopNav';
import BoardImage from './BoardImage';
import ProfileTag from './ProfileTag';
import BoardContent from './BoardContent';
import { withRouter, useRouter } from 'next/router';
import BottomNav from '../../../components/BottmNav/BottomNav';
import React, { useState } from 'react';

// API(BE->FE) title, nick, content, tag, foodImg
// SEO router.push 안쓰고 Link 쓴다 ?

const Idx = (props) => {
    const router = useRouter();
    // idx는 API 요청 할 때 쓸 것
    const {idx, image, hit, content } = router.query;
    const [toggleProfileTag, setToggleProfileTag] = useState(false);
    const onclickEmoji = (e) => {
        console.log(e.target.innerText)
    }
    const imoji = ["😀", "😱", "❤️", "🥳", "😇","😈", "😭", "👋", "☂️", "🔥", "🌟", "⛅️"];
    const menuList = imoji.map((item, i) => (<div key={i} onClick={onclickEmoji} className=' w-1/4 h-[50px] bg-yellow1 bg-opacity-80  drop-shadow-lg text-2xl flex justify-center items-center'>{item}</div>));
    return (
        <div className="">
            <TopNav />
            <BoardImage imageUrl={image} />
            <ProfileTag hit={hit} setToggleProfileTag={setToggleProfileTag} toggleProfileTag={toggleProfileTag}/>
            { 
                toggleProfileTag &&
                    <div className='mr-5 ml-5 mt-8'>
                        <div className=' flex flex-wrap  w-full bg-gray-200 p-6 rounded-2xl'>
                                {menuList}
                        </div>
                        
                    </div>
            }
            <BoardContent content={content} />
            
            <div className=''>
              <BottomNav></BottomNav>
            </div>
        </div>
    );
} 

export default withRouter(Idx);