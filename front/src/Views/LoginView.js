import React, {useState, useContext} from 'react'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
//import {loginFire} from "../Services/authFireServices"
import {loginUsuario} from "../Services/UsuarioServices"
import {AuthFireContext} from '../context/authFireContext'
//import {UsuarioContext} from '../context/usuarioContext'

export default function LoginView() {
  const [value, setValue] = useState({   
    email:"",
    password:""
  })

  const {userId, setAuthUserId} = useContext(AuthFireContext) 
  
  let history = useHistory()

  const actualizarInput = (e)=>{
    setValue({
      ...value,[e.target.name]:e.target.value
    })
  }

  const ingresar = (e)=>{
    e.preventDefault()
    //console.log(value);
    //loginFire(value)
    loginUsuario(value)
    .then(rpta=>{  
      //console.log(rpta.auth_token);    
      if(rpta.auth_token.length>0){        
     
      //setAuthUserId(rpta.user.uid)
      setAuthUserId(rpta.auth_token)
      localStorage.setItem('user', JSON.stringify(rpta.auth_token))
      Swal.fire({
        icon:'success',
        title:'Ingresando al sistema',
        timer:1000,
        showConfirmButton:false
      })
      .then(()=>{        
        history.push('/')
      })
      }     
      
    })
    .catch(error=>{
      //console.log("algo paso");
      Swal.fire({
        icon:'error',
        title:'Usuario y/o contraseña incorrecta'      
        
      })
      
    })
   }

  return (
   <div>
      <h3 className="mt-3">Ingreso al Sistema</h3>
      <form onSubmit={(e) => {ingresar(e)}}>
        <div>
          <label className="form-label">Correo</label>
          <input 
            className="form-control" 
            type="email" 
            placeholder="micorreo@correo.com" name="email"
            value={value.email}
            onChange={(e)=>{actualizarInput(e)}} required
          />
        </div>
        <div>
          <label className="form-label">Contraseña</label>
          <input 
            className="form-control" 
            type="password" 
            placeholder="Ingrese una contraseña segura" name="password"
            value={value.password}
            onChange={(e)=>{actualizarInput(e)}} required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Ingresar
        </button>
      </form>
    </div>
  )
}