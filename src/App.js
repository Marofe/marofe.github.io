import React from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import HomePage from './Components/Pages/HomePage';
import Publications from './Components/Pages/Publications';
import Tutorials from './Components/Pages/Tutorials';
import Notes from './Components/Pages/Notes';
import Header from './Components/Header/Header';
import Navigation from './Components/Header/Navigation';
import Bottom from './Components/Bottom/Bottom';
function App() {
  //console.log(process.env.PUBLIC_URL);
  return (
    <Layout>
      <Header>
        <div className="divHeader"><h2>Marcos R. Fernandes</h2></div>
       <Navigation/>
      </Header>
      <Router basename={process.env.PUBLIC_URL}>      
      <Route path="/" exact component={HomePage}/>
      <Route path="/publications" component={Publications}/>
      <Route path="/tutorials" component={Tutorials}/>
      <Route path="/notes" component={Notes}/>
      </Router>
      <Bottom/>
    </Layout> 
  )
}

export default App;
