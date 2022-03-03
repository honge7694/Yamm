import React , { useState } from 'react';
import axios from 'axios';

const TestForm = () => {
    const [id, setId] = useState('');
    const onChange = (e) => {
        
        setId(e.target.value);
        console.log(e.target.value)
    }
    const submitFuction = async (e) => {
        console.log("qqq")
        e.preventDefault()
        await axios.get("/api/testid", {
            headers: {
                'Content-Type' : 'application/json'
            },
            params : {
                text : id
            }
        })
        .then((test)=>{
            console.log(test,'testform here')
        });
        console.log("yamm")
        
    }
  
    return (
        <div className="flex justify-center mt-20">
            <div className="w-full max-w-xs">
                <form onSubmit={submitFuction} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2"  htmlFor="username">
                        아이디
                      </label>
                      <input onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        패스워드
                      </label>
                      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"></input>
                      <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-center bg-gray-500 ">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        회원가입
                      </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TestForm;