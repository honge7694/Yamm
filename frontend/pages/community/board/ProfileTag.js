import TagModal from '../../../components/TagModal/TagModal';
import Image from 'next/image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ProfileTag = ({ hit, setToggleProfileTag, toggleProfileTag, profile_img, nickname, reaction, tag, idx }) => {
  const  { user, accessToken }   = useSelector((state) => state.user);
  const [count, setCount] = useState(2);
  const [like, setLike] = useState(parseInt(reaction));
  const likeFunction = async () => {
    try{
      
      const formData = new FormData();
      formData.append("user", user["pk"]);
      formData.append("post", idx);
      for(var pair of formData.entries()){
        console.log(pair); 
      } 
    
      await axios({
        method: "post",
        url: `http://localhost:8000/boards/${idx}/reaction`,
        data: formData,
        headers: { "Authorization": `Bearer ${accessToken}` },
      })
      if(count%2==0){
        setLike(like+1);
        // console(like, count);
        setCount(count+1);
      }else{
        setLike(like-1);
        // console.log(like,count, "ere)")
        setCount(count+1);
      }
      console.log("좋아요 성공!",reaction)
    }catch(e){
      console.log("좋아요 error")
    }
  }
  
  return (
      <div className='mr-5 ml-5 mt-8 '>
        <div className="grid grid-cols-6 grid-flow-row gap-3 mt-6">
          <div className=" row-span-1 col-span-1 font-['Jalnan'] rounded-full bg-neutral-200 w-[50px] h-[50px] flex justify-center items-center" >
            <div className='relative w-full h-full'>
              <Image className=' rounded-full' src={`http://localhost:8000/media/${profile_img}`} layout={"fill"} />
            </div>
          </div>
          <div className=" col-span-3 ml-3" >
            <div className='font-["Jalnan"]'> {nickname} </div>
            <div className=' flex '>
              <div className='font-["Jalnan"] mr-2'>Y-am : {like} </div>
              <div onClick={likeFunction}>❤️</div>
            </div>
          </div>
            
          <div className=" col-span-2 flex items-center text-xl pr-1 justify-end" >
            <div className=' flex justify-end'>{tag}</div>
            {/* <TagModal setToggleProfileTag={setToggleProfileTag} toggleProfileTag={toggleProfileTag}/> */}
          </div>
        </div>

        {/* <div className='  w-full mt-2 p-1 rounded-lg shadow-sm pl-1 overflow-auto'>{tag}</div> */}
      </div>
    );
};

export default ProfileTag;