import Image from 'next/image';
import { useRouter } from 'next/router';

const MyInfo = () => {
    const router = useRouter();
    const routeFuntion = () => {
        router.push('/myInfo')
    }
    return (
        <div onClick={(e)=>{routeFuntion();}}>
            <Image src="/myInfo.svg" width="100%" height="100%" />
        </div>
    );
}

export default MyInfo;