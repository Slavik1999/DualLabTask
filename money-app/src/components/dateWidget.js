import React from 'react'

const DateWidget = ({endDate, startDate, getLastWeekDate, getEndDate, getStartDate}) =>{
    const date = getLastWeekDate();

    return(
        <form>
        <label htmlFor='start'>Start date:</label>
        <input type="date" id="start" max={endDate}
        defaultValue={date.startDate} onChange={(e)=>getStartDate(e.target.value)} required/>
        <label htmlFor='end'>End date:</label>
        <input type="date" id="end" max={date.endDate} min={startDate}
        defaultValue={date.endDate} onChange={(e)=>getEndDate(e.target.value)} required/>
      </form>
    )
}

export default DateWidget;