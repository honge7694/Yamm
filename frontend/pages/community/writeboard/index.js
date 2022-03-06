import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';

const WriteBoard = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [id, setId] = useState('');

  const  { accessToken }   = useSelector((state) => state.user);
  const onChange = (e) => {
        
    setId(e.target.value);
    console.log(e.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log(jwt_decode(accessToken, " here token"));

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", "testTitle");
    formData.append("content", "testContent");
    formData.append("create_date", "2022-03-03 23:40:01");
    formData.append("images", selectedFile);

    for(var pair of formData.entries()) {
        console.log(pair); 
     }
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/board/boardtest/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res)=>{
        console.log(res,"writeboardAPI")
      });
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <div className='bg-gray-500'>
        <input type="text" onChange={onChange}  />
      </div>
      <div className='mt-5' >
        <button className='bg-gray-500' type="submit">회원가입</button>
      </div>
    </form>
  )
};

export default WriteBoard;