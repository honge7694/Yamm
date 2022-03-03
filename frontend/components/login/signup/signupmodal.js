const extraMenuModalContainer = "w-screen h-screen bg-gray-100 z-10 fixed top-0 left-0 flex justify-center bg-opacity-60";

// email, password, name, nick, profileImg

const SignUpModal = ({ isSetSignUpModal }) => {

return (
    <div onClick={(e)=>{isSetSignUpModal(false)}} className={extraMenuModalContainer}>
      <div onClick={(e)=>{e.stopPropagation();}} className="w-screen fixed p-5 rounded-xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <form className=" bg-white shadow-md rounded px-8 pt-6 pb-8 ">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              이메일
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="이메일 입력"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              비밀번호
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*******"/>
            <p className="text-red-500 text-xs italic">이메일 비밀번호는 필수 사항입니다.</p>
          </div>
          <div className="flex items-center justify-between">
            <button className="w-full bg-yellow1 hover:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              가입
            </button>
          </div>
        </form>
      </div>
        
    </div>
    );
};

export default SignUpModal;