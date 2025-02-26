import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { DateTime } from 'luxon';


function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(DateTime.now().startOf('month'));

  const daysInMonth = currentMonth.daysInMonth;
  const firstDayOfMonth = currentMonth.weekday; // 1 for Monday, 7 for Sunday

  const getDayNumber = (dayIndex) => {
    const day = dayIndex - firstDayOfMonth + 1;
    return (day > 0 && day <= daysInMonth) ? day : '';
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.minus({ months: 1 }).startOf('month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.plus({ months: 1 }).startOf('month'));
  };

  const days = Array.from({ length: 42 }, (_, i) => i - firstDayOfMonth + 1);

  return (
    <div>
      <img src={logo} className="App_logo" alt="logo" />
      <h2>{currentMonth.toFormat('MMMM yyyy')}</h2>
      <button onClick={handlePrevMonth}>Prev</button>
      <button onClick={handleNextMonth}>Next</button>
      <div className="calendar-grid">
        <div style={{color: "#002D74"}}>Sun</div>
        <div style={{color: "#002D74"}}>Mon</div>
        <div style={{color: "#002D74"}}>Tue</div>
        <div style={{color: "#002D74"}}>Wed</div>
        <div style={{color: "#002D74"}}>Thu</div>
        <div style={{color: "#002D74"}}>Fri</div>
        <div style={{color: "#002D74"}}>Sat</div>
        {days.map((day, index) => (
          <div key={index} className="calendar-day">
            {getDayNumber(index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;