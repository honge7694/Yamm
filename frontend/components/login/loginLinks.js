import { useState } from 'react';
import FontTitle from '../font/fontTitle';
import SignUpModal from './signup/signupmodal';
import Image from 'next/image';
import Router from 'next/router';

export default function LoginLinks() {

  const [isSignUpModal, isSetSignUpModal] = useState(undefined); 
  const routeGitLink = () => {
    Router.push('https://kdt-gitlab.elice.io/ai_track/class_03/ai_project/team15/project-endingCredit')
  }
  return (
    <>
    <div className=' ml-5 mr-5 mt-5 flex justify-center overflow-hidden'>
      {/* grid flex 같이 써도 괜찮은 건가.. ? */}
      <div className='fixed bottom-8'>
        <div className="grid grid-cols-6 grid-flow-row gap-5 w-full">
          <div className='col-span-2 flex justify-center mt-1'><FontTitle marginTop="" textSize="text-sm" /></div>
          <div onClick={routeGitLink} className='col-span-2 flex justify-center gap-2'>
            <div className=' relative w-5 h-5 mt-1'>
              <Image src="/twitter.svg" layout="fill" />
            </div>
            <div className='  relative w-5 h-5 mt-1'>
              <Image src="/github.svg" layout="fill" />
            </div>
            <div className=' relative w-5 h-5 mt-1'>
              <Image src="/myinfo.svg" layout="fill" />
            </div>
          </div>
          <div className='col-span-2 flex justify-center' onClick={(e)=>{isSetSignUpModal(true)}}>회원가입</div>
          
          {/* 추후에 아이디 비밀번호 찾기 추가! <div className='col-span-3 flex justify-center w-full h-full'>
            <FontTitle marginTop="" textSize="text-sm" />
          </div>
          <div className='col-span-3 flex justify-center'>
            링크
          </div> */}
        </div>

      </div>  
    </div>
    { isSignUpModal && <SignUpModal isSetSignUpModal={isSetSignUpModal} isSignUpModal={isSetSignUpModal} />}
    
    </>
  );
}