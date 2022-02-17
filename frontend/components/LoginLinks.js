import tw from "twin.macro";

export default function LoginLinks() {
  return (
    <div>
      <div className='flex justify-center'>
        <div class="grid grid-cols-3 divide-x-8 mt-[600px] text-sm">
          <div className=''>아이디 찾기</div>
          <div>비밀번호 찾기</div>
          <div>회원가입</div>
        </div>
      </div>
    </div>
  );
}