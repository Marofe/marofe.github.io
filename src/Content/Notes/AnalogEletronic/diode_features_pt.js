import React from 'react';
import Helmet from 'react-helmet';
import '../../../Components/Pages/Notes.css';
import { BlockMath } from 'react-katex';
import Latex_inline from '../../../Components/Latex/Inline';
import '../../../../node_modules/katex/dist/katex.css';
import Image from '../../../Components/Image/Image';
import Disqus from 'disqus-react';
const Note = () => {
    const title="Características do Diodo";
    const description="Nessas anotações é apresentado os conceitos elementares sobre os materiais semicondutores, como é feita a dopagem e a construção de materiais do tipo-P e do tipo-N. Em seguida é discutido o fenômeno que ocorre quando é feita a junção de um material tipo-P ao um do tipo-N. Resultando na junção PN em que é dado o nome de diodo. O mais simples dos dispositivos eletrônicos.";
    const img_url="https://3.bp.blogspot.com/-JmZ-lvQz2Ac/WfvMuGqfB5I/AAAAAAAAAmw/Fyt2XhMhZmwJe1C_iPC75kK-X89P_DPHgCLcBGAs/s320/D11.png";
    const disqusShortname = 'marofe-github-io';
        const disqusConfig = {
            url: 'https://marofe.github.io/?p=/notes/eletronica_analogica/diodo',
            identifier: 'notes/eletronica_analogica/diodo',
            title: title
        };
        //console.log(process.env.PUBLIC_URL+'/tutorials/rastreamento_usando_visao_filtro_kalman');
    return <article>
      <Helmet>
        <title>{title} | Marcos Rogério Fernandes</title>
        <meta name="description" content={description} />
    </Helmet>
    <h1>{title}</h1>
    <Image src={img_url} alt={title} legend={title} />
<p>{description}</p>
    <p>Última atualização:  30 de Agosto de 2019.</p>
<div>
    
</div>
    <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
</article>    
}
export default Note;
