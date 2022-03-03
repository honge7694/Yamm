import React, { useCallback } from 'react';
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

  const [id, onChangeId] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();
  const isLoggedIn  = useSelector((state) => state.user.isLoggedIn);
  const router = useRouter();

  const onSubmit = useCallback(() => {
    console.log("dispath-loginRequestAction")
    dispatch(loginRequestAction({ id, password, nick, }));
    //router.push(router.query["url"]);
  }, [password]);

  return (
    <div>
      {/* {console.log(router)} */}
      <TopNav/>
      <FontTitle marginTop="mt-8" textSize="text-3xl" />
      {/* { <LoginForm onSubmit={onSubmit}/> } */}
      <TestForm />
      <LoginLinks />
    </div>
  );
}