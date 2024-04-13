import React from 'react';
import './Image.css';
const Image = (props) => {
    return <div className="divImage">
        <img className={props.className} id={props.label} alt={props.alt} src={props.src} width={props.width} height={props.height}/><br/>
        <span>{props.legend}</span>
    </div>
}
export default Image;