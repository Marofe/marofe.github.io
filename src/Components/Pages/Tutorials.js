import React from 'react';
import Helmet from 'react-helmet';
import {Route} from 'react-router-dom';
import KfVision from '../../Content/Tutorials/kf_vision_pt';
import TutorialList from './TutorialList';
import './Tutorials.css';
const Tutorials = () => {
    return <div className="divPage">
    <Helmet>
        <title>Tutorials | Marcos Rogério Fernandes</title>
        <meta name="description" content="Here you will find some of my tutorials and toy examples. " />
    </Helmet>
    <div className="top">
       <h1>Tutorials</h1>
    </div>
     <Route path="/tutorials" exact render={(props) => <TutorialList/>}/>
     <Route path="/tutorials/rastreamento_usando_visao_filtro_kalman" exact render={(props) => <KfVision/>}/>
    </div>
}
export default Tutorials;