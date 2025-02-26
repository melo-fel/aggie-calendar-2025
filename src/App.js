import './App.css';
import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(DateTime.now().startOf('month')); {/*reference to Code and Create's video*/}
  const [events, setEvents] = useState([]); {/*reference to Code and Create's video*/}
  const [selectDate, setSelectDate] = useState(null); {/*reference to Code and Create's video*/}
  const [eventTitle, setEventTitle] = useState(''); {/*reference to Code and Create's video*/}
  const [eventColor, setEventColor] = useState('#0000FF');

  const firstDayIndex = currentMonth.weekday % 7;
  const daysInMonth = currentMonth.daysInMonth; {/*reference to Code and Create's video*/}

  const days = Array.from({ length: 42 }, (_, i) => i - firstDayIndex + 1);

  const eventsForDay = (date) =>
    events.filter(event => event.date === date.toISODate());

  const addEvent = (date, title, color) => {
    const newEvent = { date: date.toISODate(), title, color };
    setEvents([...events, newEvent]);
    setEventTitle('');
    setEventColor('#0000FF');
    toast.success(`Event "${title}" added!`);
    console.log("Adding event:", { date, title, color});
  };

  const deleteEvent = (date, title) => {
    setEvents(events.filter(event => !(event.date === date.toISODate() && event.title === title)));
  }

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
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{color: "#002D74"}}>{day}</div>
        ))}
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
                <div key={idx} className="event-preview" style={{ display: 'inline-block', fontSize: '0.7em', backgroundColor: event.color, 
                color: '#fff', padding: '2px 4px', borderRadius: '3px', margin: '2px 0', whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  {event.title}
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
                <div key={index} style={{ marginBottom: '5px', backgroundColor: event.color, padding: '2px 4px', borderRadius: '3px' }}>
                  <p style={{ display: 'inline-block', marginRight: '10px', color: '#fff' }}>{event.title}</p>
                  <button onClick={() => deleteEvent(selectDate, event.title)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No events for this day.</p>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (eventTitle.trim()) {
                addEvent(selectDate, eventTitle, eventColor);
              }
            }}
          >
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Event Title"
            />
            {/* New color picker for events */}
            <input
              type="color"
              value={eventColor}
              onChange={(e) => setEventColor(e.target.value)}
              style={{ marginLeft: '10px' }}
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