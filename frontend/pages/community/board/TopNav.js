import Image from 'next/image';
import { useRouter } from 'next/router';
import FontTitle from '../../../components/font/fontTitle';

const TopNav = ({ fixRoute }) => {
    const router = useRouter();
    const routeFuntion = () => router.push({ pathname : `/community`, });

    return (
        <div className='flex justify-between m-5'>
            <div onClick={(e)=>{routeFuntion()}} className='w-[30px] h-[30px]'>
                <Image src="/Arrow2.svg" width="100%" height="100%" />
            </div>
            <div className='mt-1 text-2xl font-bold'>
                <FontTitle marginTop="" textSize="text-xl" />
            </div>
            <div onClick={fixRoute} className=' rounded-2xl w-[60px] flex justify-center items-center bg-red-600 text-white'>
                수정
            </div>
        </div>
    );
};

export default TopNav;