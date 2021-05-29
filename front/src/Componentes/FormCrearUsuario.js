import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'
import {registrarUsuario} from '../Services/UsuarioServices'

export default function FormCrearUsuario(){
  let history = useHistory()


  const [value, setValue] = useState({
    email:"",
    password:"",
    first_name:"",
    last_name:"",
    tipo:1
  })

  const actualizarInput = (e)=>{
    setValue({
      ...value,[e.target.name]:e.target.value
    })
  }

 const manejarSubmit = async(e)=>{
   e.preventDefault()
  
   let response = await registrarUsuario(value)
   
   Swal.fire({
    icon: "success",
    title: "Datos registrados",
    text:"Gracias por registrarte"
   
  }).then(()=>{
    history.push('/')
  })

 }


  return(
    <div>
      <form className="row" onSubmit={(e)=>{manejarSubmit(e)}}>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label">Nombres</label>
          <input type="text" name="first_name" placeholder="Ingrese su nombre" 
          className="form-control" value={value.first_name} onChange={(e)=>{actualizarInput(e)}} required/>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label">Apellidos</label>
          <input type="text" name="last_name" placeholder="Ingrese su apellido" 
          className="form-control" value={value.last_name} onChange={(e)=>{actualizarInput(e)}} required/>
        </div> 
        <div>
          <label className="form-label">Correo</label>
          <input type="email" name="email" placeholder="micorreo@abc.com"
           className="form-control" value={value.email} onChange={(e)=>actualizarInput(e)} required />
        </div>
        <div>
          <label className="form-label">Contraseña</label>
          <input 
            className="form-control" 
            type="password" 
            placeholder="Ingrese una contraseña" name="password"
            value={value.password}
            onChange={(e)=>{actualizarInput(e)}} required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary mt-3" type="submit">Registrar</button>          
        </div>
        
      </form>
    </div>
  )
}