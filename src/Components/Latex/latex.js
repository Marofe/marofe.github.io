import React from 'react';
import { BlockMath } from 'react-katex';
const Latex = (props)=> {
return <div id={props.label}>
    <BlockMath math={props.math}/>
    </div>;
}
export default Latex;