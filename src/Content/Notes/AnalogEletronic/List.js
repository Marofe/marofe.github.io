import React from 'react';
import Helmet from 'react-helmet';
import { BlockMath } from 'react-katex';
import Latex_inline from '../../../Components/Latex/Inline';
import '../../../../node_modules/katex/dist/katex.css';
import Image from '../../../Components/Image/Image';
import Disqus from 'disqus-react';
import {Route} from 'react-router-dom';
import Diode from './diode_pt';
import FeaturesDiode from './diode_features_pt';
const List = () => {
    const title="Eletrônica Analógica";
    const description="Anotações referentes a eletrônica analógica.";
    if (window.location.pathname=='/notes/eletronica_analogica')
    return <div className="divPage">
    <Helmet>
        <title>{title}| Marcos Rogério Fernandes</title>
        <meta name="description" content={description} />
    </Helmet>
    <div className="top">
    <h1>{title}</h1>
    </div>
<div className="list">
    <div className="listCell">
    <h2><a href="/notes/eletronica_analogica/diodo">O Diodo</a></h2>
    <p>Anotações referentes ao funcionamento do diodo.</p>
    </div>
    <div className="listCell">
    <h2><a href="/notes/eletronica_analogica/caracteristicas_diodo">Caracteristicas do Diodo</a></h2>
    <p>Anotações referentes as caracteristicas do diodo.</p>
    </div>
</div>
</div>
else 
return <div className="divPage">
<Helmet>
    <title>{title}| Marcos Rogério Fernandes</title>
    <meta name="description" content={description} />
</Helmet>
<div className="top">
<h1>{title}</h1>
</div>
<Route path="/notes/eletronica_analogica/diodo" exact render={(props) => <Diode/>}/>
<Route path="/notes/eletronica_analogica/caracteristicas_diodo" exact render={(props) => <FeaturesDiode/>}/>
</div>
}
export default List;
