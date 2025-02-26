import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { DateTime } from 'luxon';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

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
      <h2>{currentMonth.toFormat('MMMM yyyy')}</h2>
      <button onClick={handlePrevMonth}>Prev</button>
      <button onClick={handleNextMonth}>Next</button>
      <div className="calendar-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
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