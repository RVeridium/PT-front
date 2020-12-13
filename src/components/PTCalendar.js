import React, { useState, useEffect } from 'react'; 
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';


export default function PTCalendar() {
    moment.locale('fi')
    const localizer = momentLocalizer(moment); 
    const [velist, setEvlist] = useState([]); 
    
    useEffect(() => fetchAllC(), [])
    function fetchAllC() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(list => setEvlist(list)) 
    };

    return(
        <div>
        <Calendar
        localizer={localizer}
        events={velist}
        views={['month', 'day', 'agenda']}
        showMultiDayTimes
        defaultDate={moment().toDate()}
        step={60}
        startAccessor={(event) => {return moment(event.date).toDate()}}
        endAccessor={(event) => {return moment(event.date).add(event.duration, 'minutes').toDate()}}
        titleAccessor={(event) => {return `${event.activity} with ${event.customer.firstname}`}}
        style={{height: 700}}
        />
            
        </div>
    )
}