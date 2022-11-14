import React from 'react';
import Helmet from 'react-helmet';
import '../../Components/Pages/Tutorials.css';
import { BlockMath } from 'react-katex';
import Inline from '../../Components/Latex/Inline';
import '../../../node_modules/katex/dist/katex.css';
import Image from '../../Components/Image/Image';
import Disqus from 'disqus-react';
const ParticleFilter = (props) => {
const disqusShortname = 'marofe-github-io';
const disqusConfig = {
        url: 'https://marofe.github.io/?p='+props.note.link,
        identifier: 'note-'+props.note.link,
        title: props.title
    };
return <article>
      <Helmet>
        <title>{props.note.title} | Marofe</title>
        <meta name="description" content={props.note.desc} />
    </Helmet>
    <h1>{props.title}</h1>
<p>{props.desc}</p>
    <p align="right">Last Update:  1 March, 2020.</p>
<div>
	<p>
Particle Filter perform <i>Sequential Monte Carlo</i> (SMC) Estimation based on point mass "particles" representation of probabilities densities. The basic SMC ideas in the form of <i>Sequential Importance Sampling</i> (SIS) had been introduced in statistics back in the 1950s. Although, the major contribution to the development of SMC method was the inclusion of <i>resampling step</i>, which coupled with the rise of faster and cheap computers made the particle filters quite useful in practical problems.
	</p>
	<p>The following content is based on the book <a href="#ristic">ristic2003beyond</a>.</p>
<h2>Monte Carlo Integration</h2>

Suppose we want to evaluate a multidimensional integral in the form
<BlockMath math="\begin{aligned}
	I=\int g(x)dx,
\end{aligned}"/>
where <Inline math="g: \mathbb{R}^n \rightarrow \mathbb{R}^m"/> is some complicated function that it is not possible to integrate analytically. Now, if we can factorize <Inline math="g(x)=f(x)\pi(x)"/> in such a way that <Inline math="\pi: \mathbb{R}^n\rightarrow \mathbb{R}"/> is interpreted as a probability density satisfying
<BlockMath math="\begin{aligned}
	I=\int f(x)\pi(x)dx,\quad \pi(x)\ge 0,\quad \int \pi(x)dx = 1
\end{aligned}"/>
and assuming that it is possible to draw <Inline math="N>>1"/> samples <Inline math="\{x^i\}_{i=1}^N"/> distributed according to <Inline math="\pi(x)"/>, thus,  the SMC provides an estimate of <Inline math="I"/> given by
<BlockMath math="\begin{aligned}
	\hat{I}_N = \sum_{i=1}^{N}\frac{1}{N}f(x^i).
\end{aligned}"/>
In this case, if <Inline math="\{x^i\}"/> are independent samples then we can show that <Inline math="\hat{I}_N"/> is an <i>unbiased</i> estimate of <Inline math="I"/>
<BlockMath math="\begin{aligned}
	\mathbb{E}\{I\}=\mathbb{E}\{\hat{I}_N\},
\end{aligned}"/>
and according to the <i>law of large numbers</i>, <Inline math="\hat{I}_N"/> will almost surely converge to <Inline math="I"/> as <Inline math="N\rightarrow \infty"/>. The error of this MC estimator is of order <Inline math="\mathcal{O}(N^{-1/2})"/>, meaning that the rate of convergence is independent of the dimension <Inline math="n"/>. 
This useful and important property of MC integration is due to the choice of samples <Inline math="x^i"/> according to <Inline math="\pi(x)"/>, as they automatically come from regions of the state space that are important for the integration.
<p/> 
In the Bayesian Estimation context, density <Inline math="\pi(x)"/> is usually the <i>posterior</i> density. Unfortunately, in almost all cases, it is not possible to sample effectively from the posterior distribution. To overcome this problem, a possible solution is to apply the so-called <i>Importance Sampling Method</i>.
<h3>Importante Sampling Method</h3>

Suppose we can generate only samples from a specific density <Inline math="q(x)"/>, which is similar to <Inline math="\pi(x)"/>. Then a correct weighting of the samples might still make the MC estimation effective. The pdf <Inline math="q(x)"/> is referred to as the <i>importance</i> or <i>proposal</i> density. Its "similarity" with <Inline math="\pi(x)"/> can be expressed by the following condition
<BlockMath math="\begin{aligned}
\pi(x)>0 \Rightarrow q(x)>0,\quad \forall x \in \mathbb{R}^n,
\end{aligned}"/>
which means that <Inline math="\pi(x)"/> and <Inline math="q(x)"/> have the same support. If this condition is valid, then
<BlockMath math="\begin{aligned}
	I=\int f(x)\pi(x)dx = \int f(x)\frac{\pi(x)}{q(x)}q(x)dx,
\end{aligned}"/>
provided that <Inline math="\frac{\pi(x)}{q(x)}"/> is <i>upper bounded</i>. A MC estimate of <Inline math="I"/> is computed by generation <Inline math="N>>1"/> independents samples <Inline math="\{x^i\}"/> distributed according to <Inline math="q(x)"/> and forming the weighted sum
<BlockMath math="\begin{aligned}
	\hat{I}_N=\frac{1}{N}\sum_{i=1}^N f(x^i)\tilde{w}(x^i),
\end{aligned}"/>
where 
<BlockMath math="\begin{aligned}
	\tilde{w}(x^i)=\frac{\pi(x^i)}{q(x^i)},
\end{aligned}"/>
are the importance weights. If the normalization factor for the desired <Inline math="\pi(x)"/> is unknown then we also need to perform normalization of the importance weights
<BlockMath math="\begin{aligned}
	\hat{I}_N=\frac{\frac{1}{N}\sum_{i=1}^N f(x^i)\tilde{w}(x^i)}{\frac{1}{N}\sum_{i=1}^N \tilde{w}(x^i)}=\sum_{i=1}^N f(x^i)w(x^i),
\end{aligned}"/>
where
<BlockMath math="\begin{aligned}
	w(x^i)=\frac{\tilde{w}(x^i)}{\sum_{j=1}^N\tilde{w}(x^j)}.
\end{aligned}"/>
<h3>Sequential Importance Sampling (SIS)</h3>

Importance Sampling is a general MC integration method. In another hand, the <i>Sequential Importance Sampling</i> algorithm is a MC method that forms the basis for most sequential MC filters developed over the past decades.
<p/>
This sequential MC approach is known variously as <i>bootstrap filtering, the condensation algorithm, particle filters, interacting particles approximations and survival of the fittest</i>. It is a technique for implementing recursive Bayesian Filters by MC simulations. 

The key idea is to represent the required posterior density function by a set of random samples with associated weights and compute estimates based on these samples and weights. As the number of samples becomes larger, the SIS filter approaches the optimal Bayesian Estimator.
<p/>
The joint posterior density at time <Inline math="k"/> can be approximated as follows
<BlockMath math="\begin{aligned}
p(X_k|Z_k)\approx \sum_{i=1}^N w_k^i\delta(X_k-X_k^i),
\end{aligned}"/>
where <Inline math="X_k=\{x_0,x_1,\ldots,x_k\}"/> and <Inline math="Z_k=\{z_0,z_1,\ldots,z_k\}"/> are the state path and measurement history, respectively. If the samples <Inline math="X_k^i"/> were drawn from an importance density <Inline math="q(X_k|Z_k)"/> then
<BlockMath math="\begin{aligned}
	w_k^i \propto \frac{p(X_k^i|Z_k)}{q(X_k^i|Z_k)}.
\end{aligned}"/>
Considering that the importance density is chosen to factorize such that
<BlockMath math="\begin{aligned}
	q(X_k|Z_k)=q(x_k|X_{k-1},z_k)q(X_{k-1}|Z_{k-1}),
\end{aligned}"/>
then we can obtain samples <Inline math="X_k^i \sim q(X_k|Z_k)"/> by augmenting each of the existing samples <Inline math="X_{k-1}^i\sim q(X_{k-1}|Z_{k-1})"/> with the new state <Inline math="x_k^i \sim q(x_k|X_{k-1},z_k)"/>. 
<p/>
To derive the weight update equation, the pdf <Inline math="p(X_k|Z_k)"/> is first factorized as
<BlockMath math="\begin{aligned}
	p(X_k|Z_k)&=p(X_k|z_k,Z_{k-1})\\
	&=\frac{p(z_k|X_k,Z_{k-1})p(X_k|Z_{k-1})}{p(z_k|Z_{k-1})}\\
	&=\frac{p(z_k|x_k,X_{k-1},Z_{k-1})p(x_k|X_{k-1},Z_{k-1})p(X_{k-1}|Z_{k-1})}{p(z_k|Z_{k-1})}\\
	&=\frac{p(z_k|x_k,X_{k-1},Z_{k-1})p(x_k|x_{k-1},X_{k-2},Z_{k-1})p(X_{k-1}|Z_{k-1})}{p(z_k|Z_{k-1})}\\
	&=p(z_k|x_k)p(x_k|x_{k-1})\frac{p(X_{k-1}|Z_{k-1})}{p(z_k|Z_{k-1})}.
\end{aligned}"/>
Thus,
<BlockMath math="\begin{aligned}
	p(X_k|Z_k)\propto p(z_k|x_k)p(x_k|x_{k-1})P(X_{k-1}|Z_{k-1}).
\end{aligned}"/>
Substituting in <a href="#">eq:update_weight</a>, we have
<BlockMath math="\begin{aligned}
	w_k^i \propto \frac{p(z_k|x_k^i)p(x_k^i|x_{k-1}^i)}{q(x_k^i|X_{k-1}^i,Z_k)}\frac{p(X_{k-1}^i|Z_{k-1})}{q(X_{k-1}^i|Z_{k-1})},
\end{aligned}"/>
therefore, we conclude that
<BlockMath math="\begin{aligned}
		w_k^i\propto w_{k-1}^i\frac{p(z_k|x_k^i)p(x_k^i|x_{k-1}^i)}{q(x_k^i|X_{k-1}^i,Z_k)}.
\end{aligned}"/>

Now, if <Inline math="q(x_k|X_{k-1},Z_{k})=q(x_k|x_{k-1},z_k)"/> then
<BlockMath math="\begin{aligned}
w_k^i\propto w_{k-1}^i\frac{p(z_k|x_k^i)p(x_k^i|x_{k-1}^i)}{q(x_k^i|x_{k-1}^i,z_k)}.
\end{aligned}"/>
In this case, the posterior filtered density <Inline math="p(x_k|Z_k)"/> can be approximated as
<BlockMath math="\begin{aligned}
p(x_k|Z_k)\approx \sum_{i=1}^n w_k^i\delta(x_k-x_k^i).
\end{aligned}"/>
The Figure <a href="#">fig:pdf</a> illustrate this approximation for a simple problem.
<Image src="/images/pdf.svg" width="50%"/>

Filtering via SIS thus consists of recursive propagation of importance weights <Inline math="w_k^i"/> and support points <Inline math="x_k^i"/> as each measurement is received sequentially. This simple and general algorithm forms the basis of most particle filters. However, the choice of the importance density <Inline math="q(x)"/> plays a crucial role in the design of this type of filter.

<h3>The Optimal Importance Density</h3>

The choice of importance density <Inline math="q(x_k|x_{k-1},z_k)"/> is one of the most critical issues in the design of a particle filter. The optimal importance density function that minimizes the variance of importance weights, conditioned upon <Inline math="x_{k-1}"/> and <Inline math="z_k"/> has been shown to be
<BlockMath math="\begin{aligned}
	q(x_k|x_{k-1},z_k)=p(x_k|x_{k-1},z_k).
\end{aligned}"/>
Substitution of <a href="#">eq:opt_q</a> into <a href="#">eq:update2_weight</a> yields
<BlockMath math="\begin{aligned}
w_k^i&\propto w_{k-1}^i\frac{p(z_k|x_k)p(x_k|x_{k-1}^i)}{p(x_k|x_{k-1}^i,z_k)}\\
&\propto w_{k-1}^i\frac{p(z_k|x_k)p(x_k|x_{k-1}^i)p(z_k|x_{k-1}^i)}{p(z_k|x_k,x_{k-1}^i)p(x_k|x_{k-1}^i)}\\
	&\propto w_{k-1}^ip(z_k|x_{k-1}^i),
\end{aligned}"/>
which states that importance weights at time <Inline math="k"/> can be computed (and resampling) before the particles even be propagated to time <Inline math="k"/>. In order to use the optimal importance function, one has to be able to (i) sample from <Inline math="p(x_k|x_{k-1}^i,z_k)"/> and (ii) evaluate
<BlockMath math="\begin{aligned}
	p(z_k|x_{k-1}^i)&=\int p(z_k,x_k|x_{k-1}^i)dx_k\\
	&=\int p(z_k|x_k)p(x_k|x_{k-1}^i)dx_k
\end{aligned}"/>
up to a normalizing constant. In the general case either these two may not be straightforward. However, there are some special cases where the use of optimal importance density is possible. 
<p/>
The first case is when <Inline math="x_k"/> is a member of a finite set (e.g. jump-Markov linear systems). The second case is a class of models for which <Inline math="p(x_k|x_{k-1}^i,z_k)"/> is Gaussian.
<h3>Gaussian Optimal Importance Density</h3>
Consider the case where the state dynamics is nonlinear but the measurement equation is linear and all the random elements in the model are additive Gaussian
<BlockMath math="\begin{aligned}
x_k&=f_{k-1}(x_{k-1})+\nu_{k-1}\\
z_k&=H_kx_k+\varepsilon_k\\
\nu_k\sim &\mathcal{N}(0,Q_k),\quad \varepsilon_k \sim \mathcal{N}(0,R_k)
\end{aligned}"/>
From the Bayes formula it follows that
<BlockMath math="\begin{aligned}
	p(x_k|x_{k-1},z_k)\propto p(z_k|x_k)p(x_k|x_{k-1})
\end{aligned}"/>
as the measurement is linear and the random elements are Gaussian, <Inline math="p(x_k|x_{k-1},z_k)"/> will be the product of Gaussian distributions and therefore will result in another Gaussian. Besides, we can write
<BlockMath math="\begin{aligned}
p(x_k|x_{k-1},z_k)p(z_k|x_{k-1})= p(z_k|x_k)p(x_k|x_{k-1})
\end{aligned}"/>
Taking the logarithm both sides yield
<BlockMath math="\begin{aligned}
	p(x_k|x_{k-1},z_k)&\sim \mathcal{N}(a_k,\Sigma_k),\\
	p(z_k|x_{k-1})&\sim \mathcal{N}(b_k,S_k),
\end{aligned}"/>
with
<BlockMath math="\begin{aligned}
	a_k&=f_{k-1}(x_{k-1})+\Sigma_kH_k^\intercal R_k^{-1}(z_k-b_k),\\
	\Sigma_k &= Q_{k-1}-Q_{k-1}H_k^\intercal S_k^{-1}H_kQ_{k-1},\\
	S_k &= H_kQ_{k-1}H_k^\intercal + R_k,\\
	b_k&=H_kf_{k-1}(x_{k-1}).
\end{aligned}"/>
<h3>Degeneracy Problem and Resampling</h3>

Ideally, the importance density function should be the posterior density itself <Inline math="p(x_k|Z_k)"/>. However, as this cannot be achieved, the variance of the importance weights might increase over time. This leads to the <i>degeneracy phenomenon</i>. 
<p/>
In practical terms, this means that after a certain number of steps, all but one particle will have negligible normalized weight. The degeneracy is impossible to avoid in the SIS framework and, hence, it was a major stumbling block in the development of sequential MC methods. Because a large computational effort is devoted to updating particles whose contribution to the approximation of <Inline math="p(x_k|Z_k)"/> is almost zero. 

<p/>
One measure of degeneracy of a SIS algorithm follows
<BlockMath math="\begin{aligned}
	N_{eff}=\frac{1}{\sum_{i=1}^N(w_k^i)^2}.
\end{aligned}"/>

It is straightforward to verify that <Inline math="1\le N_{eff}\le N"/> with the following extreme cases: (i) if the weights are uniform (i.e. <Inline math="w_k^i=\frac{1}{N}"/>) then <Inline math="N_{eff}=N"/>; and (ii) if <Inline math="\exists j\in \{1,\ldots,N\}"/> such that <Inline math="w_k^j=1"/> and <Inline math="w_k^i=0"/> for all <Inline math="i\neq j"/>, then <Inline math="N_{eff}=1"/>. Therefore, small <Inline math="N_{eff}"/> indicates a severe degeneracy and vice versa.
<p/>
To cope with this problem, we need to perform a resampling step whenever a significant degeneracy is observed (i.e. when <Inline math="N_{eff}"/> fall below some threshold <Inline math="N_{thr}"/>). Resampling eliminates samples with low importance and multiplies ones with high importance. 
<p/>
It involves a mapping of random measures <Inline math="\{x_k^i,w_k^i\}_{i=1}^N"/> into new ones <Inline math="\{\tilde{x}_k^i,\frac{1}{N}\}_{i=1}^N"/> with uniform weights.
The new set of samples <Inline math="\{\tilde{x}_k^i\}_{i=1}^N"/> is generated by resampling (with replacement) <Inline math="N"/> times from the approximate discrete representation of <Inline math="p(x_k|Z_k)"/>, so that <Inline math="P\{\tilde{x}_k^i=x_k^j\}=w_k^j"/>. The resulting samples compose an i.i.d set and hence the new weights are uniform.
<p/>
One way to implement the resampling step is by the <i>Cumulative Sum of Weight Algorithm</i> (CSW). This implementation consist of generating <Inline math="N"/> i.i.d variables from the uniform distribution <Inline math="\mathcal{U}[0,1]"/>, sorting them in ascending order and comparing them with the cumulative sum of normalized weights. The Figure <a href="#">fig:csw</a> illustrate this procedure.
<Image src="/images/csw.svg" width="50%"/>
<h2>The Bootstrap Filter (SIR)</h2>

Proposed in <a href="#gordon">gordon1993novel</a>. The <i>Sequential Importance Resampling</i> (SIR) filter is derived from the SIS algorithm by choosing the importance density to be the <i>transitional prior</i> and performing resampling every time step.
<BlockMath math="\begin{aligned}
	q(x_k|x_{k-1},z_k)=p(x_k|x_{k-1}).
\end{aligned}"/>

A sample <Inline math="x_k^i\sim p(x_k|x_{k-1}^i)"/> can be generated first generating a process noise sample <Inline math="\nu_{k-1}^i\sim p(\nu_k)"/> and setting <Inline math="x_k^i=f(x_{k-1}^i,\nu_{k-1}^i)"/>. For this particular choice of importance density, the weight update is
<BlockMath math="	\begin{aligned}
		w_k^i\propto w_{k-1}^ip(z_k|x_k).
\end{aligned}"/>
	However, as the resampling step is performed every iteration, we have <Inline math="w_{k-1}^i=\frac{1}{N}"/> for all <Inline math="i=1,\ldots,N"/>. Thus, the weight update simplifies to
<BlockMath math="	\begin{aligned}
		w_k^i \propto p(z_k|x_k).
\end{aligned}"/>
 
<h3>Cons</h3>

As the importance sampling is independent of measurement <Inline math="z_k"/>, the state space is explored without any knowledge of the observations. Therefore, this filter is sensitive to outliers. Furthermore, as resampling is applied every iteration, this can result in rapid <i>loss of diversity</i> in particles.
<h3>Pros</h3>

The SIR method has the advantage that the importance weights are easily evaluated and the importance density can be easily sampled.
<h2>Local Linearization Particle Filters (LLPF)</h2>

The optimal importance density can be approximated by incorporating the most current measurement <Inline math="z_k"/> via a bank of extended or unscented Kalman Filters. The idea is to use for each particle a separate EKF or UKF to generate and propagate a Gaussian importance distribution; that is,
<BlockMath math="\begin{aligned}
	q(x_k^i|x_{k-1}^i,z_k)=\mathcal{N}(\hat{x}_k^i,\hat{P}_k^i),
\end{aligned}"/>
where <Inline math="\hat{x}_k^i"/> and <Inline math="\hat{P}_k^i"/> are estimates of the mean and covariance computed by EKF or UKF at time <Inline math="k"/> using measurement <Inline math="z_k"/>. We refer to the corresponding particle filter as the <i>Local Linearization Particle Filter</i> (LLPF). 
<p/>
The local linearization method for approximation of the importance density propagates the particles towards the likelihood function and consequently, the LLPF performs better than SIR filter. The additional computational cost of using such an importance density is often more than offset by a reduction in the number of samples required to achieve a certain level of performance.

<div className="remark">
	<b>Remark: </b>	
Since Particle Filters are very expensive in terms of computational requirements, one should use them only in cases in which the conventional Kalman Filter does not produce satisfactory results.
</div>
<h3>References:</h3>
<p><a name="gordon"></a>GORDON, N. J.; SALMOND, D. J.; SMITH, A. F. Novel approach to nonlinear/nongaussian
bayesian state estimation. In: IET. IEE proceedings F (radar and signal
processing). [S.l.], 1993. v. 140, n. 2, p. 107–113</p>
<p><a name="ristic"></a>RISTIC, B.; ARULAMPALAM, S.; GORDON, N. Beyond the Kalman Filter: Particle
Filters for Tracking Applications. [S.l.]: Artech House, 2003. ISBN 9781580538510.</p>
</div>
<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />

</article>
}
export default ParticleFilter;