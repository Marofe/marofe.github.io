import React from 'react';
import Helmet from 'react-helmet';
import '../../../Components/Pages/Tutorials.css';
import { BlockMath } from 'react-katex';
import Inline from '../../../Components/Latex/Inline';
import Latex from '../../../Components/Latex/latex';
import '../../../../node_modules/katex/dist/katex.css';
import Image from '../../../Components/Image/Image';
import Disqus from 'disqus-react';
const RiccatiEq = (props) => {
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
<h2>The Differential Riccati Equation</h2>

The selection of an optimal control law and the design of optimal filters require the solving of a Riccati Equation. So, Riccati type equations emerge naturally on control and filtering problems of  dynamic systems. 
<p></p>
To find solutions for Riccati Equations, it is convenient to make subdivisions based in the nature of the coefficient matrices and the time interval considered. 
<p></p>
<div class='itemize'><lu>
	<li> Time-varying coefficients; <Inline math="t_1<\infty"/>.</li>
	<li> Time-varying coefficients; <Inline math="t_1\rightarrow \infty"/>.</li>
	<li> Constant coefficients; <Inline math="t_1<\infty"/>.</li>
	<li> Constant coefficient; <Inline math="t_1\rightarrow \infty"/>.</li>
</lu></div>
<p></p>
In particular, we restrict attention to the Riccati equation occurring in a situation when a boundary condition will be given at <Inline math="t_1"/> with the solution desired for <Inline math="t\le t_1"/>. Recall that the Riccati Equation in the context of control problem runs "backward" in time.
<p></p>
<Image src="/images/p_finite.svg" label="fig:p_finite" legend="Trace of $P(t)$ for Finite Horizon. The evolution is 'backward' in time." width="50%"/>
<p></p>
The following results are based on the book <a href="#cite.Anderson1971">Anderson1971</a>. It shows that in all four cases, it is possible to replace the problem of solving the <i>nonlinear</i> Riccati differential equation by the problem of solving a <i>linear</i> differential equation and then computing a matrix inverse. 
<h3>Time-Varying Coeff. and Finite Horizon</h3>

Consider the differential Riccati equation for <Inline math="t \le t_1"/> of the form
<Latex math="\begin{aligned}
	-\dot{P}=P(t)F(t)+F(t)^T P(t)-P(t)G(t)R^{-1}(t)G(t)^T P(t)+Q(t)
\end{aligned}" label="eq:diff_riccati"/>
and the following assumptions: 
<Latex math="\begin{aligned}
P(t_1)&=P_1=P_1^T \ge 0\\
Q(t)&=Q(t)^T \ge 0,\\
R(t)&=R(t)^T >0.
\end{aligned}"/>
<p></p>
Associated with <a href="#eq:diff_riccati">eq:diff_riccati</a> we define an augmented <i>linear</i> differential equation
<Latex math="\begin{aligned}
	\left[
	\begin{matrix}
	\dot{X}(t)\\
	\dot{Y}(t)
	\end{matrix}
	\right]=\left[
	\begin{matrix}
	F(t) & -G(t)R^{-1}(t)G(t)^T \\
	-Q(t) & -F(t)^T
	\end{matrix}
	\right]\left[
	\begin{matrix}
	X(t)\\
	Y(t)
	\end{matrix}
	\right],\quad \left[
	\begin{matrix}
	X(t_1)\\
	Y(t_1)
	\end{matrix}
	\right]=\left[
	\begin{matrix}
	I\\
	P_1
	\end{matrix}
	\right].
\end{aligned}" label="eq:augm_riccati"/>
<div class='lemma'>
	If the solution of <a href="#eq:diff_riccati">eq:diff_riccati</a> exists on $[t,t_1]$ then the solution of <a href="#eq:augm_riccati">eq:augm_riccati</a> has the property that $X^{-1}(t)$ exists and
<Latex math="\begin{aligned}
		P(t)=Y(t)X^{-1}(t).
\end{aligned}"/>
</div>
<div class='proof'>
	By the <i>product rule</i> and <i>inverse rule</i> of matrix calculus, one have
<Latex math="\begin{aligned}
		\frac{d}{dt}[Y(t)X^{-1}(t)]&=\dot{Y}(t)X^{-1}(t)-Y(t)X^{-1}(t)\dot{X}(t)X^{-1}(t).
\end{aligned}"/>
	Notice that from <a href="#eq:augm_riccati">eq:augm_riccati</a> we have
<Latex math="\begin{aligned}
		\dot{X}(t)&=F(t)X(t)-G(t)R^{-1}(t)G(t)^T Y(t),\\
		\dot{Y}(t)&=-Q(t)X(t)-F(t)^T Y(t)
\end{aligned}" label="eq:difY"/>
	Thus,
<Latex math="\begin{aligned}
	\frac{d}{dt}[YX^{-1}]&=(-QX-F^T Y)X^{-1}-YX^{-1}(FX-GR^{-1}G^T Y)X^{-1}\\
	&=-QXX^{-1}-F^T YX^{-1}-YX^{-1}FXX^{-1}+YX^{-1}GR^{-1}G^T YX^{-1}\\
	&=-Q-F^T (YX^{-1})-(YX^{-1})F+(YX^{-1})GR^{-1}G^T(YX^{-1})\\
	&=-Q-F^T P-PF+PGR^{-1}G^T P
\end{aligned}"/>
	where for notation simplicity we adopt <Inline math="X(t)=X,Y(t)=Y,Q(t)=Q,F(t)=F,G(t)=G,R(t)=R"/> and <Inline math="P(t)=P"/>. As a result, we conclude that
<Latex math="\begin{aligned}
		-\dot{P}=Q+F^T P+PF-PGR^{-1}G^T P.
\end{aligned}"/>
The preceding manipulations also show that if <Inline math="X^{-1}(\sigma)"/> exists for all <Inline math="\sigma \in [t,t_1]"/> then <Inline math="P(t)"/> exists for the same interval. Let us now check that the existence of <Inline math="P(t)"/> guarantees the existence of <Inline math="X^{-1}(t)"/>.
<p></p>
Let <Inline math="\Phi(\cdot,\cdot)"/> be the <i>Transition Matrix</i> associated with the system
<Latex math="\begin{aligned}
	\dot{X}=[F(t)-G(t)R^{-1}(t)G(t)^T P(t)]X(t)
\end{aligned}"/>
As long as <Inline math="P(t)"/> exists for <Inline math="t\le t_1"/> then <Inline math="\Phi(\cdot,\cdot)"/> is defined for all its arguments values less or equal to <Inline math="t_1"/>. We claim that
<Latex math="\begin{aligned}
	X(t)=\Phi(t,t_1),\quad Y(t)=P(t)\Phi(t,t_1).
\end{aligned}" label="eq:claim"/>
This is sufficient to prove that <Inline math="X^{-1}(t)"/> exists, since <Inline math="\Phi(t,t_1)^{-1}=\Phi(t_1,t)"/> is known to exist.
<p></p>
To verify the claim <a href="#eq:claim">eq:claim</a>, we have
<Latex math="\begin{aligned}
	\dot{\Phi}&=[F-GR^{-1}G^T P]\Phi\\
	&=FX-GR^{-1}G^T Y=\dot{X}
\end{aligned}" label="eq:difPhi"/>
and
<Latex math="\begin{aligned}
	\frac{d}{dt}[P\Phi]&=\dot{P}\Phi+P\dot{\Phi}\\
&=-(PF+F^T P-PGR^{-1}G^T P+Q)\Phi +P(F\Phi-GR^{-1}G^T Y)\\
&=-QX -F^T Y=\dot{Y}
\end{aligned}"/>
Therefore, we have that the relations <a href="#eq:claim">eq:claim</a> satisfy <a href="#eq:difX">eq:difX</a> and <a href="#eq:difY">eq:difY</a>.
</div>
<p></p>
<div class='remark'>
Another scenario that might occur is when $t_1\rightarrow \infty$ and the matrix coefficients are varying. For this case, only an approximation for $P_\infty$ is possible to obtain by integrating <a href="#eq:augm_riccati">eq:augm_riccati</a>. However, that approximation depends on the length $t_1$. Thus, the approximation becomes better as $t_1$ is increased.
</div>
<h3>Const. Coeff and Finite Horizon (<Inline math="t_1<\infty"/>)</h3>

For this scenario, consider
<Latex math="\begin{aligned}
-\dot{P}=P(t)F+F^T P(t)-P(t)GR^{-1}G^T P(t)+Q
\end{aligned}" label="eq:diff_riccati_cost"/>
where <Inline math="F,G,R"/> and <Inline math="Q"/> are constant matrices. The respective augmented linear differential equation is
<Latex math="\begin{aligned}
\left[
\begin{matrix}
\dot{X}(t)\\
\dot{Y}(t)
\end{matrix}
\right]=\left[
\begin{matrix}
F & -GR^{-1}G^T \\
-Q & -F^T
\end{matrix}
\right]\left[
\begin{matrix}
X(t)\\
Y(t)
\end{matrix}
\right],\quad \left[
\begin{matrix}
X(t_1)\\
Y(t_1)
\end{matrix}
\right]=\left[
\begin{matrix}
I\\
P_1
\end{matrix}
\right].
\end{aligned}" label="eq:augm_riccati_const"/>
As long as all coefficients are constant, the closed-form solution is
<Latex math="\begin{aligned}
\left[
\begin{matrix}
X(t)\\
Y(t)
\end{matrix}
\right]=\exp\left(\left[
\begin{matrix}
F & -GR^{-1}G^T \\
-Q & -F^T
\end{matrix}
\right](t_1-t)\right)\left[
\begin{matrix}
X(t_1)\\
Y(t_1)
\end{matrix}
\right].
\end{aligned}"/>
Setting,
<Latex math="\begin{aligned}
\left[ 
\begin{matrix}
\Phi_{11}(t) && \Phi_{12}(t)\\
\Phi_{21}(t) && \Phi_{22}(t)
\end{matrix}
\right]=
\exp\left(\left[
\begin{matrix}
F & -GR^{-1}G^T \\
-Q & -F^T
\end{matrix}
\right](t_1-t)\right)
\end{aligned}"/>
then, the Riccati closed-form solution is
<Latex math="\begin{aligned}
P(t)=\left[\Phi_{21}(t)X(t_1)+\Phi_{22}(t)Y(t_1)\right]\left[\Phi_{11}(t)X(t_1)+\Phi_{12}(t)Y(t_1)\right]^{-1}.
\end{aligned}"/>
<h3>Constant Coeff. and <Inline math="t_1\rightarrow \infty"/></h3>

When <Inline math="t_1 \rightarrow \infty"/> with constant coefficients, we obtain the so-called  <i>Algebraic Riccati Equation</i>
<Latex math="\begin{aligned}
0=P_\infty F+F^T P_\infty-P_\infty GR^{-1}G^T P_\infty+Q.
\end{aligned}" label="eq:riccati_const"/>
<Image src="/./images/p_infinite.svg" label="fig:p_infinite" legend="Trace of $P(t)$ for infinite Horizon." width="50%"/>
This is also known as the <i>Steady-state Solution</i> of the Riccati Equation. It is implicitly assumed that the dynamic system associated with the Riccati equation is controllable and observable. The controllability assumption guaranteeing that the steady-state solution exists, and the observability assumption assures that this solution is positive definite.
<p></p>
There are plenty of different approaches to solve <a href="#eq:riccati_const">eq:riccati_const</a> in the literature. Here, we focus on only one method that consist in construct the augmented matrix
<Latex math="\begin{aligned}
	M=\left[
	\begin{matrix}
	F & -GR^{-1}G^T \\
	-Q & -F^T 
	\end{matrix}
	\right].
\end{aligned}"/>
<p></p>
This <Inline math="M"/> matrix has the property that there is no pure imaginary eigenvalue and if <Inline math="\lambda"/> is an eigenvalue  of <Inline math="M"/>, so is <Inline math="-\lambda"/>. We then construct a matrix <Inline math="T"/>
<Latex math="\begin{aligned}
T=\left[
\begin{matrix}
T_{11} & T_{12} \\
T_{21} & T_{22} 
\end{matrix}
\right]
\end{aligned}"/>
such that
<Latex math="\begin{aligned}
	T^{-1}MT=\left[
	\begin{matrix}
	-\Lambda & 0 \\
	0 & \Lambda 
	\end{matrix}
	\right]
\end{aligned}"/>
Thus, the solution is simply given by
<Latex math="\begin{aligned}
	P_\infty=T_{21}T_{11}^{-1}.
\end{aligned}"/>
<div class='proof'>
to check this solution, first notice that
<Latex math="\begin{aligned}
	MT=T\left[
	\begin{matrix}
	-\Lambda & 0 \\
	0 & \Lambda 
	\end{matrix}
	\right]
\end{aligned}"/>
This results in
<Latex math="\begin{aligned}
	FT_{11}-GR^{-1}G^T T_{21}&=-T_{11}\Lambda,\\
	-QT_{11}-F^T T_{21}&=-T_{21}\Lambda.
\end{aligned}"/>
<p></p>
Multiplying by <Inline math="T_{11}^{-1}"/> on the right side of both equations and by <Inline math="T_{21}T_{11}^{-1}"/> only in the first, we have
<Latex math="\begin{aligned}
	T_{21}T_{11}^{-1}F-T_{21}T_{11}^{-1}GR^{-1}G^T T_{21}T_{11}^{-1}=-T_{21}\Lambda T_{11}^{-1}
\end{aligned}"/>
and
<Latex math="\begin{aligned}
	-Q-F^T T_{21}T_{11}^{-1}=-T_{21}\Lambda T_{11}^{-1}
\end{aligned}"/>
Therefore,
<Latex math="\begin{aligned}
	(T_{21}T_{11}^{-1})F+F^{T}(T_{21}T_{11}^{-1})-(T_{21}T_{11}^{-1})GR^{-1}G^T (T_{21}T_{11}^{-1})+Q=0.
\end{aligned}"/>
</div>
<p></p>
<h3><Inline math="P(t)"/> based on <Inline math="P_\infty"/></h3>

As discussed in <a href="#cite.Anderson1971">Anderson1971</a>, if the steady-state solution is available in advance, we can establish a closed-form solution for the differential Riccati Equation for the entire horizon. In other words, we seek the expression <Inline math="P(t)"/> for 
<Latex math="\begin{aligned}
	-\dot{P}=PF+F^T P-PGR^{-1}G^T P +Q,
\end{aligned}"/>
a given <Inline math="P_\infty"/> such that
<Latex math="\begin{aligned}
	P_\infty F+F^T P_\infty-P_\infty GR^{-1}G^T P_\infty +Q=0.
\end{aligned}"/>
<p></p>
For this purpose, consider
<Latex math="\begin{aligned}
	P(t)=P_\infty+Z^{-1}(t),\quad  t\le 0
\end{aligned}"/>
where <Inline math="Z(t)"/> is the solution of, 
<Latex math="\begin{aligned}
\dot{Z}(t)=[A-GR^{-1}G^T P_\infty]Z(t)+Z(t)[A-GR^{-1}G^T P_\infty]^T-GR^{-1}G^T
\end{aligned}"/>
which is a <i>Differential Lyapunov Equation</i>. The solution for <Inline math="Z(t)"/> is
<Latex math="\begin{aligned}
	Z(t)=\bar{Z}+e^{-\tilde{A}t}[Z(0)-\bar{Z}]e^{-\tilde{A}^T t}
\end{aligned}"/>
where
<Latex math="\begin{aligned}
	\tilde{A}&=A-GR^{-1}G^T P_\infty\\
	0&=\tilde{A}\bar{Z}+\bar{Z}\tilde{A}-GR^{-1}G^T\\
	Z(0)&=[P(0)-P_\infty]^{-1}
\end{aligned}"/>
Thus, we can write the close-form solution for the Differential Riccati Equation as
<Latex math="\begin{aligned}
	P(t)=P_\infty+[\bar{Z}+e^{-\tilde{A}t}[Z(0)-\bar{Z}]e^{-\tilde{A}^T t}]^{-1},\quad t\le 0
\end{aligned}"/>
<p></p>
<p></p>
<h2>Analytical Solution of the Differential Lyapunov Equation</h2>

Consider the differential Lyapunov equation of the form
<Latex math="\begin{aligned}
\dot{X}(t)=A^T X(t)+X(t)A+Q,\quad X(0)=X_0
\end{aligned}" label="lyapunov_diff"/>
<div class='lemma'>
	The analytical closed-form solution for <a href="#lyapunov_diff">lyapunov_diff</a> is given by
<Latex math="\begin{aligned}
	X(t)=\bar{X}+e^{At}(X(0)-\bar{X})e^{A^T t}.
\end{aligned}" label="sol_lyapunov_diff"/>
	where <Inline math="\bar{X}"/> is a solution of
<Latex math="\begin{aligned}
	A\bar{X}+\bar{X}A^T -Q=0.
\end{aligned}" label="eq:algebraic_lyapunov_negative"/>
</div>
<div class='proof'>
	First, one can prove that if $A$ is Hurwitz then the algebraic equation <a href="#eq:algebraic_lyapunov_negative">eq:algebraic_lyapunov_negative</a> has unique solution. Thus, we can rewrite <a href="#lyapunov_diff">lyapunov_diff</a> as,
<Latex math="\begin{aligned}
	\frac{d}{dt}({X(t)-\bar{X}})=A(X(t)-\bar{X})+(X(t)-\bar{X})A^T
\end{aligned}"/>
	therefore, 
<Latex math="\begin{aligned}
	X(t)=\bar{X}+e^{At}(X(0)-\bar{X})e^{A^T t}.
\end{aligned}"/>
</div>
<div class='remark'>
	The solution of <a href="#eq:algebraic_lyapunov_negative">eq:algebraic_lyapunov_negative</a> can be obtained employing the Kronecker Product
<Latex math="\begin{aligned}
	vec(\bar{X})=\left[A\otimes A\right]^{-1}vec(Q).
\end{aligned}"/>
</div>
<h1 id="appendix">Appendix</h1>
 
<h2>Gramian</h2>

<Latex math="\begin{aligned}
    \dot{X}=AX+XA^T 
\end{aligned}"/>
has solution given by
<Latex math="\begin{aligned}
    X(t)=e^{At}X(0)e^{A^T t}
\end{aligned}"/>

</div>
<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
</article>
}
export default RiccatiEq;