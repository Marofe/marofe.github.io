import React from 'react';
import Helmet from 'react-helmet';
import './HomePage.css';
const HomePage = () => {
    return <div className="divPage">
        <Helmet>
        <title>Marcos Rogério Fernandes | Personal Website</title>
        <meta name="description" content="Welcome to my personal website. Here you will find my reserach interest and contributions. " />
    </Helmet>
<div className="homepage_top">
         <img alt="perfil" class="homepage_myfoto" src="https://avatars1.githubusercontent.com/u/4412144?s=460&v=4"/>
        <h1>Marcos Rogério Fernandes</h1>
        <p>
        I'm a Control Engineer, programmer and a researcher.
I work on ideas and tools related to Electrical Engineer, Automation and Computer Science.
I'm a PhD Candidate at School of Electrical and Computer Engineering from Unicamp (FEEC/Unicamp). 
        </p>
</div>
<article>
        <h2>My Research Interest:</h2>
<ul>
    <li>Statistic Learning</li>
    <li>Kalman Filtering</li>
    <li>Navigation & Tracking Systems</li>
    <li>Sensor Fusion Algorithms</li>
    <li>GNSS Processing Methods</li>
    <li>Optimal and Robust Stochastic Control Systems</li>
    <li>Mobile Robotics</li>
    <li>Computer Vision</li>

</ul>
<div className="social_media">
{/*<a href="https://www.facebook.com/eng.marofe" class="fa fa-facebook"></a>*/}
<a href="https://twitter.com/_marofe" class="fa fa-twitter"></a>
<a href="https://www.instagram.com/_marofe" class="fa fa-instagram"></a>
<a href="https://www.linkedin.com/in/marcos-rogerio-fernandes/" class="fa fa-linkedin"></a>
<a href="https://www.researchgate.net/profile/Marcos_Fernandes10" class="fa fa-researchgate"></a>
<a href="https://github.com/Marofe" class="fa fa-github"></a>
<a href="mailto:eng.marofe@hotmail.com" class="fa fa-envelope"></a> 
</div>
</article>
    </div>
}
export default HomePage;