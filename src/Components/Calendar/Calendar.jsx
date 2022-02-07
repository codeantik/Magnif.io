import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Calendar.css";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject , DragAndDrop, Resize} from '@syncfusion/ej2-react-schedule';
export default function App() {
  const [events, setEvents] = useState([])

  const fetcher = async () => {
    const data = await axios.get(`http://localhost:4000/events`)
    console.log("data", data)
    setEvents(data.data);
  }

  useEffect(() => {
    fetcher()
  }, [])

  // Id: 2,
  //   Subject: 'Paris',
  //   StartTime: new Date(2018, 1, 15, 10, 0),
  //   EndTime: new Date(2018, 1, 15, 12, 30),

  let res = []
  res = 
    events.map(event => {
      const year1 = parseInt(event.startTime.substring(0, 4));
      const month1 = parseInt(event.startTime.substring(5, 7));
      const date1 = parseInt(event.startTime.substring(8, 10));
      const h1 = parseInt(event.startTime.substring(11, 13));
      const m1 = parseInt(event.startTime.substring(14, 16));

      const year2 = parseInt(event.endTime.substring(0, 4));
      const month2 = parseInt(event.endTime.substring(5, 7));
      const date2 = parseInt(event.endTime.substring(8, 10));
      const h2 = parseInt(event.endTime.substring(11, 13));
      const m2 = parseInt(event.endTime.substring(14, 16));
      return ({
        Id: event.eventId,
        Subject: event.subject,
        StartTime: new Date(year1, month1 - 1, date1, h1, m1),
        EndTime: new Date(year2, month2 - 1, date2, h2, m2),
      })
    })
    console.log(res)
  return (
    <div className="calendar">
      <ScheduleComponent height='550px' selectedDate={Date.now()} eventSettings={{ dataSource: res }} currentView='Month'>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]} />
      </ScheduleComponent>
    </div>
  );
}
