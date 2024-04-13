import React from 'react';
import Helmet from 'react-helmet';
import '../../../Components/Pages/Tutorials.css';
import { BlockMath } from 'react-katex';
import Inline from '../../../Components/Latex/Inline';
import '../../../../node_modules/katex/dist/katex.css';
import Image from '../../../Components/Image/Image';
import Disqus from 'disqus-react';
const BayesianFiltering = (props) => {
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
    <p align="right">Last Update:  26 August, 2020.</p>
<div>
    <p>
        The following content is based on the book <a href="#sarkka">SARKKA, 2013</a>.
    </p>
<h2>Bayes Framework</h2>

In the Bayes Framework, all results are treated as being approximations to certain probability distributions or their parameters. Probability distributions are used both to represent uncertainties in the models and for modeling the physical randomness. <p></p>

The term optimal filtering traditionally refers to a class of methods that can be used for estimating the state of a time-varying system which is indirectly observed through noisy measurements. The term optimal in this context refers to statistical optimality. Bayesian filtering refers to the Bayesian way of formulating optimal filtering. <p></p>

In the case of state estimation of a dynamic system, the term state refers to the collection of dynamic variables which fully describe the system in a given instant of time.
<p></p>
The noise in the measurements means that they are uncertain. Even if we knew the true system state, the measurements would not be deterministic functions of the state, but would have a distribution of possible values. The time evolution of the state is modeled as a dynamic system which is perturbed by a certain process noise. This noise is used for modeling the uncertainties in the system dynamics which can be a natural disturb that the system is facing or a poorly knowledge of the system behavior itself. In most cases, the system may not be truly stochastic, but stochasticity is used for representing the model uncertainties.<p></p>

Bayesian Smoothing is considered a class of methods within the field of Bayesian filtering. However, while Bayesian filters in their basic form only compute estimates of the current state of the system given the history of measurements, Bayesian smoothers can be used to reconstruct states that happened before  the current time.<p></p>

Phenomena which can be modeled as time-varying systems of the above type are very common in engineering applications. For example, in navigation, aerospace engineering, space engineering, remote surveillance, telecommunications, physics, audio signal processing, control engineering, finance, and many other fields. <p></p>
<p></p>
In medicine, we can use the Bayesian framework to work with brain imaging methods such as electroencephalography (EEG), magnetoencephalography (MEG), parallel functional magnetic resonance imaging (fMRI) and many others.
<p></p>
Another case is the estimation of spread of infectious diseases which often has uncertainties in the dynamic equation and measurements. Others dynamic process in biology such predator-prey models, population growth can also be modeled as stochastic differential equations and the state estimation problem also can be formulated as an optimal filtering and smoothing problem.
<p></p>
In the same vein, learning systems or adaptive systems can often be mathematically formulated in terms of optimal filters and smoother as well, and they have a close relationship with Bayesian non-parametric modeling.
<p></p>
In general, any physical system which is measured through non-ideal sensors can be formulated as stochastic state space models, and the time evolution of the system can be estimated using Bayesian filtering.
<p></p>
The history of optimal filtering starts from the Wiener filter in 1950, which is a frequency domain solution to the problem of least squares optimal filtering of stationary Gaussian signals. The Wiener filter is still important in communication applications, digital signal processing and image processing. The disadvantage of the Wiener filter is that it can only be applied to stationary signals.
<p></p>
The success of optimal linear filtering in engineering applications is mostly due to the seminal article of Kalman (1960), which describe the recursive solution to the optimal discrete-time (or sampled) linear filtering problem. One reason for the success is that the Kalman Filter can be understood and applied with very much lighter mathematical machinery than the Wiener filter. Besides, the Kalman filter also contains the Wiener filter as its limiting special case. 
<p></p>
In the early states of its history, the Kalman Filter was soon discovered to belong to the class of Bayesian filters. Although the original derivation of the Kalman Filter was based on the least squares approach, the same equations can be derived from pure probabilistic Bayesian analysis. The corresponding Bayesian smoothers were also developed soon after the invention of the Kalman Filter.
<p></p>
In mathematical terms, optimal filtering and smoothing are considered to be statistical inversion problems where the unknown quantity is a vector valued time series <Inline math="\{x_0,x_1,\ldots\}"/> which is observed through a set of noisy measurements <Inline math="\{y_1,y_2,\ldots\}"/>.
The purpose of the statistical inversion problem is to estimate the hidden states <Inline math="x_{0:T}=\{x_0,x_1,\ldots,x_T\}"/> from the observed measurements set <Inline math="y_{1:T}=\{y_1,y_2,\ldots,y_T\}"/>, which means that in the Bayesian sense we want to compute the joint posterior distribution of all the states given all the measurements. In principle, this can be done by straightforward application of Bayes' rule
<BlockMath math="\begin{aligned}
	p(x_{0:T}|y_{1:T})=\frac{p(y_{1:T}|x_{0:T})p(x_{0:T})}{p(y_{1:T})},
\end{aligned}"/>
where <Inline math="p(x_{0:T})"/> is the prior distribution defined by the dynamic model, <Inline math="p(y_{1:T}|x_{0:T})"/> is the likelihood model for the measurements and <Inline math="p(y_{1:T})"/> is the normalization factor to ensure that <Inline math="\int p(x_{0:T}|y_{1:T})dx_{0:T} = 1"/>. This factor can be computed by the total probability theorem
<BlockMath math="\begin{aligned}
	p(y_{1:T})=\int p(y_{1:T}|x_{0:T})p(x_{0:T})dx_{0:T}.
\end{aligned}"/>

Unfortunately, this full posterior formulation has the serious disadvantage that each time we obtain a new measurement, the full posterior distribution would have to be recomputed. In other words, when the number of time steps increase, the dimensionality of the full posterior distribution also increases, which means that the computational complexity of a single time step increases. Thus eventually the computations will become intractable, no matter how much computational power is available. Without additional information or restrictive approximations, there is no way of getting over this problem in the full posterior computation.
<p></p>
In order to solve this problem, we may relax this a bit in such a way that we can be satisfied with just a selected marginal distribution of the states. We also need to restrict the class of dynamic models to probabilistic Markov Sequences, which is not as restrictive as it may first seem.
<p></p>
Usually, the following assumptions are made
<ul>
	<li>
	 An initial distribution specifies the prior probability distribution <Inline math="p(x_0)"/> of the hidden state <Inline math="x_0"/> at the initial time step <Inline math="k=0"/>.
	 </li>
	<li> A dynamic model describes the system dynamics and its uncertainties as a Markov Sequence, defined in terms of the transition probability distribution <Inline math="p(x_k|x_{k-1})"/>.</li>

	<li>A measurement model describes how the measurement <Inline math="y_k"/> depends on the current state <Inline math="x_k"/>. This dependence is modeled by specifying the conditional probability distribution of the measurement given the state, which is denoted as <Inline math="p(y_k|x_k)"/>.
	</li>
	</ul>

Because computing the full joint distribution of the states at all times steps is computacionally very inefficient and unnecessary in real-time applications, in Bayesian filtering and smoothing the following marginal distributions are considered instead.
<ul>
	<li><b>Filtering distributions</b> computed by the Bayesian filter are the marginal distributions of the current state <Inline math="x_k"/> given the current and previous measurement <Inline math="y_{1:k}=\{y_1,\ldots,y_k\}"/>:
<BlockMath math="	\begin{aligned}
		p(x_k|y_{1:k}),\quad k=1,\ldots, T
\end{aligned}"/>
</li> 
<li><b>Prediction distributions</b> which can be computed with the prediction step of the Bayesian filter are the marginal distributions of the future state <Inline math="x_{k+n}"/>, <Inline math="n"/> steps after the current time step:
<BlockMath math="	\begin{aligned}
		p(x_{k+n}|y_{1:k}),\quad k=1,\ldots, T, \quad n = 1,2,\ldots
\end{aligned}"/>
</li>
<li><b>Smoothing Distributions</b> computed by the Bayesian smoother are the marginal distributions of the state <Inline math="x_k"/> given a certain interval <Inline math="y_{1:T}=\{y_1,\ldots,y_T\}"/> of measurements with <Inline math="T>k"/>:
<BlockMath math="	\begin{aligned}
		p(x_k|y_{1:T}), \quad k=1,\ldots , T.
\end{aligned}"/>
</li>
</ul>

Computing the filtering, prediction, and smoothing distributions require only a constant number of computations per time step, and thus the problem of processing arbitrarily long time series is solved.
<p></p>
The well-known <i>Kalman Filter</i> (KF) is a closed form solution to the linear Gaussian filtering problem.  The <i>Rauch-Tung-Striebel</i> smoother (RTS) is the corresponding closed form smoother for linear Gaussian state space models. <i>Grid Filters</i> and <i>Grid smoothers</i> are solutions to Markov models with finite state spaces.
<p></p>
But because the Bayesian optimal filtering and smoothing equations are generally computationally intractable, many kinds of numerical approximations methods have been developed, for example:
<ul>
	<li><i>The extended Kalman Filter</i> (EKF) approximates the non-linear and non-Gaussian measurements and dynamic models by first order Taylor expansion at the nominal solution. This results in a Gaussian approximation to the filtering distributions.</li>
	<p></p><li> <i>The extended Rauch-Tung-Striebel smoother</i> is the approximate non-linear smoothing algorithm corresponding to EKF.</li>
	<p></p><li> <i>The unscentend Kalman Filter</i> (UKF) approximates the propagation of densities through the non-linearities of measurement and noise processes using the <i>unscented transform</i>. This also results in a Gaussian approximation.</li>
	<p></p><li> <i>The unscented Rauch-Tung-Striebel smoother</i> is the approximate non-linear smoothing algorithm corresponding to UKF.</li>
	<p></p><li> <i>Sequential Monte Carlo methods</i> or <i>particle filters (PF) and smoothers</i> represent the posterior distribution as a weighted set of Monte Carlo samples.</li>
	<p></p><li> <i>The unscented particle filter</i> (UPF) or <i>local linearization based particle filter</i> (LLPF) filtering methods that use UKF and EKF, respectively, for approximating the optimal importance distributions in particle filter settings.</li>
	<p></p><li> <i>Rao-Blackwellized particle filters and smoothers</i> use closed form integration (e.g., Kalman Filter and RTS smoothers) for some of the state variables and Monte Carlo integration for others.</li>
	</ul>
Other methods also exist, for example, based on Gaussian mixtures.
<h2>Bayesian filtering equations and exact solutions</h2>

Bayesian filtering is considered with state estimation in general probabilistic state space models which have the following form
<BlockMath math="	\begin{aligned}
	x_k&\sim p(x_k|x_{k-1})\\
	y_k&\sim p(y_k|x_k)\\
	k&=1,2,\ldots
\end{aligned}"/>
where <Inline math="x_k \in \mathbb{R}^n"/> is the state of the system at time step <Inline math="k"/>, <Inline math="y_k \in \mathbb{R}^m"/> is the measurement at time step <Inline math="k"/>, <Inline math="p(x_k|x_{k-1})"/> is the dynamic model which describes the stochastic dynamic of the system, and <Inline math="p(y_k|x_k)"/> is the measurement model, which is the distribution of measurements given the state.

The model is assumed to be Markovian, which means that it has the following properties
<BlockMath math="\begin{aligned}
p(x_k|x_{0:k-1},y_{1:k-1})&=p(x_k|x_{k-1})\\
p(x_{k-1}|x_{k:T},y_{k:T})&=p(x_{k-1}|x_k)
\end{aligned}"/>
Another assumption usually made is the <i>Conditional independence of measurements</i> that means
<BlockMath math="\begin{aligned}
	p(y_k|x_{1:k},y_{1:k-1})=p(y_k|x_k).
\end{aligned}"/>

With the Markovian assumption and conditional independence of measurements, the <i>joint prior distribution</i> of the states and the <i>joint likelihood</i> of the measurements are, respectively
<BlockMath math="\begin{aligned}
	p(x_{0:T})&=p(x_0)\prod_{k=1}^Tp(x_k|x_{k-1})\\
	p(y_{1:T})&=\prod_{k=1}^T p(y_k|x_k)
\end{aligned}"/>
In principle, for a given <Inline math="T"/>, we could simply compute the posterior distribution of the states by <i>Bayes' rule</i>.
However, this is intractable for most applications because the number of computations increases as new observations arrive. To cope with real problem we need to have some recursive algorithm that does a constant number of operations independent of the number of observations. For this reason, we shall not consider the full posterior computation at all, but concentrate on the above mentioned distributions: filtering and prediction distributions and corresponding smoothing distributions.
<h3>Bayesian filtering</h3>

The purpose of Bayesian filtering is to compute the marginal posterior distribution or filtering distribution of the state <Inline math="x_k"/> at each time step <Inline math="k"/> given the history of measurements up to the time step <Inline math="k"/>:
<BlockMath math="\begin{aligned}
	p(x_k|y_{1:k})
\end{aligned}"/>

<div className="lemma">
    <b>Lemma:</b><br/>
The recursive equations for the Bayesian filter are given by the following equations
<ul>
	<li><b>Initialization:</b> The recursion starts from the prior distribution <Inline math="p(x_0)"/>;</li>
	<li><b>Prediction step:</b> The predictive distribution fo the state <Inline math="x_k"/> at the time step <Inline math="k"/>, given the dynamic model, can be computed by the <i>Chapman-Kolmogorov equation</i>
<BlockMath math="	\begin{aligned}
		p(x_k|y_{1:k-1})=\int p(x_k|x_{k-1})p(x_{k-1}|y_{1:k-1})dx_{k-1}.
\end{aligned}"/>
</li>
	<li> <b>Update step:</b> Given the measurement <Inline math="y_k"/> at time step <Inline math="k"/> the posterior distribution of the state <Inline math="x_k"/> can be computed by <i>Bayes' rule</i>
<BlockMath math="	\begin{aligned}
		p(x_k|y_{1:k})=\frac{1}{c}p(y_k|x_k)p(x_k|y_{1:k-1}),
\end{aligned}"/>
	where the constant <Inline math="c"/> is the normalization factor given by
<BlockMath math="	\begin{aligned}
		c=\int p(y_k|x_k)p(x_k|y_{1:k-1})dx_k.
\end{aligned}"/>
</li>
</ul>
</div>
<div className="proof"><b>Proof:</b><br/>
	Based on the Markovian and Conditioned Independence of measurement assumptions, one has
<BlockMath math="\begin{aligned}
p(x_k,x_{0:k-1}|y_{1:k})&=p(x_k,x_{k-1}|y_k,y_{1:k-1})\\
&=\frac{p(y_k|x_k,x_{k-1},y_{1:k-1})p(x_k,x_{k-1}|y_{1:k-1})}{p(y_k|y_{1:k-1})}\\
&=\frac{p(y_k|x_k,x_{k-1},y_{1:k-1})p(x_k|x_{k-1},y_{1:k-1})p(x_{k-1}|y_{1:k-1})}{p(y_k|y_{1:k-1})}\\
&=\frac{p(y_k|x_k)p(x_k|x_{k-1})p(x_{k-1}|y_{1:k-1})}{p(y_k|y_{1:k-1})}.
\end{aligned}"/>
Therefore,
<BlockMath math="\begin{aligned}
p(x_k|y_{1:k})&=\int p(x_k,x_{k-1}|y_{1:k})dx_{k-1}\\
&=\int \frac{p(y_k|x_k)p(x_k|x_{k-1})p(x_{k-1}|y_{1:k-1})}{p(y_k|y_{1:k-1})} dx_{k-1}\\
&=\frac{p(y_k|x_k)\int p(x_k|x_{k-1})p(x_{k-1}|y_{1:k-1}) dx_{k-1}}{p(y_k|y_{1:k-1})}\\
&=\frac{p(y_k|x_k)p(x_k|y_{1:k-1})}{\int p(y_k,x_k|y_{1:k-1})dx_k}\\
&=\frac{1}{c}p(y_k|x_k)p(x_k|y_{1:k-1}).
\end{aligned}"/>
<p align="right"><Inline math="\blacksquare"/></p>
</div>
<h2>References:</h2>
<p><a name="sarkka"></a>Särkkä, S., 2013. Bayesian filtering and smoothing. Cambridge University Press.</p>
</div>
<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
</article>
}
export default BayesianFiltering;