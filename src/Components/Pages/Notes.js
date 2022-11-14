import React, { Component } from 'react';
import './Notes.css';

import NoteList from './NotesList'
import NotePage from './NotePage'
import {Route} from 'react-router-dom';
class Notes extends Component {
    states = {
        notes: [
        {
            id:1,
            title:'Introduction to the Kalman Filter',
            desc:'Brief introduction to the famous Kalman Filter from a Bayesian pespective.',
            link: 'intro-kalman-filter',
            class: 'IntroKalmanFilter'
        },
        {
            id:0,
            title:'Extend Kalman Filter on Lie Groups',
            desc:'Here I provide the main equations for implementation of Extend Kalman Filter on Lie Groups.',
            link: 'ekf-lie-groups',
            class: 'EkfLie'
        },
        {
            id:5,
            title:'Analytical Solution of Riccati Equations',
            desc:'The Differential Riccati Equations are essential to solving many problems in optimal control and filtering. In this note, the analytical solution is discussed for both finite and infinite horizons.',
            link: 'riccati-equation',
            class: 'RiccatiEq'
        },
        {
            id:2,
            title:'Particle Filter and Monte Carlo Integration',
            desc:'Particle Filter perform Sequential Monte Carlo (SMC) Estimation based on point mass "particles" representation of probabilities densities. The basic SMC ideas in the form of Sequential Importance Sampling had been introduced in statistics back in the 1950s. In this note, an overview of this method is provided.',
            link: 'particle-filter',
            class: 'particleFilter'
        },
        {
            id:3,
            title:'LASSO Regression',
            desc:'This note is dedicated to summarize the main fundamentals of the lasso estimator. This method combines the usual least-square loss with a l1-constraint, or bound in the sum of the absolute values of the model parameters. Compared to the classical least-square, the lasso estimator has the effect of shrinking the regression coefficients or even setting some to zero. In this way, the lasso provides an automatic way to feature selection, and unlike another methods, the resulting optimization problem is convex, and can be solved efficiently for large problems. The lasso was proposed by Robert Tibshirani in 1996.',
            link: 'lasso',
            class: 'Lasso'
        },
        {
            id:4,
            title:'Bayesian Filtering',
            desc:'Bayesian Filtering methods are used to produce an accurate estimate of the state of a time-varying system based on multiple observational inputs (data). Interest in these methods has exploded in recent years, with numerous applications emerging in fields such as navigation, aerospace engineering, telecommunications, and medicine. The Bayesian approach to the estimation and filtering problem is far from new. It was pioneered by Stratonovich in the 1950s and 1960s - even before Kalman\'s seminal article in 1960.',
            link: 'bayesian-filtering',
            class: 'BayesianFiltering'
        }
    ]
    };
    routes=this.states.notes.map((note)=>{
        return <Route path={'/notes/'+note.link} render={(props) => <NotePage note={note}/>}/>
    });
    render(){
    return <div className="divPage">
     <Route path="/notes" exact render={(props) => <NoteList notes={this.states.notes}/>}/>
    {this.routes}
    </div>
    }
}
export default Notes;