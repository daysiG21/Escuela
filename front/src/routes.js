import React,{Fragment, useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import CursosView from './Views/CursosView'
import EditarCursoView from './Views/EditarCursoView'
import CrearcursoView from './Views/CrearCursoView'
import HomeView from './Views/HomeView'
import DetalleView from './Views/DetalleView'
import CarritoView from './Views/CarritoView'
import PostulanteView from './Views/CrearPostulanteView'
import LoginView from './Views/LoginView'
import { AuthFireContext } from "./context/authFireContext";
//import {UsuarioContext} from './context/usuarioContext'
import HomeViewF from './Views/HomeViewF'

export default function Routes(){
  const { userId } = useContext(AuthFireContext);
  //const { userId } = useContext(UsuarioContext);
  return (
    <Fragment>
      <Route path="/" exact component={HomeView} />
      <Route path="/cursos" exact component={CursosView} />
      <Route path="/editarCurso/:id" exact component={EditarCursoView} />
      <Route path="/crearCurso" exact component={CrearcursoView} />
      <Route path="/detalle/:id" exact component={DetalleView}></Route>
      <Route path="/carrito" exact component={CarritoView} />
      <Route path="/ensena" exact component={PostulanteView}/>
      <Route path="/login" exact component={LoginView} />
      <Route path="/categoria/:id" exact component={HomeViewF} />      
    </Fragment>
  )
}