const BoardContent = ({ content }) => {
    return (
        <div className=' mt-16 rounded-xl bg-neutral-200 flex justify-center ml-5 mr-5 p-5' >
          <div class="break-all ">
            <h3>{content+""}</h3>
          </div>
        </div>
    );
}

export default BoardContent;