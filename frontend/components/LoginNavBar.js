import tw from "twin.macro";
import Image from 'next/image';
import styled from 'styled-components';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import LoginLinks from './LoginLinks';
import { useDispatch } from 'react-redux';
import { signUpAction } from '../reducers/user';
import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux';

const Font = styled.h1`font-family: "Jalnan"; height:35px; font-size: 35px; margin-top: 60px; color: ${(props)=>(props.color)};`;
export default function LoginNavbar() {

  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [id, onChangeId] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const bottomNav = useRef(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState(0);
  const [scrollY, setScrollY] = useState(bodyOffset.top);
  const [scrollDirection, setScrollDirection] = useState("");

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log("er")
    dispatch(signUpAction({
      id,
      password,
      nick,
    }));
  }, [password, passwordCheck, term]);

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });
  const viewDiv = ()=>{
    console.log(bottomNav.current.className);
    if (scrollDirection == "up"){
      bottomNav.current.className = 'hidden fixed top-0 left-0 right-0';
    }else{
      bottomNav.current.className = 'animate-[wiggle_1s_ease-in-out] fixed left-1/4 bottom-20';
      //bottomNav.current.className = 'fixed top-0 left-0 right-0';
    }

  }
  const listener = e => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollDirection(lastScrollTop > -bodyOffset.top ? "up" : "down");
    setLastScrollTop(-bodyOffset.top);
    viewDiv();
  };

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <div>
      <div ref={bottomNav} className='hidden'>
        <div>Y offset : {scrollY}</div>
        <div>스크롤 : {scrollDirection}</div>
      </div>
        <div css={[tw`flex justify-between`]}>
          <div css={[tw`h-[30px] w-[30px] mt-[28px] ml-[28px]`]}>
            <Image src={"/Arrow2.svg"} width={"100vh"} height={"100vh"}/>
          </div>
          <div css={[tw`h-[30px] w-[30px] mt-[28px] mr-[28px]`]}>
            <Image src={"/HambergerMenu.svg"} width={"100vh"} height={"100vh"}/>
          </div>
          
        </div>

        <div css={[tw`flex justify-center`]}>
          <Font color={"black"}>Ya</Font>
          <Font color={"#DB0007"}>-</Font>
          <Font color={"#EDA345"}>-</Font>
          <Font color={"#264A36"}>-</Font>
          <Font color={"Black"}>M</Font>
        </div>

        <div className='mt-[76px] ml-[21px] mr-[21px]'>
          <form >
            <div className='rounded-t-lg rounded-b-lg border-2 border-slate-100 py-2 pl-9 pr-3 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'>
              <div className='h-[60px]  w-full flex align-middle  '>
                <div css={[tw`h-[60px]  flex align-middle`]}>
                  <Image src={"/email.svg"} width={"30%"} height={"30%"}/>
                </div>
                <input class="placeholder:italic mr-[28px] placeholder:text-slate-400 block bg-white w-full  rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="아이디를 입력하세요" type="text" name="search"/>
              </div>
              <div css={[tw`h-[60px] w-full flex align-middle  `]}>
                <div css={[tw`h-[60px] flex align-middle`]}>
                  <Image src={"/email.svg"} width={"30%"} height={"30%"}/>
                </div>
                <input class="placeholder:italic mr-[28px] placeholder:text-slate-400 block  w-full  rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="비밀번호를 입력하세요" type="text" name="search"/>
              </div>
            </div>
          </form>

          <div className='flex justify-center mt-[45px] w-full'>
              <button onClick={()=>{onSubmit()}} className=' w-full rounded-xl hover:rounded-xl bg-[#EDA345]'>
                <p className='text-white hover:bg-green1 hover:rounded-xl'>로그인</p>
              </button>
          </div>
        </div>

        <LoginLinks />
    </div>
  );
}