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
         <img alt="perfil" class="homepage_myfoto" src="images/new_profile.jpg"/>
         <div class="textName">
        <h1>Dr. Marcos Rogério Fernandes</h1>
        <p>
        I am a control engineer, programmer and researcher. I work on ideas and tools related to electrical engineering, automation and computer science. I hold a Ph.D. from the School of Electrical and Computer Engineering of the State University of Campinas in Brazil (FEEC/Unicamp).
        </p></div>
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
<a href="https://scholar.google.com/citations?user=LEF5gHMAAAAJ" target="_blank" class="fa fa-googlescholar"></a>
<a href="http://lattes.cnpq.br/8922874435141893" target="_blank" class="fa fa-lattes"></a>
<br/>
<a href="https://twitter.com/_marofe" target="_blank" class="fa fa-twitter"></a>
<a href="https://www.linkedin.com/in/marcos-rogerio-fernandes/" target="_blank" class="fa fa-linkedin"></a>
<a href="https://www.researchgate.net/profile/Marcos_Fernandes10" target="_blank" class="fa fa-researchgate"></a>
<a href="https://github.com/Marofe" target="_blank" class="fa fa-github"></a>

</div>
</article>
    </div>
}
export default HomePage;