import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Admin Page
import AdminHome from './views/admin/Home'
import AdminLogin from './views/admin/Login'
import AdminBrowse from './views/admin/Browse'
import AdminRead from './views/admin/Read'
import AdminEdit from './views/admin/Edit'
import AdminAdd from './views/admin/Add'

// Site Page
import Home from './views/site/Home'
import ProjectSingle from './views/site/ProjectSingle'

function App() {
  return (
    <Router>
      <Switch>
        {/* User */}
        <Route exact path="/admin/user/read">
          <AdminRead/>
        </Route>
        {/* Skill */}
        <Route exact path="/admin/skills">
          <AdminBrowse/>
        </Route>
        <Route exact path="/admin/skill/edit/:id">
          <AdminEdit/>
        </Route>
        {/* post */}
        <Route exact path="/admin/posts">
          <AdminBrowse/>
        </Route>
        <Route exact path="/admin/post/read/:id">
          <AdminRead/>
        </Route>
        <Route exact path="/admin/post/add">
          <AdminAdd/>
        </Route>
        <Route exact path="/admin/post/edit/:id">
          <AdminEdit/>
        </Route>
        {/* post category */}
        <Route exact path="/admin/postcategories">
          <AdminBrowse/>
        </Route>
        <Route exact path="/admin/catpost/add">
          <AdminAdd/>
        </Route>
        <Route exact path="/admin/catpost/edit/:id">
          <AdminEdit/>
        </Route>
        {/* project */}
        <Route exact path="/admin/projects">
          <AdminBrowse/>
        </Route>
        <Route exact path="/admin/project/read/:id">
          <AdminRead/>
        </Route>
        <Route exact path="/admin/project/add">
          <AdminAdd/>
        </Route>
        <Route exact path="/admin/project/edit/:id">
          <AdminEdit/>
        </Route>
        {/* project category */}
        <Route exact path="/admin/projectcategories">
          <AdminBrowse/>
        </Route>
        <Route exact path="/admin/catproject/add">
          <AdminAdd/>
        </Route>
        <Route exact path="/admin/catproject/edit/:id">
          <AdminEdit/>
        </Route>
        {/* login and home */}
        <Route exact path="/admin/login">
          <AdminLogin/>
        </Route>
        <Route exact path="/admin">
          <AdminHome/>
        </Route>
        {/* Site */}
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
