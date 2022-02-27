import React, { useState,forwardRef } from "react";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Link from "next/link";

// API 로 수정 할 것
const birthdays = {
  26: [''],
};

function renderDay(day) {
  const date = day.getDate();
  
  return (
    
    <div className="h-[30px] w-[30px] relative">
      
      <div className=" bottom-0 right-0 text-sm flex items-center">{date}</div>
      {birthdays[date] &&
        birthdays[date].map((name, i) => (
          <Link key={i}  href={{
            pathname: '/todayfoodeatdetail/',
            query: {  },
          }} >
            <a key={i}>
              <div className="break-before-column bg-yellow1 text-left text-xs flex justify-center">📌</div>
            </a>
          </Link>
        ))}
    </div>
  );
}
export default function Calendar() {
  return (
      <div className=" w-full  flex justify-center mt-10">
        <div className="w-5/6  flex justify-center">
          <DayPicker
          canChangeMonth={true}
          className="Birthdays"
          renderDay={renderDay}
          />
        </div>
      </div>
  );
}