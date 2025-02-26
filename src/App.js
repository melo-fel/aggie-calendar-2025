import './App.css';
import React, { useState } from 'react';
import { DateTime } from 'luxon';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(DateTime.now().startOf('month')); {/*reference to Code and Create's video*/}
  const [events, setEvents] = useState([]); {/*reference to Code and Create's video*/}
  const [selectDate, setSelectDate] = useState(null); {/*reference to Code and Create's video*/}
  const [eventTitle, setEventTitle] = useState(''); {/*reference to Code and Create's video*/}

  const firstDayIndex = currentMonth.weekday % 7;
  const daysInMonth = currentMonth.daysInMonth; {/*reference to Code and Create's video*/}

  const days = Array.from({ length: 42 }, (_, i) => i - firstDayIndex + 1);

  const eventsForDay = (date) =>
    events.filter(event => event.date === date.toISODate());

  const addEvent = (date, title) => {
    const newEvent = { date: date.toISODate(), title };
    setEvents([...events, newEvent]);
    setEventTitle('');
  };

  const handlePrevMonth = () => { {/*reference to Code and Create's video*/}
    setCurrentMonth(currentMonth.minus({ months: 1 }).startOf('month'));
    setSelectDate(null);
  };

  const handleNextMonth = () => { {/*reference to Code and Create's video*/}
    setCurrentMonth(currentMonth.plus({ months: 1 }).startOf('month'));
    setSelectDate(null);
  };

  return (
    <div>
      <img src="logo192.png" className="App_logo" alt="logo" class="center"/>
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
        {days.map((day, index) => {
          const validDay = day > 0 && day <= daysInMonth;
          const dateForCell = validDay ? currentMonth.set({ day }) : null;
          return (
            <div
              key={index}
              className="calendar-day"
              onClick={() => validDay && setSelectDate(dateForCell)}
            >
              {validDay ? day : ''}
              {validDay && eventsForDay(dateForCell).map((event, idx) => (
                <div key={idx} className="event-preview" style={{ fontSize: '0.7em', color: 'blue'}}>
                  {event.tile}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {selectDate && (
        <div className="event-modal" style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #000',
          maxWidth: '300px'
        }}>
          <h3>{selectDate.toFormat('dd LLLL yyyy')}</h3>
          <div>
            <h4>Events:</h4>
            {eventsForDay(selectDate).length > 0 ? (
              eventsForDay(selectDate).map((event, index) => (
                <p key={index}>{event.title}</p>
              ))
            ) : (
              <p>No events for this day.</p>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (eventTitle.trim()) {
                addEvent(selectDate, eventTitle);
              }
            }}
          >
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Event Title"
            />
            <button type="submit">Add Event</button> {/*reference to Code and Create's video*/}
          </form>
          <button onClick={() => setSelectDate(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Calendar;