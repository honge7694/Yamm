import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

const imageWrap ="rounded-2xl border-indigo-500 bg-gray-500 w-full h-full relative min-h-[120px]";
const ImageItem = ({ image, idx, hit, content}) => {
    const router = useRouter();
    const routeFuntion = () => {
        router.push({
            pathname : `/community/board/${idx}`,
            query: { "image": image, "hit" : hit, "content" : content, "idx" : idx } 
        });
    }

    return (
        <>
          <div onClick={(e)=>{routeFuntion()}} className={imageWrap}>
              <Image className={'rounded-2xl'} src={image} layout={"fill"}  />
          </div>
        </>
    );
}

export default ImageItem;