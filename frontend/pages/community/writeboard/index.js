// import TopNav from '../board/TopNav';
import TopNav from '../../../components/login/topnav';
import BoardImage from '../board/BoardImage';
import ProfileTag from '../board/ProfileTag';
import BoardContent from '../board/BoardContent';
import { withRouter, useRouter } from 'next/router';
import BottomNav from '../../../components/BottmNav/BottomNav';
import React, { useState } from 'react';
import UpLoadImg from '../../../components/community/writeboard/uploadimg';
import TagModal from '../../../components/TagModal/TagModal';
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';
const WriteBoard = (props) => {
    const author = useSelector((state)=>(state.user.user["pk"]))
    const [selectedFile, setSelectedFile] = useState(null);
    const router = useRouter();
    const [toggleProfileTag, setToggleProfileTag] = useState(false);
    const onclickEmoji = (e) => {
        setInputValue({
            ...inputValue,
            ["tags"] : e.target.innerText 
          });
        // console.log(e.target.innerText)
    }
    const imoji = ["😀", "😱", "❤️", "🥳", "😇","😈", "😭", "👋", "☂️", "🔥", "🌟", "⛅️"];
    const menuList = imoji.map((item, i) => (<div key={i} onClick={onclickEmoji} className=' w-1/4 h-[50px] bg-white bg-opacity-70  drop-shadow-lg text-2xl flex justify-center items-center'>{item}</div>));
    
    const [inputValue, setInputValue] = useState({
        "title" : "",
        "content" : "",
        "create_date" : "",
        "tags" : "" 
      });
    const onChange = (e) => {
      console.log(e.target.id, e.target.value)
      setInputValue({
        ...inputValue,
        [e.target.id] : e.target.value 
      });
    }

    const handleSubmit = async () => {
        // event.preventDefault()
        const formData = new FormData();
        formData.append("title", inputValue["title"]);
        formData.append("content", inputValue["content"]);
        formData.append("create_date", inputValue["create_date"]);
        formData.append("tags", inputValue["tags"]);
        formData.append("author", author);
        formData.append("img", selectedFile);
        for(var pair of formData.entries()) console.log(pair); 
    
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:8000/boards/",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res)=>{
            console.log(res,"제출성공!!")
          });
        } catch(error) {
          console.log(error)
        }
    }

    return (
        <div className="">
            {console.log(author,"sdsd")}
            <TopNav />
            {/* <BoardImage imageUrl={image} /> */}
            <UpLoadImg setSelectedFile={setSelectedFile} handleSubmit={handleSubmit} />
            <div className=' bg-white mr-5 ml-5'>
            <div className="grid grid-cols-6 grid-flow-row gap-3 mt-6">
          <div className=" row-span-1 mt-1 col-span-1 font-['Jalnan'] rounded-full bg-neutral-200 h-[50px] w-[50px] flex justify-center items-center" >
            <div className='relative flex justify-center items-center w-full h-full'>
                사진
            </div>
          </div>
          <div className=" col-span-4 px-1" >
            <input onChange={onChange}  className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none  focus:border-yellow1 focus:ring-yellow1 focus:border-2 focus:shadow-outline" id="create_date" type="text" placeholder="YYYY-MM-DD"></input>
          </div>
            
          <div className=" col-span-1 flex items-center  pr-1 justify-end" >
            <TagModal setToggleProfileTag={setToggleProfileTag} toggleProfileTag={toggleProfileTag}/>
          </div>
        </div>
            </div>
            { 
                toggleProfileTag &&
                    <div className='mr-5 ml-5 mt-8'>
                        <div className=' flex flex-wrap  w-full bg-gray-200 p-6 rounded-2xl'>
                                {menuList}
                        </div>
                        
                    </div>
            }
        
        <div className=' mt-8 rounded-xl bg-neutral-200 flex items-center justify-center ml-5 mr-5 p-3 ' >
          <input onChange={onChange} className="h-[30px] bg-white p-3 break-words w-11/12 placeholder:italic placeholder:text-center placeholder:text-slate-400 " id='title' placeholder='제목을 입력해 주세요'>
          </input>
        </div>

        <div className=' mt-8 rounded-xl bg-neutral-200 flex items-center justify-center ml-5 mr-5 p-3 ' >
          <textarea onChange={onChange} className="h-[100px] focus:h-[170px] bg-white p-3 break-words w-11/12 placeholder:italic placeholder:text-center placeholder:text-slate-400 " id='content' placeholder='올리실 글을 작성해 주세요!'>
            
          </textarea>
        </div>
        <div className='hidden'>
              <BottomNav></BottomNav>
            </div>
        </div>
    );
} 

export default WriteBoard;