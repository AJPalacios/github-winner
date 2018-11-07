import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from './components/Home'
import Stats from './components/Stats'

const Routes = ()=>{
  return(
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/stats' component={Stats}/>
    </Switch>
  );
}

export default Routes