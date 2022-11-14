import React from 'react';
import Katex from 'katex';
const newcommand = (props)=> {
return <span>
    ${props.command}$
</span>;
}
export default newcommand;