import React, { useState,forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar() {
    
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="text-white bg-main p-2 rounded-3xl" onClick={onClick} ref={ref}>
        {value}
        </button>
    ));
    return (
      <>
        <div className="font-bold px-8 pt-6 pb-2 text-xl">
            식단 분석표
        </div>
        <div className="px-8">
          <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<ExampleCustomInput />}
          />
        </div>
      </>
    );
    };