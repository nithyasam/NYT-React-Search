import React from 'react';
import { Route, 
         Router,
         hashHistory,
         IndexRoute,
         
       } from 'react-router';
import Main from "../components/Main";
import Saved from "../components/Saved";
import Search from "../components/Search";

module.exports = (

  <Router history={hashHistory}>

    <Route path="/" component={Main}>
      <Route path="Search" component={Search} />
      <Route path="Saved" component={Saved} />
      <IndexRoute component={Search} />
    </Route>
  </Router>
);
