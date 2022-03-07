import { useState } from 'react';
import FontTitle from '../font/fontTitle';
import SignUpModal from './signup/signupmodal';
export default function LoginLinks() {

  const [isSignUpModal, isSetSignUpModal] = useState(false); 

  return (
    <>
    <div className=' ml-5 mr-5 mt-5 flex justify-center overflow-hidden'>
      {/* grid flex 같이 써도 괜찮은 건가.. ? */}
      <div className='fixed bottom-8'>
        <div className="grid grid-cols-6 grid-flow-row gap-2 w-full">
          <div className='col-span-2 flex-col'>아이디 찾기</div>
          <div className='col-span-2 flex justify-center'>비밀번호 찾기</div>
          <div className='col-span-2 flex justify-center' onClick={(e)=>{isSetSignUpModal(true)}}>회원가입</div>
          <div className='col-span-3 flex justify-center w-full h-full'>
            <FontTitle marginTop="" textSize="text-sm" />
          </div>
          <div className='col-span-3 flex justify-center'>
            링크
          </div>
        </div>

      </div>  
    </div>
    { isSignUpModal && <SignUpModal isSetSignUpModal={isSetSignUpModal} />}
    
    </>
  );
}