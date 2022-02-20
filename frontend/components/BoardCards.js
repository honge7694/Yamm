import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import ImageItem from '../components/ImageItem';
import ExtraMenuModal from '../components/ExtraMenuModal';
import BoardTitle from '../components/BoardTitle';
import { useRouter } from 'next/router';
// flex 말고 grid를 써야하나?
const boardTitleExtraMenuWrap1 = "flex justify-between mt-1";
const boardTitleExtraMenuWrap = "";

export default function BoardCards({ image, boardTitle, classNameCSS, content, idx, hit }){
    const contentLength = useMemo(()=>{
        console.log(content.length,'here')
        if (content.length < 20){
            return "min-h-[4px]";
        }else if(content.length >= 20 && content.length < 50){
            return "min-h-[8px]";
        }else if(content.length >= 51 && content.length < 100){
            return "min-h-[12px]";
        }else{
            return "min-h-[25px]";
        }
    },[]);
    const router = useRouter();
    const routeFuntion = () => {
        router.push({
            pathname : `/community/board/${idx}`,
            query: { "image": image, "hit" : hit, "content" : content, "idx" : idx } 
        });
    }

    return (
        <div onClick={(e)=>{routeFuntion()}} className='mt-[5px]'>
          <div className={classNameCSS}>
              {/* API 호출 후 10개 씩 BORAD CARD IMAGE 받아온다 */}
              <ImageItem image={image} contentLength={contentLength} />
              
      
              <div className={boardTitleExtraMenuWrap1}>
                  <BoardTitle boardTitle={boardTitle}>
                  </BoardTitle>
                  {/* CSS margin 겹침 현상 ?? 모르겠음 */}
                  <ExtraMenuModal>
                  </ExtraMenuModal>
              </div>
              <div className={contentLength}></div>
          </div>
        </div>
    );
}