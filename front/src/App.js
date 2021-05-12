import React from 'react'
import {Switch, BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes'
import CarritoContextProvider from './context/carritoContext'
import TopNav from "./Componentes/TopNav"
import './App.css'
import AuthContextProvider from './context/authFireContext'

export default function App(){
  return (
    <Router> 
      <AuthContextProvider>
        <CarritoContextProvider>
          <TopNav/>
          <div className="container">
            <Switch>
              <Routes/>
            </Switch>
          </div>  
        </CarritoContextProvider> 
      </AuthContextProvider>       
    </Router>
  )
}