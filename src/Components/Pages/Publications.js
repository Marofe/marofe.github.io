import React from 'react';
import './Publications.css';
import Helmet from 'react-helmet';
const Papers = () => {
    return <div className="divPages pgPublication">
        <Helmet>
        <title>Publications | Marcos Rogério Fernandes</title>
        <meta name="description" content="Welcome to my personal website. Here you will find my main contributions. " />
       </Helmet>
        <div className="top">
       <h1>My Publications</h1>
       <p>Here is an overview of my latest works and publications.</p>
       </div>
       <article>
       <h2>Journals:</h2>
       <ul>
        <li>
            <p>
        M. R. Fernandes, J. B. R. do Val and R. F. Souto, "Robust Estimation and Filtering for Poorly Known Models," in IEEE Control Systems Letters, vol. 4, no. 2, pp. 474-479, April 2020.
        <br/>[<a href="https://ieeexplore.ieee.org/document/8891731">Download (IEEE Explorer)</a>]
    </p>
    </li></ul>
       <h2>Conference Papers:</h2>
<ul>
        <li>
            <p>
        FERNANDES, MARCOS R.; DO VAL, JOAO B. R. ; SOUTO, RAFAEL F. . Filtering of Poorly Known Systems: Estimation Variations as Source of Uncertainty. In: 2018 IEEE Conference on Decision and Control (CDC), 2018, FL. 2018 IEEE Conference on Decision and Control (CDC), 2018. p. 3074. 
        <br/>[<a href="https://ieeexplore.ieee.org/document/8619306">Download (IEEE Explorer)</a>][<a href="https://www.researchgate.net/publication/329895979_Slides">Slides</a>] [<a href="https://github.com/Marofe/EVIU">Code</a>]
    </p>
    </li>
        <li><p>
        FERNANDES, M. R.; SOUTO, R. F. ; DO VAL, J. B. R. . FILTRAGEM DE SISTEMAS NÃO-LINEARES: CONSIDERANDO A VARIAÇÃO DA ESTIMATIVA COMO FONTE DE INCERTEZA. In: Congresso Brasileiro de Automática, 2018, João Pessoa. Anais do XXII Congresso Brasileiro de Automática, 2018. 
        <br/>[<a href="http://dx.doi.org/10.20906/CPS/CBA2018-1140">Download (Portuguese)</a>][<a href="https://github.com/Marofe/EVIU">Code</a>]
    </p>
    </li>
        <li><p>
        DE OLIVEIRA, MARIO. O. F. ; FERNANDES, M. R. ; SOUTO, RAFAEL F. . Implementation of a Low-cost Prototype of Twin Rotor for academic studies in identification, optimal control and stochastic filtering. In: 2017 6th International Conference on Systems and Control (ICSC), 2017, Batna. 2017 6th International Conference on Systems and Control (ICSC), 2017. p. 193-198. 
        <br/>[<a href="https://ieeexplore.ieee.org/document/7958718">Download (IEEE Explorer)</a>]</p>
    </li>
        <li><p>
        FERNANDES, MARCOS. R.; DE OLIVEIRA, MARIO. O. F. ; SOUTO, R. F. . CONSTRUÇÃO DE UM PROTÓTIPO DE HELICÓPTERO DE BAIXO CUSTO PARA ESTUDOS EM IDENTIFICAÇÃO DE SISTEMAS. In: Simpósio Brasileiro de Automação Inteligente, 2017, Porto Alegre. Anais do XIII Simpósio Brasileiro de Automação Inteligente, 2017. p. 1177-1183. 
        <br/>[<a href="https://www.ufrgs.br/sbai17/papers/paper_332.pdf">Download (Portuguese)</a>]
    </p>
    </li>
</ul>
<h2>Master's Dissertation:</h2>
<p>
     FERNANDES, M. R.; Stochastic Filtering: Estimation Variation as Source of Uncertainty. FEEC/UNICAMP, 2019.
     <br/>[<a href="http://repositorio.unicamp.br/jspui/handle/REPOSIP/334481">Download (Portuguese)</a>] [<a href="https://www.researchgate.net/publication/334710395_mestrado-slidespdf">Slides</a>] [<a href="https://github.com/Marofe/EVIU">Code</a>]
</p>
<h2>Undergraduate's Final Project:</h2>
<p>
     FERNANDES, M. R.; DE OLIVEIRA, M. O. F. ; Study and Development of Optimal Control Systems and Stochastic Filtering. UTFPR, 2016. 
     <br/>[<a href="https://www.researchgate.net/publication/313426875_Estudo_e_Desenvolvimento_de_Sistemas_de_Controle_Otimo_com_Filtragem_Estocastica">Download (Portuguese)</a>]
</p></article>
</div>
}
export default Papers;