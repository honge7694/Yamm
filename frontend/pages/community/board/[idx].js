import TopNav from './TopNav';
import BoardImage from './BoardImage';
import ProfileTag from './ProfileTag';
import BoardContent from './BoardContent';
import { withRouter, useRouter } from 'next/router';

// API(BE->FE) title, nick, content, tag, foodImg
// SEO router.push 안쓰고 Link 쓴다 ?
const Idx = (props) => {
    const router = useRouter();
    const {idx, image, hit, content } = router.query;
    return (
        <div>
            { console.log(idx,"idxsss")}
            { console.log(router.query)}
            <TopNav />
            <BoardImage imageUrl={image} />
            <ProfileTag />
            <BoardContent content={content} />
        </div>
    );
} 

export default withRouter(Idx);