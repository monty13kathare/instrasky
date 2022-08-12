import React from 'react';
import "./Status.css";


export const Status = (props) => {
  return (
    <div className='Scard'>
<img src={props.ImgSrc} alt="" />
<div className="Dp">
    <img src={props.DpSrc} alt="" />
</div>
<p className='Sname'>{props.NameSrc}</p>
    </div>
  )
}
