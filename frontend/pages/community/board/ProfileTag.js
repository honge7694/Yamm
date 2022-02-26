import TagModal from '../../../components/TagModal/TagModal';

const ProfileTag = ({ hit }) => {
    return (
        <div className='mr-5 ml-5 mt-7'>
        <div className="grid grid-cols-6 grid-flow-row gap-3 mt-6">
          <div className=" row-span-1 col-span-1 font-['Jalnan'] rounded-full bg-neutral-200 w-[50px] h-[50px] flex justify-center items-center" >
            <div>사진</div>
          </div>
          <div className=" col-span-4 ml-3" >
            <div className='font-["Jalnan"]'>닉네임</div>
            <div className='font-["Jalnan"]'>Y-am : {hit} 💚</div>
          </div>
          <div className=" col-span-1 flex items-center " >
            <TagModal></TagModal>
          </div>
        </div>
        </div>
    );
};

export default ProfileTag;