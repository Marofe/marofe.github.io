import React from 'react';
import Helmet from 'react-helmet';
import '../../../Components/Pages/Tutorials.css';
import { BlockMath } from 'react-katex';
import Inline from '../../../Components/Latex/Inline';
import Latex from '../../../Components/Latex/latex';
import '../../../../node_modules/katex/dist/katex.css';
import Image from '../../../Components/Image/Image';
import Disqus from 'disqus-react';
const Lasso = (props) => {
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

Consider available a collection of <Inline math="N"/> predictor-response samples <Inline math="\{(x_i,y_i)\}_{i=1}^N"/> where each <Inline math="x_i=(x_{i1},x_{1,i2},\ldots,x_{ip})"/> is a p-dimensional vector of features or predictors, and <Inline math="y_i \in \mathbb{R}"/> is the associated response variable. In the linear regression setting, the goal is to approximate the response variable using a linear combination of the predictors
<Latex math="\begin{aligned}
	y_i=\beta_0+\sum_{j=1}^p x_{ij}\beta_j ,\quad i=1,\ldots,N
\end{aligned}"/>
where the main problem is to estimate the model parameters <Inline math="\beta=(\beta_0,\beta_1,\ldots,\beta_p)"/>. 
The usual "least-square" estimator is based on minimizing squared-error loss
<Latex math="\begin{aligned}
	\min_{\beta} \frac{1}{2N}\|y-X\beta\|_2^2
\end{aligned}"/>
where <Inline math="y=(y_1,y_2,\ldots,y_N)"/> and
<Latex math="\begin{aligned}
	X=\left[
	\begin{matrix}
	1 & x_{11} & x_{12} & \cdots & x_{1p}\\
	1 & x_{21} & x_{22} & \cdots & x_{2p}\\
	\vdots & \vdots & \vdots & \ddots & \vdots\\
	1 & x_{N1} & x_{N2} & \cdots & x_{Np}\\
	\end{matrix}
	\right]
\end{aligned}"/>
Typically, first a standardization of the predictors are made so that each column is centered (<Inline math="\frac{1}{N}\sum_i x_{ij}=0"/>) and has unit variance (<Inline math="\frac{1}{N}\sum_ix_{ij}^2=1"/>). Without standardization the solutions would depend on the units. A simple way to standardize is computing the mean <Inline math="\mu_x = \sum_i x_{ij}"/> and variance <Inline math="\sigma_x^2=\frac{1}{N-1}\sum_i (x_{ij}-\mu)^2"/> and replace each predictor by
<Latex math="\begin{aligned}
\tilde{x}_{ij}=\frac{x_{ij}-\mu_x}{\sigma_x}
\end{aligned}"/>
With the standardization the bias coefficient <Inline math="\beta_0"/> can be omitted.
It is usually convenient also to work with the outcome values <Inline math="y_i"/> centered (<Inline math="\frac{1}{N}\sum_i y_i=0"/>).
<p></p>
However, there are, at least, two reasons why we might consider alternatives to the usual "least-square". The first reason is <i>accuracy</i>. It is well-known that the LS estimator often has low bias but large variance. This can be improved by shrinking the values of the model parameters. Although, by doing so we introduce more bias but reduce the variance of the predicted values, and hence may improve the overall prediction accuracy assessed by the Mean Square Error (MSE).
<p></p>
The second reason is <i>interpretation</i>. It is much harder to interpret too many features, consequently, we often would like to identify a smaller subset of features that exhibit the strongest effects. 
<p></p>
The lasso provides an automatic way to simultaneously shrinking the coefficients and reduce the model complexity. In order to do so, a <Inline math="l_1"/>-constraint is added to the usual least-square problem
<Latex math="\begin{aligned}
\min_{\beta} &\frac{1}{2N}\|y-X\beta\|_2^2\\
\text{s.t. } &\|\beta\|_1 \le t
\end{aligned}" label="problem1"/>
The bound <Inline math="t"/> in the lasso criterion controls the complexity of the model. A value <Inline math="t"/> too small can prevent the lasso from capturing the main signal in the data, while too large a value can lead to overfitting.
<p></p>
The problem <a href="#problem1">problem1</a> can be rewritten in an equivalent form so-called <i>Lagrangian form</i>
<Latex math="\begin{aligned}
\min_{\beta} \frac{1}{2N}\|y-X\beta\|_2^2+\lambda \|\beta\|_1 
\end{aligned}" label="problem2"/>
It is possible to demonstrate that there exist one-to-one correspondence between <a href="#problem1">problem1</a> and <a href="#problem2">problem2</a>: for each <Inline math="t"/> chosen as bound <Inline math="\|\beta\|_1\le t"/> in <a href="#problem1">problem1</a> there exist a corresponding value <Inline math="\lambda"/> for <a href="#problem2">problem2</a> that yields the same solution. Conversely, for an fixed <Inline math="\lambda"/>, the solution <Inline math="\hat{\beta}_\lambda"/> of the Lagrangian form solves the problem <a href="#problem1">problem1</a> with <Inline math="t=\|\hat{\beta}_\lambda\|_1"/>. 
<div class='remark'>
	Note that in many descriptions of the lasso, the term $1/2N$ is often replaced by $1/2$ or $1$. This makes no difference for <a href="#problem1">problem1</a> or just mean a different value of $\lambda$ at <a href="#problem2">problem2</a>; However, this kind of standardization makes $\lambda$ values comparable for different sample sizes (useful for cross-validation).
</div>
<h2>Lasso Solution</h2>

The theory of convex analysis tell us that the sufficient and necessary conditions for a solution to problem <a href="#problem2">problem2</a> take the form
<Latex math="\begin{aligned}
	-\frac{1}{N}X^T(y-X\beta)+\lambda s=0
\end{aligned}" label="subgradient_eq"/>
where <Inline math="s=(s_1,s_2,\ldots,s_p)"/> represents the subgradient for the absolute function (<Inline math="s_i=sign(\beta_i)"/> if <Inline math="\beta_i\neq 0"/> or <Inline math="s_i \in [-1,1]"/> otherwise). In other words, the solutions <Inline math="\hat{\beta}"/> to problem <a href="#problem2">problem2</a> are the same as <Inline math="(\hat{\beta},\hat{s})"/> to <a href="#subgradient_eq">subgradient_eq</a>. Expressing a problem in subgradient form can be useful for designing algorithms for finding its solutions.
<p></p>
However, the Lagrangian Form is specially convenient for numerical computation by a simple procedure known as <i>coordinate descent</i>.
<h3>Scalar case: single predictor</h3>

Consider the following lasso problem
<Latex math="\begin{aligned}
\min_{\beta} \frac{1}{2N}\sum_{i=1}^N(y_i-x_i\beta)^2+\lambda |\beta| 
\end{aligned}" label="problem_scalar"/>
where <Inline math="\beta \in \mathbb{R}"/> . The optimal solutions is given by
<Latex math="\begin{aligned}
\beta^* = \left\{
\begin{matrix}
(x^T x)^{-1}(x^T y-\lambda N), & \text{ if } \frac{1}{N}x^T y > \lambda \\
0, & \text{ if } |\frac{1}{N}x^T y| \le \lambda \\
(x^T x)^{-1}(x^T y+\lambda N), & \text{ if } \frac{1}{N}x^T y < -\lambda \\
\end{matrix}
\right.
\end{aligned}"/>
with <Inline math="x=(x_1,x_2,\ldots,x_N)"/>. 
<div class='proof'>
	From <a href="#problem_scalar">problem_scalar</a>, one have
<Latex math="\begin{aligned}
	J&= \frac{1}{2N}\sum_i (y_i^2-2y_ix_i\beta+\beta^2x_i^2)+\lambda|\beta|\\
	&=\frac{1}{2N}y^T y - \frac{1}{N}x^T y \beta + \frac{1}{2N}x^T x\beta^2 +\lambda|\beta|
\end{aligned}"/>
	By taking the sub-gradient
<Latex math="\begin{aligned}
	\partial J =  - \frac{1}{N}x^T y + \frac{1}{N}x^T x\beta +\lambda\mathcal{D}(\beta).
\end{aligned}"/>
If <Inline math="\beta^* >0"/> then <Inline math="\beta^*=(x^T x)^{-1}(x^T y-\lambda N)"/>. On the other hand, if <Inline math="\beta^*<0"/> then <Inline math="\beta^*=(x^T x)^{-1}(x^T y+\lambda N)"/>. Note that <Inline math="\beta^*=0"/> implies <Inline math="\frac{1}{N}x^T y +\lambda\mathcal{D}(0)=0"/>, thus because <Inline math="\mathcal{D}(0)=[-1,1]"/>, one conclude that
 <Inline math="\beta^*=0\Leftrightarrow|\frac{1}{N}x^T y|\le \lambda  "/>.  
</div>
<p></p>
For the case when the estimator is standardized (<Inline math="\frac{1}{N}\sum_i x_i = 0"/> and <Inline math="\frac{1}{N}\sum_i x_i^2=1"/>), the optimal solution simplifies to
<Latex math="\begin{aligned}
\beta^* = \left\{
\begin{matrix}
\frac{1}{N}x^T y-\lambda, & \text{ if } \frac{1}{N}x^T y > \lambda \\
0, & \text{ if } |\frac{1}{N}x^T y| \le \lambda \\
\frac{1}{N}x^T y+\lambda, & \text{ if } \frac{1}{N}x^T y < -\lambda \\
\end{matrix}
\right.
\end{aligned}"/>
<p></p>
The solution also can be rewritten in short-form as 
<Latex math="\begin{aligned}
\beta^* = \mathcal{S}_\lambda \left(\frac{1}{N}x^T y\right)
\end{aligned}"/>
where <Inline math="\mathcal{S}_\lambda"/> is the <i>soft-threshoulding operator</i> 
<Inline math="\mathcal{S}_\lambda(x)=sign(x)(|x|-\lambda)_+"/> that translate the argument <Inline math="x"/> toward zeros by the amount <Inline math="\lambda"/> and sets it to zero if <Inline math="|x|\le \lambda"/> and <Inline math="(t)_+=\max(0,t)"/> denotes the positive part of <Inline math="t"/> (equal to <Inline math="t"/> if <Inline math="t>0"/> or zero otherwise). 
<p></p>
For the case when the estimator is not standardized, the short-form becomes
<Latex math="\begin{aligned}
\beta^* = (x^T x)^{-1}\mathcal{S}_{\lambda N} \left(x^T y\right).
\end{aligned}"/>
<h3>Multivariate case: multiple predictors</h3>

To solve the full lasso problem, we can develop a simple coordinate-wise scheme where we repeatedly cycle through the predictor in some fixed (but arbitrary) order where at the <Inline math="j^{th}"/> step, we update the coefficient <Inline math="\beta_j"/> while holding fixed all other coefficients (<Inline math="\beta_k,k\neq j"/>).
<p></p>
Writing the objective function as
<Latex math="\begin{aligned}
	\frac{1}{2N}\sum_{i=1}^N\left(y_i-\sum_{k\neq j} x_{ik}\beta_k-x_{ij}\beta_j\right)^2+\lambda \sum_{k\neq j} |\beta_k| + \lambda |\beta_j|
\end{aligned}"/>
we see that the solution for each <Inline math="\beta_j"/> can be expressed succinctly in terms of the <i>partial residual</i>
<Latex math="\begin{aligned}
	r_i^{(j)}=y_i-\sum_{k\neq j} x_{ik}\hat{\beta}_k.
\end{aligned}"/>
The objective function, thus, can be rewritten as
<Latex math="\begin{aligned}
   J= \frac{1}{2N}\sum_{i=1}^N\left(r_i^{(j)}-x_{ij}\beta_j\right)^2+\lambda \sum_{k\neq j} |\beta_k| + \lambda |\beta_j|\\=\frac{1}{2N}\sum_{i=1}^N\left((r_i^{(j)})^2-2r_i^{(j)}x_{ij}\beta_j+x_{ij}^2\beta_j^2\right)+\lambda \sum_{k\neq j} |\beta_k| + \lambda |\beta_j|\\
   =\frac{1}{2N}\left((r^{(j)})^T r^{(j)}- 2x_j^T r^{(j)}\beta_j+x_j^T x_j\beta_j^2\right)+\lambda \sum_{k\neq j} |\beta_k| + \lambda |\beta_j|
\end{aligned}"/>
where <Inline math="x_j=(x_{1j},x_{2j},\ldots,x_{Nj})"/> and <Inline math="r^{(j)}=(r_1^{(j)},r_2^{(j)},\ldots,r_N^{(j)})"/>.
The sub-gradient w.r.t. the <Inline math="j"/>-th component is
<Latex math="\begin{aligned}
    \partial_{\beta_j}J =-\frac{1}{N}x_j^T r^{(j)}+\frac{1}{N}x_j^T x_j\beta_j+\lambda \mathcal{D}(\beta_j)
\end{aligned}"/>
Therefore, in terms of partial residual, the <Inline math="j^{th}"/> coefficient is updated as
<Latex math="\begin{aligned}
	\hat{\beta}_j=(x_j^T x_j)^{-1}\mathcal{S}_{\lambda N}\left(x_j^T r^{(j)}\right).
\end{aligned}"/>
Or equivalently, in terms of the <i>full residual</i> <Inline math="r=y-X\hat{\beta}=r^{(j)}-x_{j}\hat{\beta}_j"/>, one has
<Latex math="\begin{aligned}
\hat{\beta}_j=(x_j^T x_j)^{-1}\mathcal{S}_{\lambda N}\left(x_j^T(r+x_{j}\hat{\beta}_j)\right)=(x_j^T x_j)^{-1}\mathcal{S}_{\lambda N}\left(x_j^T x_j\hat{\beta}_j+x_j^T r\right).
\end{aligned}"/>
<p></p>
The algorithm just described corresponds to the method of <i>cyclical coordinate descent</i>, which minimizes this convex objective along each coordinate at a time. 
<p></p>
It is important to note that some conditions are required because there are instances, involving non-separable penalty functions, in which coordinate descent schemes can become "jammed".
Besides, in practice, one is often interested in finding the lasso solution not just for a single fixed value of <Inline math="\lambda"/>, but rather the entire path of solutions over a range of possible <Inline math="\lambda"/> values.
<p></p>
A reasonable method for doing so is to begin with a value of <Inline math="\lambda"/> just large enough so that the only optimal solution is the all-zeros vector. This value is equal to <Inline math="\lambda_{max} = \max_j |\frac{1}{N}x_j^T y|"/>. Then we decrease <Inline math="\lambda"/> by a small amount and run coordinate descent until convergence. Decreasing <Inline math="\lambda"/> again and using the previous solution as a "warm start", we then run coordinate descent until convergence. In this way we can efficiently compute the solutions over a grid of <Inline math="\lambda"/> values. We refer to this method as <i>pathwise coordinate descent</i>.
<div class='remark'>
	Coordinate descent is especially fast for the lasso because the coordinatewise minimizers are explicitly available. Secondly, it exploits the sparsity of the problem for large enough values of $\lambda$ most coefficients will be zero and will not be moved from zero. Another more efficient method is the <i>Least Angle Regression</i> (LARS) algorithm which is a homotopy method that constructs the piecewise linear path.
</div>
<h3>Special Case: orthogonal predictors</h3>

The coordinate minimization scheme takes an especially simple form if the predictors are orthogonal, meaning that
<Latex math="\begin{aligned}
	\frac{1}{N}x_j^T x_k = 0,\quad \text{for each } j\neq k.
\end{aligned}"/>
In this case, the update rule simplifies
<Latex math="\begin{aligned}
	\frac{1}{N}x_j^T r^{(j)} = \frac{1}{N}x_j^T y
\end{aligned}"/>
Thus, in the special case of an orthogonal design, the lasso has an explicit closed-form solution, and no iterations are required.
<p></p>
Interesting connection is the <i>wavelet filtering</i>. Since wavelet bases are orthogonal, wavelet filtering correspond to this special case of lasso.
<h2>Lasso vs Minimax</h2>

Consider the robust regression problem
<Latex math="\begin{aligned}
	\min_{\beta} \max_{\delta X \in \mathcal{U}} \|y-(X+\delta X)\beta\|_2
\end{aligned}" label="robust_minimax"/>
where the uncertainty set <Inline math="\mathcal{U}"/> are defined by
<Latex math="\begin{aligned}
	\mathcal{U}=\{(\delta_1,\delta_2,\ldots,\delta_m)| \|\delta_i\|_2\le c_i, i=1,2,\ldots,m,\delta_i \in \mathbb{R}^n\}
\end{aligned}"/>
<div class='theorem'>
	The solution for <a href="#robust_minimax">robust_minimax</a> is equivalent to
<Latex math="\begin{aligned}
		\min_{\beta} \|y-X\beta\|_2+\sum_{i=1}^m c_i|\beta_i|
\end{aligned}"/>
</div>
<div class='proof'>
	Assume that $\beta$ is given. Notice that
<Latex math="\begin{aligned}
		\|y-(X+\delta X)\beta\|_2&=\|y-(X+(\delta_1,\delta_2,\ldots,\delta_m))\beta\|_2\\
		&=\|y-X\beta-\sum_{i=1}^m \delta_i \beta_i\|_2\\
		&\le \|y-X\beta\|_2-\|\sum_{i=1}^m \delta_i \beta_i\|_2\\
		&\le\|y-X\beta\|_2-\sum_{i=1}^m c_i |\beta_i|\\
\end{aligned}"/>
<p></p>
	Note that the maximum <Inline math="\delta X^*=(\delta_1^*,\delta_2^*,\ldots,\delta_m^*)=(c_1,c_2,\ldots,c_m)"/>.
	Now, consider a particular structure to the uncertainty <Inline math="\delta_i"/> given by
<Latex math="\begin{aligned}
	\delta_i&=\left\{
	\begin{matrix}
	-c_iusign(\beta_i), & \text{ if }\beta_i \neq 0,\\
	-c_iu,& \text{ if } \beta_i=0.
	\end{matrix}
	\right.\\
	\text{where}\\
	u&=\left\{
	\begin{matrix}
	\frac{y-X\beta}{\|y-X\beta\|_2}, & \text{ if } y\neq X\beta,\\
	\text{any unitary vector} & \mbox{ otherwise.}
	\end{matrix}
	\right.
\end{aligned}"/>
	 Consequently, one have
<Latex math="\begin{aligned}
		\max_{\delta X \in \mathcal{U}} \|y-(X+\delta X)\beta\|_2&\ge\|y-(X+\delta X^*)\beta\|_2\\
		&=\|y-X\beta+\sum_{\beta_i\neq 0} c_iusign(\beta_i)\beta_i\|_2\\
		&=\|y-X\beta+\left(\sum_{i} c_i|\beta_i|\right)u\|_2
\end{aligned}"/>
</div>
<h2>Bayesian Interpretation</h2>

Recall that the ridge regression estimator can be viewed as a Bayesian estimate of <Inline math="\beta"/> when imposing a Gaussian prior. Similarly, the lasso regression estimator can be viewed as a Bayesian estimate when imposing a Laplacian (or double exponential) prior for each parameter
<Latex math="\begin{aligned}
	p(\beta_j)=\frac{1}{2}\lambda \exp (-\lambda |\beta_j|)
\end{aligned}"/>
with joint density
<Latex math="\begin{aligned}
	p(\beta)=p(\beta_1)\cdots p(\beta_p)=\frac{1}{2\tau}\exp\left(-\frac{\|\beta\|_1}{\tau}\right), \quad \text{ with } \tau = \frac{1}{\lambda}
\end{aligned}"/>
Moreover, the lasso prior puts more mass close to zero and in the tails than the ridge prior. hence, the tendency of the lasso to produce either zero or large estimates as depicted in Figure <a href="#fig:gaussian_laplacian">fig:gaussian_laplacian</a> 
<Image src="/images/gaussian_laplacian.svg" label="fig:gaussian_laplacian" legend="Comparison between the Gaussian and Laplacian Distribution." width="50%"/>
<p></p>
The LASSO estimate then corresponds to the mode of the posterior distribution given by the Bayes' Rule
<Latex math="\begin{aligned}
	p(\beta|Y)=\frac{p(Y|\beta)p(\beta)}{p(Y)}
\end{aligned}"/>
or in other words, the MAP estimator
<Latex math="\begin{aligned}
	\beta = \arg \min_\beta -\log p(\beta|Y).
\end{aligned}"/>
<div class='remark'>
	The "true Bayesian" also puts a prior on the penalty parameter, giving rise to Bayesian LASSO regression. In addition, for high-dimensions, the Bayesian posterior need not concentrate on the "true" parameter. Even though, its mode is a good estimator of the regression parameter. 
</div>
<h2>Moments of the LASSO</h2>

In contrast to ridge regression, there are no explicit expressions for the bias and variance of the lasso estimator, only approximations. However, as with the ridge estimator, the <i>trade-off</i> between bias and variance still holds, e.g., the bias of the lasso estimator increases and the variance decreases in proportion to the lasso penalty parameter.
<p></p>
In order to assess the moments of the LASSO, first, consider the following approximation
<Latex math="\begin{aligned}
\|Y-X\beta\|_2^2+\lambda\|\beta\|_1 \approx \|Y-X\beta\|_2^2+\frac{\lambda}{2}\sum_{j=1}^m\frac{1}{|\hat{\beta}(\lambda)|}\beta_j^2
\end{aligned}"/>
Optimization of this approximation gives a "ridge approximation" to the lasso
<Latex math="\begin{aligned}
	\hat{\beta}(\lambda)\approx [X^T X+\lambda \Psi(\hat{\beta}(\lambda))]^{-1}X^T Y
\end{aligned}"/>
where <Inline math="\Psi"/> is a diagonal matrix with <Inline math="\Psi_{jj}=1/|\hat{\beta}_j(\lambda)|"/> if <Inline math="\hat{\beta}_j(\lambda)\neq 0"/> and zero otherwise.
<p></p>
Analogous to moment derivation of the ridge estimator, one obtains
<Latex math="\begin{aligned}
	\mathbb{E}\{\hat{\beta}(\lambda)\}\approx [X^T X+\lambda \Psi(\hat{\beta}(\lambda))]^{-1}X^T X\beta 
\end{aligned}"/>
and
<Latex math="\begin{aligned}
var\{\hat{\beta}(\lambda)\}\approx \sigma^2[X^T X+\lambda \Psi(\hat{\beta}(\lambda))]^{-1}X^T X[X^T X+\lambda \Psi(\hat{\beta}(\lambda))]^{-1}
\end{aligned}"/>
<h2>Variations of LASSO</h2>

<h3>Ordinary Lasso</h3>

<p></p>
<Latex math="\begin{aligned}
\|y-X\beta\|_2^2 + \lambda \|\beta\|_1
\end{aligned}"/>
<p></p>
<h3>Elastic Net</h3>

<Latex math="\begin{aligned}
\|y-X\beta\|_2^2 + \lambda (\alpha\|\beta\|_2^2+(1-\alpha)\|\beta\|_1)
\end{aligned}"/>
<h3>Fused Lasso</h3>

<Latex math="\begin{aligned}
\|y-X\beta\|_2^2 + \lambda_1 \|\beta\|_1+\lambda_2 \sum_{j=2}^p |\beta_j-\beta_{j-1}|
\end{aligned}"/>
<h2>LASSO vs EVIU</h2>

LASSO Cost
<Latex math="\begin{aligned}
	\|y-X\beta\|_2^2 + \lambda \|\beta\|_1
\end{aligned}"/>
<p></p>
EVIU Cost
<Latex math="\begin{aligned}
	\|\beta_0-\beta\|_G^2+\|y-X\beta\|_W^2 + d^T |\beta|
\end{aligned}"/>
Notice that the EVIU cost is equivalent to LASSO if <Inline math="G=0"/>, <Inline math="W=I"/> and <Inline math="d=\lambda[1,\ldots,1]^T"/>.

</div>
<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
</article>
}
export default Lasso;