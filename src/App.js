import React, { createContext, useReducer } from 'react'
import {Route, Switch} from 'react-router-dom'
import Nabvar from './components/nabvar'
import Login from './components/login'
import Signup from './components/signup'
import AddDetails from './components/addDetails'
import Home from './components/home'
import Logout from './components/logout'
import Error from './components/error'
import { initialState, reducer } from '../src/reducer/UseReducer'
export const userContext = createContext()

const Routing = () =>{

  return(
    <Switch>
  <Route exact path="/">
      <Home></Home>
    </Route>

    <Route exact path="/login">
      <Login></Login>
    </Route>

    <Route exact path="/signup">
    <Signup></Signup>
    </Route>

    <Route exact path="/addDetail">
     <AddDetails></AddDetails>
    </Route>

    <Route exact path="/logout">
     <Logout></Logout>
    </Route>

    <Route>
    <Error/>
  </Route>
  </Switch>
  )

}
const App = () => {

 

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    
    <>
    <userContext.Provider value={{state, dispatch}}>
      <Nabvar></Nabvar>
      <Routing></Routing>
    </userContext.Provider>
     
    </>
  )
}

export default App
