import React, {useState, useContext} from 'react'
import {loginFire} from "../Services/authFireServices"
import {AuthFireContext} from '../context/authFireContext'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'

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
    loginFire(value)
    .then(rpta=>{
      setAuthUserId(rpta.user.uid)
      Swal.fire({
        icon:'success',
        title:'Ingresando al sistema',
        timer:1000,
        showConfirmButton:false
      })
      .then(()=>{        
        history.push('/')
      })
    })
    .catch(error=>{
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