import React, { useState,forwardRef } from "react";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import renderDay from './renderDay';

export default function Calendar() {

  return (
      <div className=" w-full  flex justify-center mt-11">
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

