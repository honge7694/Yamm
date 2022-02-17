import React, { useState,forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar() {

    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <button className="bg-main p-2 rounded-3xl" onClick={onClick} ref={ref}>
        {value}
      </button>
    ));
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<ExampleCustomInput />}
        popperPlacement=""/>
    );
  };