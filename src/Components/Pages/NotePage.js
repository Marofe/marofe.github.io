import React from 'react';
import './Notes.css';
import Helmet from 'react-helmet';
import EkfLie from '../../Content/Notes/Kalman/ekf_lie';
import RiccatiEq from '../../Content/Notes/Riccati/RiccatiEq';
import ParticleFilter from '../../Content/Notes/particleFilter';
import Lasso from '../../Content/Notes/LASSO/lasso';
import BayesianFiltering from '../../Content/Notes/Kalman/BayesianFiltering';
import IntroKalmanFilter from '../../Content/Notes/Kalman/IntroKalmanFilter';

const NotePage = (props) => {
    let content;
    switch (props.note.class) {
        case 'EkfLie':
            content = <EkfLie note={props.note}/>;
            break
        case 'RiccatiEq':
            content = <RiccatiEq note={props.note}/>;
            break
        case 'particleFilter':
            content = <ParticleFilter note={props.note}/>;
            break
        case 'Lasso':
            content = <Lasso note={props.note}/>;
            break    
        case 'BayesianFiltering':
            content = <BayesianFiltering note={props.note}/>;
            break    

        case 'IntroKalmanFilter':
            content = <IntroKalmanFilter note={props.note}/>;
            break   
    }
    return <div className="divNote">
<div className="top">
   <h1>{props.note.title}</h1>
   <p>{props.note.desc}</p>
</div>
{content}
</div>
}
export default NotePage;