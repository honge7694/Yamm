import Image from 'next/image';

const imageWrap ="rounded-2xl border-indigo-500 bg-gray-500 w-full h-full relative min-h-[250px] ml-5 mr-5 mt-10";

const BoardImage = ({ imageUrl }) => {
    return (
        <div className='flex justify-center'>
          <div className={imageWrap}>
            <Image className={'rounded-2xl'} src={imageUrl} layout={"fill"}  />
          </div>
        </div>
        
    );
};

export default BoardImage;