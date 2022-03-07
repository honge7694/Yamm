import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';

const BoardTest = () => {

    const router = useRouter();
    const  { accessToken }   = useSelector((state) => state.user);
    const routeCommunity = () => {
      
      if (true) { 
        router.push({
          pathname: '/community',
          query : { "url" : "/community" }
      })}else{
        router.push("/community");
      }
    }

    return (
        <div>
            <div className="font-bold px-8 pt-6 pb-2 text-xl">
                <p>커뮤니티</p>
            </div>

            <div className="min-h-[250px] px-8 flex-col items-center justify-center flex" onClick={(e)=>{routeCommunity()}}>
                <div className=" w-4/6 rounded-xl bg-gray-200">
                    <div className="flex w-full">
                        <div className=" w-1/2 justify-center flex m-5">
                            <Image className="rounded-2xl" src="/asset/떡볶이.png" width="100" height="100%" />
                        </div>
                        <div className="w-1/2 justify-center flex m-5">
                            <Image className="rounded-2xl" src="/asset/갈비.png" width="100" height="100%" />
                        </div>
                    </div><div className="flex w-full">
                        <div className=" w-1/2 justify-center flex m-5">
                            <Image className="rounded-2xl" src="/asset/돈까스.png" width="100" height="100%" />
                        </div>
                        <div className=" w-1/2 justify-center flex m-5">
                            <Image className="rounded-2xl" src="/asset/삼겹살.png" width="100" height="100%" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardTest;