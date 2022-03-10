const BoardContent = ({ content }) => {
    return (
        <div className=' mt-8 rounded-xl bg-neutral-200 flex justify-center ml-5 mr-5 p-5' >
          <div className="break-all bg-white p-5 overflow-scroll w-11/12 ">
            <h3>{content+""}</h3>
          </div>
        </div>
    );
}

export default BoardContent;