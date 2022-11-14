import React from 'react';
import Helmet from 'react-helmet';
import '../../../Components/Pages/Tutorials.css';
import { BlockMath } from 'react-katex';
import Inline from '../../../Components/Latex/Inline';
import Latex from '../../../Components/Latex/latex';
import '../../../../node_modules/katex/dist/katex.css';
import Image from '../../../Components/Image/Image';
import Disqus from 'disqus-react';
const IntroKalmanFilter = (props) => {
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
    <p align="right">Last Update:  September 12, 2021.</p>
<div>
<h2>Introduction</h2>

Kalman-type filters are extremely useful in diverse
real-world applications, including robotics, communication systems, GNSS, inertial navigation, chemical plant control, predicting the weather, multi-sensor data fusion, tracking of aircraft, satellites, ships, rockets, cars, people, cows, etc. Moreover, Kalman filters are relatively easy to design and code, and, besides its simplicity, they often provide good estimation accuracy for various real applications.
<p></p>
The reason for the use of the word "filter" is because it consists of a process to obtain the "best estimate" from noisy data, thus, amounts to "filtering out" the noise. But, more than that, the Kalman Filter also can provide estimates of variables that we do not even measure. For example, in tracking applications, we might only observe the position of a target and through the Kalman Filter we can obtain estimates of the velocity and heading as well. In another example, the Kalman Filter can provide estimates of the biases of accelerometer and gyroscope sensors in Inertial Navigation Systems without any direct measure of these biases.
<p></p>
From a theoretical viewpoint, the Kalman Filter is known to be the optimal filter for linear systems disturbed by Gaussian Noises. The optimality is in the MSE sense, i.e. the filter provides the smallest mean square error for systems that have linear state-space representation and are immersed in Gaussian noises.
<p></p>
Roughly speaking, the Kalman Filter combines knowledge about the system dynamic (prediction) with available measurements from sensors in a probabilistic manner. This allows one to characterize various random factors (disturbances) that the system might encounter.
<p></p>
There are various ways to derive the Kalman Filter equations. The first derivations given by Rudolf Emil Kalman in <a href="#cite.Kalman1960">Kalman1960</a> was based in the orthogonality principle. However, here we focus on the Bayesian derivation, as it seems to be the most elegant way to think about the Kalman Filter.
<p></p>
The purpose of Bayesian filtering, in a nutshell, is to compute <i>the probability density function </i> (pdf) of the system state given all the measurement up to the present time. In particular, this pdf is referred to as the posterior distribution or filtering distribution of the system state, and it is denoted by <Inline math="p(x_k|y_{1:k})"/> where <Inline math="x_k\in\mathbb{R}^n"/> is the system state and <Inline math="y_{1:k}"/> denotes the set of all measurements up to time instant <Inline math="k"/>.
<p></p>
For Markovian Systems, i.e. systems where the future state depends solely on the present state, this is accomplished by two equations. First, the so-called <i>Chapman-Komogorov Equation</i>,
<Latex math="\begin{aligned}
		p(x_{k+1}|y_{1:k})=\int p(x_{k+1}|x_{k})p(x_{k}|y_{1:k})dx_{k},
\end{aligned}" label="eq:chapman.komogorov"/>
provides the predictive distribution (prior state). The pdf <Inline math="p(x_{k+1}|x_k)"/> is the transition distribution, which encodes the dynamic model of the system by describing the probability of the next state given the present one. In addition, <Inline math="p(x_k|y_{1:k})"/> stands for the pdf of the present state given all measurements available.
<p></p>
Thereafter, when a new measurement <Inline math="y_{k+1}"/> becomes available from the sensors, the predictive distribution is updated to form the posterior distribution using the <i>Bayes' rule</i>,
<Latex math="\begin{aligned}
		p(x_{k+1}|y_{1:k+1})=\frac{p(y_{k+1}|x_{k+1})p(x_{k+1}|y_{1:k})}{p(y_{k+1}|y_{1:k})},
\end{aligned}" label="eq:bayes.rule"/>
where <Inline math="p(y_{k+1}|x_{k+1})"/> is the measurement distribution or likelihood distribution and <Inline math="p(y_{k+1}|y_{1:k})"/> acts as a normalization constant.
<p></p>
Unfortunately, the Bayesian Filter cannot be analytically obtained for the majority of systems because the integral in <a href="#eq:chapman.komogorov">eq:chapman.komogorov</a> becomes intractable, and the product <a href="#eq:bayes.rule">eq:bayes.rule</a> usually do not result in a known distribution. So, numeric approximations such as Particle Filters are used instead.
<p></p>
However, remarkably, for linear systems with Gaussian noises both <a href="#eq:chapman.komogorov">eq:chapman.komogorov</a>-<a href="#eq:bayes.rule">eq:bayes.rule</a> can be evaluated in closed-form resulting in the celebrated Kalman Filter.
<p></p>
<h2>From Bayes to Kalman Filter</h2>

Consider a linear system described in state-space by
<Latex math="\begin{aligned}
    x_{k+1}=Ax_k+Bu_k+Gw_k
\end{aligned}" label="eq:sys.dynamic"/>
where <Inline math="A\in\mathbb{R}^{n\times n}"/> is the dynamic matrix, <Inline math="B\in\mathbb{R}^{n\times p}"/> is the input matrix, <Inline math="u_k\in\mathbb{R}^p"/> is the input vector, <Inline math="G\in\mathbb{R}^{n\times l}"/> is the disturbance matrix, i.e. describes how the noise affect the states, and <Inline math="w_k\sim\mathcal{N}(0,Q_k)"/> is a Gaussian noise with zero-mean and covariance matrix <Inline math="Q_k=Q_k^T\succ 0 \in \mathbb{R}^{l\times l}"/> referred to as <i>the process noise</i>. 
<p></p>
<div class='remark'>
Although the system coefficient matrices are denoted without time-index, all the following results are valid as well for time-varying matrices.
</div>
<p></p>
From <a href="#eq:sys.dynamic">eq:sys.dynamic</a>, note that if we know the present state <Inline math="x_k"/> and the input <Inline math="u_k"/> then the only random component is <Inline math="Gw_k"/>. Therefore, <Inline math="x_{k+1}"/> is a random variable with mean <Inline math="(Ax_k+Bu_k)"/> and covariance <Inline math="GQ_kG^T"/>. Accordingly, one can state the transition distribution of a linear system corrupted by Gaussian noise as
<Latex math="\begin{aligned}
    p(x_{k+1}|x_k)=\mathcal{N}(x_{k+1};Ax_k+Bu_k,GQ_kG^T).
\end{aligned}"/>
<p></p>
Moreover, if the present state is also Gaussian distributed, i.e. <Inline math="x_k\sim\mathcal{N}(x_k;\hat{x}_{k|k},P_{k|k})"/>, thus, by evaluating the Chapman-Komogorov Equation one conclude that
<Latex math="\begin{aligned}
    p(x_{k+1}|y_{1:k})=\mathcal{N}(x_{k+1};\hat{x}_{k+1|k},P_{k+1|k})
\end{aligned}"/>
where
<Latex math="\begin{aligned}
\hat{x}_{k+1|k}&=A\hat{x}_{k|k}+Bu_k,\\
P_{k+1|k}&=AP_{k|k}A^T+GQ_kG^T.
\end{aligned}"/>
Obs: See the proof in the appendix <a href="#app:kf.time.update">app:kf.time.update</a>.
<p></p>
Furthermore, consider the measurement model in the form
<Latex math="\begin{aligned}
y_{k+1}=Hx_{k+1}+\varepsilon_{k+1}
\end{aligned}" label="eq:sys.meas"/>
where <Inline math="H\in\mathbb{R}^{m\times n}"/> is the output matrix and <Inline math="\varepsilon_k\sim\mathcal{N}(0,R_{k+1})"/> is the measurement noise. This means that the available measurements are obtained by sensors that are modeled by a linear map of the system state, and the measurement noise is also Gaussian. Note that from <a href="#eq:sys.meas">eq:sys.meas</a>, given the state <Inline math="x_{k+1}"/> the only random part is the measurement noise. Thus, the measurement distribution is
<Latex math="\begin{aligned}
p(y_{k+1}|x_{k+1})=\mathcal{N}(y_{k+1};Hx_{k+1},R_{k+1}).
\end{aligned}"/>
In this case, because the Gaussian distribution is a conjugate prior to itself, the Baye's Rule results in
<Latex math="\begin{aligned}
    p(x_{k+1}|y_{1:k+1})=\mathcal{N}(x_{k+1};\hat{x}_{k+1|k+1},P_{k+1|k+1}),
\end{aligned}"/>
where
<Latex math="\begin{aligned}
    \hat{x}_{k+1|k+1}&=\hat{x}_{k+1|k}+K(y_{k+1}-H\hat{x}_{k+1|k}),\\
    K&=P_{k+1|k}H^T(R_{k+1}+HP_{k+1|k}H^T)^{-1},\\
    P_{k+1|k+1}&=(I-KH)P_{k+1|k}.
\end{aligned}"/>
Obs: See the proof in the appendix <a href="#app:kf.meas.update">app:kf.meas.update</a>
<p></p>
In summary, given the initial state in the form <Inline math="x_0\sim\mathcal{N}(x_0,\hat{x}_{0|0},P_{0|0})"/>, the Kalman Filter consist of evaluating recursively from <Inline math="k=0,1,2,3,\ldots"/> the following five equations
<Latex math="\begin{aligned}
    \hat{x}_{k+1|k}&=A\hat{x}_{k|k}+Bu_k,\\
P_{k+1|k}&=AP_{k|k}A^T+GQ_kG^T\\
\hat{x}_{k+1|k+1}&=\hat{x}_{k+1|k}+K(y_{k+1}-H\hat{x}_{k+1|k}),\\
    K&=P_{k+1|k}H^T(R_{k+1}+HP_{k+1|k}H^T)^{-1},\\
    P_{k+1|k+1}&=(I-KH)P_{k+1|k}.
\end{aligned}"/>
<p></p>
Interestingly, the Kalman Filter can be interpreted as a two-stage recursive algorithm where first a prediction is made based on the dynamic model followed by a correction provided by the measurement. Figure <a href="#fig:recursive.diagram">fig:recursive.diagram</a> illustrate this recursive nature of the Kalman Filter.
<p></p>
<Image src="/images/recursive_diagram.svg" label="fig:recursive.diagram" legend="Recursive structure of the Kalman Filter." width="50%"/>
<p></p>
If numeric stability is a concern, the last equation for the posterior covariance can be replaced by the so-called <i>Joseph Form</i>,
<Latex math="\begin{aligned}
    P_{k+1|k+1}=(I-KH)P_{k+1|k}(I-KH)^T +KR_{k+1}K^T,
\end{aligned}"/>
that reduces the loss of symmetry of the covariance matrix due to numeric round-off.
<p></p>
<h2>Example: 1D Tracking</h2>

To illustrate how a Kalman Filter works, let's consider a toy example of a unidimensional tracking problem of a car, as illustrated in Figure <a href="#fig:1d.tracking.example">fig:1d.tracking.example</a>.
<Image src="/images/1d_tracking_gaussian.svg" label="fig:1d.tracking.example" legend="1D Tracking example." width="50%"/>
Suppose the system follows a <i>quasi-constant velocity model</i> where the states are the position and velocity of the target, i.e. <Inline math="x_k=[p_k~v_k]^T"/>. The state-space models is then,
<Latex math="\begin{aligned}
   \begin{bmatrix}
    p_{k+1}\\
    v_{k+1}
   \end{bmatrix} =\begin{bmatrix}
    1 & \Delta t\\
    0 & 1
   \end{bmatrix} \begin{bmatrix}
    p_{k}\\
    v_{k}
   \end{bmatrix} +\begin{bmatrix}
    0\\
    1
   \end{bmatrix} w_k.
\end{aligned}"/>
For this example, there is no direct input, but we assume that there is a little fluctuation in the velocity represented by a Gaussian noise <Inline math="w_k\sim \mathcal{N}(0,Q_k)"/> that enters only the velocity state, this explains the terminology "quasi-constant velocity" model. 
<p></p>
In addition, suppose that a radar provides noisy position measurements of the target. Thus, the measurement model is in the form
<Latex math="\begin{aligned}
    y_k=[1~0]x_k+\varepsilon_k,
\end{aligned}"/>
where <Inline math="\varepsilon_k\sim\mathcal{N}(0,R_k)"/> is the radar noise. Assume that the target start about <Inline math="90"/> meters far away of the radar and its velocity is close to <Inline math="3"/>m/s. But, we do not know this initial condition. Thus, we use a Gaussian distribution for the initial state in the form <Inline math="x_0\sim\mathcal{N}(\hat{x}_{0|0},P_{0|0})"/> where <Inline math="\hat{x}_{0|0}=[100~5]^T"/> is the initial guess and <Inline math="P_{0|0}=diag((5m)^2,(1m/s)^2)"/> the confidence, i.e. with <Inline math="95\%"/> probability the initial position is about <Inline math="100\pm 15m"/> and the velocity <Inline math="5\pm 3m/s"/> (<Inline math="3\sigma"/> interval). Also, suppose that the radar noise has a standard deviation of <Inline math="2m"/> and the velocity fluctuation has a standard deviation of <Inline math="0.1m/s"/> , i.e. <Inline math="R=(2m)^2"/>, <Inline math="Q=(0.1m/s)^2"/>. Thus, <Inline math="y_k=p_k\pm 6m"/> and <Inline math="v_{k+1}=v_k\pm 0.3m/s"/> with <Inline math="95\%"/> probability. The Kalman Filter for this example is then
<Latex math="\begin{aligned}
     \hat{x}_{k+1|k}&=\begin{bmatrix}
    1 & \Delta t\\
    0 & 1
   \end{bmatrix}\hat{x}_{k|k},\\
P_{k+1|k}&=\begin{bmatrix}
    1 & \Delta t\\
    0 & 1
   \end{bmatrix}P_{k|k}\begin{bmatrix}
    1 & \Delta t\\
    0 & 1
   \end{bmatrix}^T+\begin{bmatrix}
    0 \\ 1
   \end{bmatrix}Q\begin{bmatrix}
    0 & 1
   \end{bmatrix},\\
\hat{x}_{k+1|k+1}&=\hat{x}_{k+1|k}+K(y_{k+1}-[1~0]\hat{x}_{k+1|k}),\\
    K&=P_{k+1|k}[1~0]^T(R+[1~0]P_{k+1|k}[1~0]^T)^{-1},\\
    P_{k+1|k+1}&=(I-K[1~0])P_{k+1|k}.
\end{aligned}"/>
The result of a simulation using Matlab is shown in the Figure <a href="#fig:1d.tracking">fig:1d.tracking</a>.
<p></p>
<Image src="/images/1d_tracking.svg" label="fig:1d.tracking" legend="Example of the Kalman Filter for 1D tracking." width="50%"/>
<h1 id="appendix">Appendix</h1>

<h2>Time-update</h2>

<a class="label" id="app:kf.time.update"></a>
<div class='lemma'>
<a class="label" id="lemma:kf.time.update"></a>
Consider the linear and Gaussian systems in the form
<Latex math="\begin{aligned}
    x_{k+1}&=Ax_k+w_k
\end{aligned}"/>
with <Inline math="w_k\sim\mathcal{N}(0,Q_k)"/>. For a given a distribution of the state at time <Inline math="k"/> in the form <Inline math="x_k\sim\mathcal{N}(x_k;\hat{x}_{k|k},P_{k|k})"/>, <b>the predictive distribution one-step ahead</b> is given by
<Latex math="\begin{aligned}
    p(x_{k+1}|y_{1:k})&=\mathcal{N}(x_{k+1};A\hat{x}_{k|k},P_{k+1|k})\\
    &=\frac{1}{\sqrt{(2\pi)^n|P_{k+1|k}|}}\exp\left(-\frac{1}{2}\|x_{k+1}-A\hat{x}_{k|k}\|_{P_{k+1|k}^{-1}}^2\right),
\end{aligned}"/>
with 
<Latex math="\begin{aligned}
    P_{k+1|k}=AP_{k|k}A^T +Q_k.
\end{aligned}"/>
</div>
<div class='proof'>
<Latex math="\begin{aligned}
    p(x_{k+1}|y_{1:k})=\int p(x_{k+1}|x_k)p(x_k|y_{1:k})dx_k
    \\
    =\alpha\int \exp\left(-\frac{1}{2}(\|x_{k+1}-Ax_k\|_{Q_k^{-1}}^2+\|x_k-\hat{x}_{k|k}\|_{P_{k|k}^{-1}}^2)\right)dx_k\\
    =\alpha \exp\left(-\frac{1}{2}(\|x_{k+1}\|_{Q_k^{-1}}^2+\|\hat{x}_{k|k}\|_{P_{k|k}^{-1}}^2)\right)\\\times \int \exp\left(-\frac{1}{2}\|x_k\|^2_{W}+x^T_k(P_{k|k}^{-1}\hat{x}_{k|k}+A^T Q^{-1}x_{k+1})\right)dx_k
\end{aligned}"/>
where 
<Latex math="\begin{aligned}
\alpha&=((2\pi)^{2n}|Q_k||P_{k|k}|)^{-1/2},\\
W&=A^T Q_k^{-1}A+P_{k|k}^{-1}
\end{aligned}"/>
<p></p>
Notice that
<Latex math="\begin{aligned}
    -\frac{1}{2}\|x_k-W^{-1}(P_{k|k}^{-1}\hat{x}_{k|k}+A^T Q^{-1}x_{k+1})\|_W^2\\=-\frac{1}{2}\|x_k\|^2_W+x_k^T (P_{k|k}^{-1}\hat{x}_{k|k}+A^T Q^{-1}x_{k+1})-\frac{1}{2}\|P_{k|k}^{-1}\hat{x}_{k|k}+A^T Q^{-1}x_{k+1}\|^2_{W^{-1}}
\end{aligned}"/>
Therefore,
<Latex math="\begin{aligned}
    p(x_{k+1}|y_{1:k})
    =\alpha \exp\left(-\frac{1}{2}(\|x_{k+1}\|_{Q_k^{-1}}^2+\|\hat{x}_{k|k}\|_{P_{k|k}^{-1}}^2-\|P_{k|k}^{-1}\hat{x}_{k|k}+A^T Q_k^{-1}x_{k+1}\|^2_{W^{-1}})\right)\\\times \int \exp\left(-\frac{1}{2}\|x_k-W^{-1}(P_{k|k}^{-1}\hat{x}_{k|k}+A^T Q^{-1}x_{k+1})\|^2_{W}\right)dx_k\\
    =\alpha\exp\Bigl(-\frac{1}{2}(\|x_{k+1}\|_{Q_k^{-1}-Q_k^{-1}AW^{-1}A^T Q_k^{-1}}^2+\|\hat{x}_{k|k}\|_{P_{k|k}^{-1}-P_{k|k}^{-1}W^{-1}P_{k|k}^{-1}}^2\\-2\hat{x}_{k|k}^T P_{k|k}^{-1}W^{-1}A^T Q^{-1}_kx_{k+1})\Bigr)\times \sqrt{(2\pi)^n|W^{-1}|}.
\end{aligned}"/>
Let <Inline math="P_{k+1|k}=AP_{k|k}A^T + Q_k"/>, thus 
<Latex math="\begin{aligned}
    \|x_{k+1}-A\hat{x}_{k|k}\|_{P_{k+1|k}^{-1}}^2=\|x_{k+1}\|_{P_{k+1|k}^{-1}}^2+\|\hat{x}_{k|k}\|_{A^T P_{k+1|k}^{-1}A}^2-2x_{k+1}^T P_{k+1|k}^{-1}A\hat{x}_{k|k}
\end{aligned}"/>
and
<Latex math="\begin{aligned}
P_{k+1|k}^{-1}=(AP_{k|k}A^T+Q_k)^{-1}\\
=Q_k^{-1}-Q_k^{-1}A [P_{k|k}^{-1}+A^T Q_k^{-1}A]^{-1}A^T Q_k^{-1}\\
=Q_k^{-1}-Q_k^{-1}A W^{-1}A^T Q_k^{-1}
\end{aligned}"/>
with  <Inline math="W^{-1}=P_k-P_kA^T [Q_k+AP_{k|k}A^T]^{-1}A P_k"/>. Accordingly,
<Latex math="\begin{aligned}
    P_{k|k}^{-1}-P_{k|k}^{-1}W^{-1}P_{k|k}^{-1}\\=P_{k|k}^{-1}-P_{k|k}^{-1}(P_k-P_kA^T [Q_k+AP_{k|k}A^T]^{-1}A P_k)P_{k|k}^{-1}\\
    =A^T P_{k+1|k}^{-1}A.
\end{aligned}"/>
Finally, as <Inline math="AP_{k|k}A^T=P_{k+1|k}-Q_k"/>, one has
<Latex math="\begin{aligned}
    Q_k^{-1}AW^{-1}P_{k|k}^{-1}=Q_k^{-1}A[P_{k|k}-P_{k|k}A^T P_{k+1|k}^{-1}AP_{k|k}]P_{k|k}^{-1}\\
    =Q_k^{-1}A-Q_k^{-1}A P_{k|k}A^T P_{k+1|k}^{-1}A\\
    =Q_k^{-1}A-Q_k^{-1}(P_{k+1|k}-Q_k) P_{k+1|k}^{-1}A    =P_{k+1}^{-1}A.
\end{aligned}"/>
Regarding the constant factor, one has
<Latex math="\begin{aligned}
    p(x_{k+1}|y_{1:k+1})  =\frac{1}{\sqrt{(2\pi)^n|Q_k||P_{k|k}||W|}} \exp\left(-\frac{1}{2}\|x_{k+1}-A\hat{x}_{k|k}\|_{P_{k+1|k}^{-1}}^2\right)
\end{aligned}"/>
Note that
<Latex math="\begin{aligned}
    |P_{k+1|k}|=|Q_k+AP_{k|k}A^T|
    =|Q_k||I+Q_k^{-1}AP_{k|k}A^T|\\
    =|Q_k||A^{-T}A^T+Q_k^{-1}AP_{k|k}A^T|
    =|Q_k||A^{-T}+Q_k^{-1}AP_{k|k}||A^T|\\
    =|Q_k||A^{-T}P_{k|k}^{-1}P_{k|k}+Q_k^{-1}AP_{k|k}||A^T|\\
    =|Q_k||A^{-T}P_{k|k}^{-1}+Q_k^{-1}A||P_{k|k}||A^T|\\
    =|Q_k||P_k||A^T||A^{-T}P_{k|k}^{-1}+Q_k^{-1}A|\\
    =|Q_k||P_k||P_{k|k}^{-1}+A^T Q_k^{-1}A|
    =|Q_k||P_{k|k}||W|.
\end{aligned}"/>
In conclusion, one has
<Latex math="\begin{aligned}
    p(x_{k+1}|y_{1:k+1})&=\frac{1}{\sqrt{(2\pi)^n|P_{k+1|k}|}}\exp\left(-\frac{1}{2}\|x_{k+1}-A\hat{x}_{k|k}\|_{P_{k+1|k}^{-1}}^2\right)\\
    &=\mathcal{N}(x_{k+1};A\hat{x}_{k|k},P_{k+1|k}).
\end{aligned}"/>
</div>
<h2>Measurement-Update</h2>

<a class="label" id="app:kf.meas.update"></a>
Consider a linear measurement model in the form
<Latex math="\begin{aligned}
    y_{k+1}=Hx_{k+1}+\varepsilon_{k+1}
\end{aligned}"/>
with <Inline math="\varepsilon_{k+1}\sim\mathcal{N}(0,R_{k+1})"/>.
Given a prior <Inline math="x_{k+1}\sim\mathcal{N}(x_{k+1};\hat{x}_{k+1|k},P_{k+1|k})"/> and assuming that <Inline math="x_{k+1}"/> and <Inline math="y_{k+1}"/> are jointly normal distributed, one find that
<Latex math="\begin{aligned}
	p(x_{k+1}|y_{1:k+1})&=p(x_{k+1}|y_{k+1},y_{1:k})\\
	&=\frac{p(y_{k+1}|x_{k+1},y_{1:k})p(x_{k+1}|y_{1:k})}{p(y_{k+1}|y_{1:k})}\\
	&=\frac{p(y_{k+1}|x_{k+1})p(x_{k+1}|y_{1:k})}{p(y_{k+1}|y_{1:k})}\\
	&=\frac{p(x_{k+1},y_{k+1}|y_{1:k})}{p(y_{k+1}|y_{1:k})}\\&=\frac{\alpha_1\exp(-\frac{1}{2}\|m-\bar{m}\|_{M^{-1}}^2)}{\alpha_2\exp(-\frac{1}{2}\|y_{k+1}-\bar{y}_{k+1}\|_{P_{yy}^{-1}}^2)}\\
	&=\alpha \exp\left(-\frac{1}{2}(\|m-\bar{m}\|_{M^{-1}}^2-\|y_{k+1}-\bar{y}_{k+1}\|_{P_{yy}^{-1}}^2)\right)
\end{aligned}"/>
where <Inline math="m=[x_{k+1}^T ~y_{k+1}^T]^T"/>, <Inline math="\bar{m}=[\hat{x}_{k+1|k}^T ~\bar{y}_{k+1}^T]^T"/> and
<Latex math="\begin{aligned}
    M:=\begin{bmatrix}
    P_{k+1|k} & P_{k+1|k}H^T\\
    HP_{k+1|k} & R+HP_{k+1|k}H^T
    \end{bmatrix}.
\end{aligned}"/>
Defining
<Latex math="\begin{aligned}
    \xi_1&=x_{k+1}-\hat{x}_{k+1|k},\\
    \xi_2&=y_{k+1}-\bar{y}_{k+1},
\end{aligned}"/>
one has
<Latex math="\begin{aligned}
	\|m-\bar{m}\|_{M^{-1}}^2-\|y_{k+1}-\bar{y}_{k+1}\|_{P_{yy}^{-1}}^2=\\\xi_1^T \Sigma_{xx}\xi_1+\xi_1^T \Sigma_{xy}\xi_2+\xi_2^T \Sigma_{yx}\xi_1+\xi_2^T \Sigma_{yy}\xi_2-\xi_2^T (\Sigma_{yy}-\Sigma_{yx}\Sigma_{xx}^{-1}\Sigma_{xy})\xi_2\\
	=\xi_1^T \Sigma_{xx}\xi_1+\xi_1^T (\Sigma_{xx}\Sigma_{xx}^{-1})\Sigma_{xy}\xi_2+\xi_2^T \Sigma_{yx}(\Sigma_{xx}^{-1}\Sigma_{xx})\xi_1+\xi_2^T \Sigma_{yx}\Sigma_{xx}^{-1}\Sigma_{xy}\xi_2\\
	= \|\xi_1+\Sigma_{xx}^{-1}\Sigma_{xy}\xi_2\|_{\Sigma_{xx}}^2= \|x_{k+1}-(\hat{x}_{k+1|k}+P_{xy}P_{yy}^{-1}(y_{k+1}-\bar{y}_{k+1}))\|_{\Sigma_{xx}}^2
\end{aligned}"/>
where the following identity for the inverse of partitioned matrix is employed
<Latex math="\begin{aligned}
	\left[
	\begin{matrix}
	P_{xx} & P_{xy}\\
	P_{yx} & P_{yy}
	\end{matrix}
	\right]^{-1}&=\left[
	\begin{matrix}
	(P_{xx}-P_{xy}P_{yy}^{-1}P_{yx})^{-1} & -(P_{xx}-P_{xy}P_{yy}^{-1}P_{yx})^{-1}P_{xy}P_{yy}^{-1}\\
	-P_{yy}^{-1}P_{yx}(P_{xx}-P_{xy}P_{yy}^{-1}P_{yx})^{-1} & (P_{yy}-P_{yx}P_{xx}^{-1}P_{xy})^{-1}
	\end{matrix}
	\right]\\
	&=\left[
	\begin{matrix}
	\Sigma_{xx} & \Sigma_{xy}\\
	\Sigma_{yx} & \Sigma_{yy}
	\end{matrix}
	\right]
\end{aligned}"/>
In addition, note that the following relations hold 
<p></p>
<Latex math="\begin{aligned}
		\Sigma_{xy}&=-\Sigma_{xx}P_{xy}P_{yy}^{-1}\\
		\Rightarrow &\Sigma_{xx}^{-1}\Sigma_{xy}=-P_{xy}P_{yy}^{-1}
\end{aligned}"/>
and
<Latex math="\begin{aligned}
\Sigma_{yy}&=P_{yy}^{-1}+P_{yy}^{-1}P_{yx}\Sigma_{xx}P_{xy}P_{yy}^{-1}\\
&=P_{yy}^{-1}+\Sigma_{yx}\Sigma_{xx}^{-1}\Sigma_{xy}\\
\Rightarrow & P_{yy}^{-1}=\Sigma_{yy}-\Sigma_{yx}\Sigma_{xx}^{-1}\Sigma_{xy}
\end{aligned}"/>
Thereafter, one concludes that the posterior <Inline math="p(x_{k+1}|y_{1:k+1})"/> is also Gaussian distributed. Which implies that
<Latex math="\begin{aligned}
	\hat{x}_{k+1|k+1}&=\hat{x}_{k+1|k}+K(y_{k+1}-H\hat{x}_{k+1|k})\\
	K&=P_{k+1|k}H^T (R+HP_{k+1|k}H^T)^{-1}\\
	P_{k+1|k+1}&=\Sigma_{xx}^{-1}=P_{k+1|k}-P_{k+1|k}H^T (R+HP_{k+1|k}H^T)^{-1}HP_{k+1|k}.
\end{aligned}"/>
<p></p>
<h2>Gaussian Identities</h2>

<div class='itemize'><lu>
    <li> <b>Product:</b></li>
<Latex math="\begin{aligned}
    \mathcal{N}(x;a,A)\mathcal{N}(x;b,B)=\mathcal{N}(x;c,C)\mathcal{N}(a;b,A+B)
\end{aligned}"/>
where
<Latex math="\begin{aligned}
    C&=(A^{-1}+B^{-1})^{-1}\\
    c&=C(A^{-1}a+B^{-1}b)
\end{aligned}"/>
<li> <b>Marginal</b></li>
<Latex math="\begin{aligned}
    \int \mathcal{N}\left(\begin{bmatrix}x\\y
    \end{bmatrix};\begin{bmatrix}\mu_x\\\mu_y
    \end{bmatrix},\begin{bmatrix}\Sigma_x & \Sigma_{xy}\\\Sigma_{yx} & \Sigma_y
    \end{bmatrix}\right)dy=\mathcal{N}(x;\mu_x,\Sigma_x)
\end{aligned}"/>
<li> <b>Conditional</b></li>
<Latex math="\begin{aligned}
    p(x|y)=\frac{p(x,y)}{p(y)}=\mathcal{N}(x;\mu_x+\Sigma_{xy}\Sigma_y^{-1}(y-\mu_y),\Sigma_x-\Sigma_{xy}\Sigma_y^{-1}\Sigma_{yx})
\end{aligned}"/>
<li> <b>Projection</b></li>
<Latex math="\begin{aligned}
    p(z)=\mathcal{N}(z;\mu,\Sigma)\Rightarrow p(Az)=\mathcal{N}(Az;A\mu,A\Sigma A^T)
\end{aligned}"/>
<li> <b>Integral of the (linear) product</b></li>
<Latex math="\begin{aligned}
    \int \mathcal{N}(y;Ax,\Sigma_y)\mathcal{N}(x;\mu_x,\Sigma_x)dx = \mathcal{N}(x;A\mu_x,A\Sigma_xA^T+\Sigma_y)
\end{aligned}"/>
<li> <b>Integral of the (disturbed) product</b></li>
<Latex math="\begin{aligned}
    \int \mathcal{N}(y;h(x)+\xi,\Sigma_y)\mathcal{N}(\xi;\mu_\xi,\Sigma_\xi)d\xi = \mathcal{N}(y;h(x)+\mu_\xi,\Sigma_y+\Sigma_\xi)
\end{aligned}"/>
</lu></div>
<h2>Woodbury matrix Identity</h2>

<Latex math="\begin{aligned}
    [A+UCV]^{-1}=A^{-1}-A^{-1}U[C^{-1}+VA^{-1}U]^{-1}VA^{-1}
\end{aligned}"/>

</div>
<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
</article>
}
export default IntroKalmanFilter;