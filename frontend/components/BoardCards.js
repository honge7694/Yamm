import Image from 'next/image';
import ImageItem from '../components/ImageItem';
import ExtraMenuModal from '../components/ExtraMenuModal';
import BoardTitle from '../components/BoardTitle';

const boardTitleExtraMenuWrap = "flex justify-between";
export default function BoardCards({ image, boardTitle, classNameCSS }){
    return (
        <div className={classNameCSS}>
            {/* API 호출 후 10개 씩 BORAD CARD IMAGE 받아온다 */}
            <ImageItem image={image}>
            </ImageItem>

            <div className={boardTitleExtraMenuWrap}>
                <BoardTitle boardTitle={boardTitle}>
                </BoardTitle>
                <ExtraMenuModal>
                </ExtraMenuModal>
            </div>
        </div>
    );
}