import TopNav from './TopNav';
import BoardImage from './BoardImage';
import ProfileTag from './ProfileTag';
import BoardContent from './BoardContent';
import { withRouter, useRouter } from 'next/router';
import BottomNav from '../../../components/BottmNav/BottomNav';
import React, { useState } from 'react';
import Router from 'next/router';

// API(BE->FE) title, nick, content, tag, foodImg
// SEO router.push 안쓰고 Link 쓴다 ?

const Idx = (props) => {
    const router = useRouter();
    // idx는 API 요청 할 때 쓸 것
    const {idx, image, hit, content, tag, profile_img, nickname, reaction, boardTitle, create_date} = router.query;
    const [toggleProfileTag, setToggleProfileTag] = useState(false);
    const onclickEmoji = (e) => {
        console.log(e.target.innerText)
    }
    const imoji = ["😀", "😱", "❤️", "🥳", "😇","😈", "😭", "👋", "☂️", "🔥", "🌟", "⛅️"];
    const menuList = imoji.map((item, i) => (<div key={i} onClick={onclickEmoji} className=' w-1/4 h-[50px] bg-white bg-opacity-80  drop-shadow-lg text-2xl flex justify-center items-center'>{item}</div>));
    const fixRoute = () => {
        Router.push({
            pathname : `/community/writeboard/fix`,
            query: { "idx" : idx, "title" : boardTitle, "content" : content, "tags" : tag, "img" : image, "create_date" : create_date  } 
        });
    }
    
    return (
        <div className="">
            <TopNav fixRoute={fixRoute}/>
            <BoardImage imageUrl={image} />
            <ProfileTag hit={hit} setToggleProfileTag={setToggleProfileTag} toggleProfileTag={toggleProfileTag} profile_img={profile_img} nickname={nickname} reaction={reaction} tag={tag} idx={idx}/>
            { 
                toggleProfileTag &&
                    <div className='mr-5 ml-5 mt-8'>
                        <div className=' flex flex-wrap  w-full bg-gray-200 p-6 rounded-2xl'>
                                {menuList}
                        </div>
                        
                    </div>
            }
            <BoardContent content={content} />
            {console.log(router .query)}
            <div className=''>
              <BottomNav></BottomNav>
            </div>
        </div>
    );
} 

export default withRouter(Idx);