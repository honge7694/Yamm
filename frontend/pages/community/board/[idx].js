import TopNav from './TopNav';
import BoardImage from './BoardImage';
import ProfileTag from './ProfileTag';
import BoardContent from './BoardContent';
import { withRouter, useRouter } from 'next/router';
import BottomNav from '../../../components/BottmNav/BottomNav';
// API(BE->FE) title, nick, content, tag, foodImg
// SEO router.push 안쓰고 Link 쓴다 ?

const Idx = (props) => {
    const router = useRouter();
    // idx는 API 요청 할 때 쓸 것
    const {idx, image, hit, content } = router.query;
    
    return (
        <div className="">
            <TopNav />
            <BoardImage imageUrl={image} />
            <ProfileTag hit={hit}/>
            <BoardContent content={content} />

            <div className=''>
              <BottomNav></BottomNav>
            </div>
        </div>
    );
} 

export default withRouter(Idx);