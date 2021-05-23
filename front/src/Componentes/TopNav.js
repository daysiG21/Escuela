import React,{Fragment, useState,useContext}  from 'react'
import {Link,useHistory} from 'react-router-dom'
import {CarritoContext} from '../context/carritoContext'
import NavAdmin from "./NavAdmin"
import NavCliente from "./NavCliente"
import {AuthFireContext} from "../context/authFireContext"
//import {UsuarioContext} from '../context/usuarioContext'
import {logoutFire} from "../Services/authFireServices"
import Swal from "sweetalert2"

export default function TopNav(){
  let history = useHistory()
  const {carrito} = useContext(CarritoContext) 

  const [estaColapsado, setEstaColapsado] = useState(true);
  const manejarColapso = () => setEstaColapsado(!estaColapsado);

  const {userId, setAuthUserId} = useContext(AuthFireContext)
  //const {userId, setAuthUserId} = useContext(UsuarioContext)

  /*
  const [value, setValue] = useState({
    nombre:"",
    apellido:"",
    email:"",
    password:""
  })

  const actualizarInput = (e)=>{
    setValue({
      ...value,[e.target.name]:e.target.value
    })
  }
*/
  /*
  const registrarUsuario = (e)=>{    
   registroFire(value)
   .then((rpta) =>{
     console.log(rpta)    
    } 
   )  
   .catch(error => console.log(error))
  */

   
    
   const salir = () => {
    Swal.fire({
      icon:"danger",
      title:"¿Desea Salir del Sistema?",
      showConfirmButton:true,
      confirmButtonText:'Si',
      showCancelButton:true,
      cancelButtonText:'No'
    })
    .then((result)=>{
      if(result.isDismissed === true){
        return
      }
      setAuthUserId(null)
        Swal.fire({          
          icon:'success',
          title:"Salio del Sistema",
          showConfirmButton:false,
          timer:2000
        })
      /*
      logoutFire()
      .then(() => {
        setAuthUserId(null)
        Swal.fire({          
          icon:'success',
          title:"Salio del Sistema",
          showConfirmButton:false,
          timer:2000
        })
        .then(()=>{
          history.push('/')
        })
      })
      */
    })
  }
  return (
    <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid"> 
          <Link className="navbar-brand mb-0 h1" to='/'>
           Escuela Libre
          </Link>     
           
            <button className="navbar-toggler" type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false"           
            aria-label="Toggle navigation">

              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {userId !== null ? (<NavAdmin salir={salir} />) : <NavCliente/>}
            </div>
          </div>    
        </nav>
        {/* Login  
        <div className="modal fade" id="exampleModal1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Acceso al sistema</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>              
                <div className="mb-3">
                  <label className="col-form-label">Correo</label>
                  <input type="text" className="form-control" name="email" required
                  value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Contraseña:</label>
                  <input type="Password" className="form-control" name="password" required
                  value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary"  onClick={(e)=>{ingresar(e)}}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
     */}
        {/**
         <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Registrar Usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
              <div className="mb-3">
                  <label className="col-form-label">Nombre</label>
                  <input type="text" className="form-control" name="nombre" value={value.nombre} onChange={(e)=>{actualizarInput(e)}} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Apellido</label>
                  <input type="text" className="form-control" name="apellido" value={value.apellido} onChange={(e)=>{actualizarInput(e)}} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Correo</label>
                  <input type="text" className="form-control" name="email" value={value.email} onChange={(e)=>{actualizarInput(e)}} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Contraseña:</label>
                  <input type="Password" className="form-control" name="password" value={value.password} onChange={(e)=>{actualizarInput(e)}} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={(e)=>{registrarUsuario(e)}}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
         */}

       
      </Fragment>
  )
}