import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Site Page
import Home from './views/site/Home'
import ProjectSingle from './views/site/ProjectSingle'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/project/:id">
          <ProjectSingle/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="*">
          <h1>Not Found</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
