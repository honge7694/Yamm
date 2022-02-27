import Image from 'next/image';

const TopNav = () => {
    return (
        <div className='flex justify-between' >
          <div className='relative h-[30px] w-[30px] mt-[28px] ml-[28px]'>
            <Image src={"/Arrow2.svg"} layout={"fill"} />
          </div>
          <div className='relative h-[30px] w-[30px] mt-[28px] mr-[28px]'>
            <Image src={"/HambergerMenu.svg"} layout={"fill"}/>
          </div>
        </div>
    );
};

export default TopNav;