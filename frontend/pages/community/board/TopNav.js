import Image from 'next/image';

const TopNav = () => {
    return (
        <div className='flex justify-between m-3'>
            <div className='w-[30px] h-[30px]'>
                <Image src="/home1.svg" width="100%" height="100%" />
            </div>
            <div className='mt-1 text-2xl font-bold'>
                Ya---M
            </div>
            <div className=' rounded-2xl w-[60px] flex justify-center items-center bg-red-600 text-white'>
                저장
            </div>
        </div>
    );
};

export default TopNav;