import React from 'react';
import Helmet from 'react-helmet';
import '../../../Components/Pages/Tutorials.css';
import { BlockMath } from 'react-katex';
import Inline from '../../../Components/Latex/Inline';
import '../../../../node_modules/katex/dist/katex.css';
import Image from '../../../Components/Image/Image';
import Disqus from 'disqus-react';
const EkfLie = (props) => {
    const disqusShortname = 'marofe-github-io';
        const disqusConfig = {
            url: 'https://marofe.github.io/?p='+props.note.link,
            identifier: 'note-'+props.note.link,
            title: props.title
        };
        //console.log(process.env.PUBLIC_URL+'/tutorials/rastreamento_usando_visao_filtro_kalman');
    return <article>
      <Helmet>
        <title>{props.note.title}| Marofe</title>
        <meta name="description" content={props.note.desc} />
    </Helmet>
    <h1>{props.title}</h1>
<p>{props.desc}</p>
    <p align="right">Last Update:  26 December, 2019.</p>
<div>
Consider a dynamic system in which its states are embedded on a Matrix Lie Group <Inline math="G"/> of dimension <Inline math="n"/> and measurements are available through a map: <Inline math="h:G\rightarrow G'"/>, where <Inline math="G'"/> is a Matrix Lie Group of dimension <Inline math="m"/>, described by
<BlockMath math="\begin{aligned}
 {X}_{k+1}&= {X}_k \exp_G([ \Omega( {X}_k, {u}_k)+  w_k]_G^\wedge),\\
 {Y}_k &=   h( {X}_k)  \exp_{G'}([  \nu_k]_{G'}^\wedge)
\end{aligned}"/>
where <Inline math="{X}_k\in M\subseteq G"/> is the state and <Inline math="{Y}_k \in M'\subseteq G'"/> is the measurement. <Inline math="M,M'"/> are subgroups of <Inline math="G,G'"/>, respectively, such that the following bijection is well defined
<BlockMath math="\begin{aligned}
 \ln_G( \exp_G( {X}_k))&= {X}_k,\\
 \ln_{G'}( \exp_{G'}( {Y}_k))&= {Y}_k
\end{aligned}"/>
and <Inline math="w_k\sim \mathcal{N}(0,Q_k)"/> and <Inline math="\nu_k\sim \mathcal{N}(0,R_k)"/>.
<center><h2>Filtering</h2></center>
<b>Prediction:</b>
<BlockMath math="
\begin{aligned}
 {\hat{X}}_{k+1|k}&= {\hat{X}}_{k|k}\exp_G([\hat{\Omega}_k]_G^\wedge)\\
P_{k+1|k}&=\mathscr{F}_kP_{k|k}\mathscr{F}_k^{\intercal}+\Phi(\hat{\Omega}_k)Q_k\Phi(\hat{\Omega}_k)^\intercal
\end{aligned}"/>
where 
<BlockMath math="
\begin{aligned}
\hat{\Omega}_k&=\Omega_k( {\hat{X}}_{k|k},u_k)\\
\mathscr{F}_k&=Ad_G(\exp_G([-\hat\Omega_k]_G^\wedge))+\Phi(\hat\Omega_k)\mathscr{C}_k\\
\mathscr{C}_k&=\frac{\partial}{\partial \epsilon}\Omega_k( {\hat{X}}_{k|k}\exp_G([\epsilon]_G^\wedge),u_k)|_{\epsilon=0}\\
\Phi(a)&=\sum_{m=0}^\infty \frac{(-1)^m}{(m+1)!}ad_G(a)^m
\end{aligned}"/>
<b>Update:</b>
<BlockMath math="
\begin{aligned}
K&=P_{k+1|k}\mathscr{H}^\intercal(R+\mathscr{H}_kP_{k+1|k}\mathscr{H}_k^T)^{-1}\\
v_k&=K\ln_{G'}(h( {\hat{X}}_{k+1|k})^{-1}y_{k+1})^\vee_{G'}\\
 {\hat{X}}_{k+1|k+1}&= {\hat{X}}_{k+1|k} \exp([v_k]_G^\wedge)\\
P_{k+1|k+1}&=\Phi(v_k)(I-K\mathscr{H}_k)P_{k+1|k}\Phi(v_k)^\intercal
\end{aligned}"/>
where
<BlockMath math="
\begin{aligned}
\mathscr{H}_k=\frac{\partial}{\partial \epsilon}\left[ \ln_{G'}(h( {\hat{X}}_{k+1|k})^{-1}h( {\hat{X}}_{k+1|k} \exp([ \epsilon]^\wedge_{G})))\right]^{\vee}_{G'}\big|_{ \epsilon=0}
\end{aligned}"/>
</div>
    <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </article>    
}
export default EkfLie;
