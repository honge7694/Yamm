import Image from 'next/image';
import { useEffect, useMemo } from 'react';

const imageWrap ="rounded-2xl border-indigo-500 bg-gray-500 w-full h-full relative min-h-[120px]";
const ImageItem = ({ image, contentLength}) => {
    return (
        <>
          <div className={imageWrap}>
              <Image className={'rounded-2xl'} src={image} layout={"fill"}  />
          </div>
        </>
    );
}

export default ImageItem;