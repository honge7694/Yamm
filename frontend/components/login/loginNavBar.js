import React, { useCallback, useState } from 'react';
import LoginLinks from './loginLinks';
import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import useInput from '../../hooks/useInput';
import { useSelector } from 'react-redux';
import FontTitle from '../font/fontTitle';
import TopNav from './topnav';
import LoginForm from './loginform';
import { useRouter } from "next/router";
import TestForm from './testform';

export default function LoginNavbar() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const  { accessToken }   = useSelector((state) => state.user);
  const router = useRouter();
  // setemail 해도 useCallback 에 추가해 주지 않으면 값 바뀌지 않는지 질문!
  // 버튼 눌려 있어서 다른 곳 클릭해야 하는데 왜 그런지 질문
  const onSubmit = useCallback(() => {
    console.log("dispath-loginRequestAction", email, password , accessToken)
    dispatch(loginRequestAction({ email, password }));
    if(accessToken != null) router.push(router.query["url"]);
  }, [password, email, accessToken]);

  return (
    <div>
      <TopNav/>
      <FontTitle marginTop="mt-8" textSize="text-3xl" />
      { <LoginForm onSubmit={onSubmit} setEmail={setEmail} setPassword={setPassword} /> }
      {/* <TestForm /> */}
      <LoginLinks />
    </div>
  );
}