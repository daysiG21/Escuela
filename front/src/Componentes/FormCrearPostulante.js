import React,{useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {registrarPostulante} from '../Services/PostulanteServices'
import Swal from 'sweetalert2'

export default function FormCrearPostulante(){
  let history = useHistory()


  const [value, setValue] = useState({
    Nombre:"",
    Asignatura:"",
    Telefono:"",
    Correo:"",
    Apellidos:""
  })

  const actualizarInput = (e)=>{
    setValue({
      ...value,[e.target.name]:e.target.value
    })
  }

 const manejarSubmit = async(e)=>{
   e.preventDefault()
  
   let response = await registrarPostulante(value)

   Swal.fire({
    icon: "success",
    title: "Datos registrados",
    text:"Gracias por registrarte, nos comunicaremos pronto"
   
  }).then(()=>{
    history.push('/')
  })

 }


  return(
    <div>
      <form className="row" onSubmit={(e)=>{manejarSubmit(e)}}>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label">Nombres</label>
          <input type="text" name="Nombre" placeholder="Ingrese su nombre" 
          className="form-control" value={value.Nombre} onChange={(e)=>{actualizarInput(e)}} required/>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label">Apellidos</label>
          <input type="text" name="Apellidos" placeholder="Ingrese su apellido" 
          className="form-control" value={value.Apellidos} onChange={(e)=>{actualizarInput(e)}} required/>
        </div>       
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label">Asignatura</label>
          <input type="text" name="Asignatura" placeholder="Ingrese su asignatura" 
          className="form-control" value={value.Asignatura} onChange={(e)=>{actualizarInput(e)}} required/>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label">Teléfono / Celular</label>
          <input type="text" name="Telefono" placeholder="Ingrese un número telefónico" 
          className="form-control" value={value.Telefono} onChange={(e)=>{actualizarInput(e)}} required/>
        </div>       
        <div>
          <label className="form-label">Correo</label>
          <input type="email" name="Correo" placeholder="micorreo@abc.com"
           className="form-control" value={value.Correo} onChange={(e)=>actualizarInput(e)} required />
        </div>
        <div className="col-12">
          <button className="btn btn-primary mt-3" type="submit">Enviar Datos</button>          
        </div>
        
      </form>
    </div>
  )
}