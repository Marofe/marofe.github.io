import React from 'react';
import Helmet from 'react-helmet';
import '../../../Components/Pages/Tutorials.css';
import { BlockMath } from 'react-katex';
import Latex_inline from '../../../Components/Latex/Inline';
import '../../../../node_modules/katex/dist/katex.css';
import Image from '../../../Components/Image/Image';
import Disqus from 'disqus-react';
const Notes1 = () => {
    const disqusShortname = 'marofe-github-io';
        const disqusConfig = {
            url: 'https://marofe.github.io/?p=/notes/estabilidade_robusta',
            identifier: 'estabilidade_robusta',
            title: 'Controle Robusto: Realimentação de Estados'
        };
        //console.log(process.env.PUBLIC_URL+'/tutorials/rastreamento_usando_visao_filtro_kalman');
    return <article>
      <Helmet>
        <title>Controle Robusto: Realimentação de Estados | Marcos Rogério Fernandes</title>
        <meta name="description" content="Neste post é apresentado como realizar a realimentação de estados para sistemas politópicos, usando LMI para obtenção do ganho estabilizante. Exemplos de programação das LMI no Matlab é disponibilizado." />
    </Helmet>
    <h1>Controle Robusto: Realimentação de Estados </h1>
    <Image src="https://3.bp.blogspot.com/-JmZ-lvQz2Ac/WfvMuGqfB5I/AAAAAAAAAmw/Fyt2XhMhZmwJe1C_iPC75kK-X89P_DPHgCLcBGAs/s320/D11.png" alt="Computer Vision" legend="Rastreamento de Objetos" />
<p>Neste post é apresentado como realizar a realimentação de estados para sistemas politópicos, usando LMI para obtenção do ganho estabilizante. Exemplos de programação das LMI no Matlab é disponibilizado.</p>
    <p>Última atualização:  30 de Agosto de 2019.</p>
<div>
    
</div>
    <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </article>    
}
export default Notes1;
