import React, {useState} from 'react'


const Memo = ({closeMemo, nowTime, date, time, changeDate}) => {
  

  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="fixed inset-2/4 -translate-x-2/4 -translate-y-2/4	w-80 h-80 bg-white rounded-3xl shadow-2xl border-solid border-4 border-main text-center">
        <div className="m-4 text-left font-bold rounded-3xl">{date}</div>

          <input type="date" value={date} min="0000-00-00" max={nowTime} onChange={changeDate}/>
          <input className="mt-2" value={date} type="time"/>

        <p className="text-left font-bold ml-10 mt-4 mb-1">메모</p>
        <form className="m-auto w-60 h-32 bg-gray-100">

          <p>
            <textarea className="m-2 bg-gray-100 outline-0 autofocus" cols="25" row="10"></textarea>
          </p>

        </form>
        <button className="w-20 h-8 text-white bg-main rounded-3xl mt-3"onClick={closeMemo}>확인</button>
      </div>
    </div>
  )
}
export default Memo