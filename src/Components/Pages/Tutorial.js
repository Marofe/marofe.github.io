import React from 'react';
import './Tutorials.css';
import Helmet from 'react-helmet';
const Tutorial = (prop) => {
    return <div className="divPages">
        <Helmet>
        <title>{prop.title} | Marcos Rogério Fernandes</title>
        <meta name="description" content={prop.description} />
       </Helmet>
       <div className="tutorialContent"></div>
    </div>
}
export default Tutorial;