import React from 'react';
import Katex from 'katex';
const inline = (props)=> {
return <span dangerouslySetInnerHTML={{__html: Katex.renderToString(props.math)}}></span>;
}
export default inline;