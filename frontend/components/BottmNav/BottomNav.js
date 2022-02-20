import BottomNavHome from './BottomNavHome';
import BoardOrder from './BoardOrder';
import MyInfo from './MyInfo';

const BottomNav = () => {
    return (
        <div className='bg-slate-500 flex justify-center'>
            <div className='w-[45px] h-[17px] flex flex-row bg-blue-400'>
                <BottomNavHome></BottomNavHome>
                <BoardOrder></BoardOrder>
                <MyInfo></MyInfo>
            </div>
        </div>
    );
}

export default BottomNav;