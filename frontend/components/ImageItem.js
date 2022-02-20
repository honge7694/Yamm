import Image from 'next/image';

const imageWrap ="rounded-md border-indigo-500 bg-gray-500";
const ImageItem = ({ image }) => {
    return (
        <>
            <div className={imageWrap}>
                <Image src={image} width="100%" height="100%" />
            </div>
        </>
    );
}

export default ImageItem;