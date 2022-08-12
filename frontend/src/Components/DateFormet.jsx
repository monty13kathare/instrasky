import React from 'react'

const DateFormet = () => {
    let showdate = new Date();
   

    let displayTime  = showdate.getMinutes() +' min ago';

  

  return (
      
    <div>

        <input type="text" value={ displayTime} readOnly="true" style={{border: "none",outline:"none",width: "100%"}}/>
    </div>
  );
}

export default DateFormet