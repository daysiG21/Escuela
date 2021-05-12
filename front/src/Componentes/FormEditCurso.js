import React, {useState, useEffect} from 'react'
import {buscarCursoId, editarCurso} from '../Services/CursoService'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'


export default function FormEditCurso({id}){
  let history = useHistory()
  let imagen 

  const [value, setValue]=useState({
    producto_nombre:"",
    producto_descripcion:"",
    producto_precio:0,
    curso:"",
    profesor:""
  })

  const actualizarInput =(e)=>{
    setValue({
      ...value,[e.target.name]:e.target.value
    })
  }  

  const getCursoId =async ()=>{
    let response = await buscarCursoId(id)
 
    console.log(response)
    let {producto_nombre,producto_descripcion,producto_precio,curso,profesor,producto_imagen} = response
    setValue({
      producto_nombre:producto_nombre,
      producto_descripcion:producto_descripcion,
      producto_precio:producto_precio,
      curso:curso,
      profesor:profesor,
      producto_imagen:producto_imagen
    })
    
  }
  

  useEffect(()=>{
    getCursoId()
  },[])

  const manejarSubmit =async (e)=>{
    e.preventDefault()

    let response = await editarCurso({...value},id)
    Swal.fire({
      icon: "success",
      title: "Curso Editado",
      showConfirmButton:false,
      timer:2000 
    }).then(() => {
      history.push('/cursos')

    })
  }
  
  const retornar = ()=>{
    history.push('/cursos')
   }

  
  return (
    <div>
      <form className="row" onSubmit={(e)=>{manejarSubmit(e)}}>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label">Asignatura</label>
          <input type="text" name="curso" placeholder="Ingrese la asignatura" 
          className="form-control" value={value.curso} onChange={(e)=>{actualizarInput(e)}} required/>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label">Tema</label>
          <input type="text" name="producto_nombre" placeholder="Ingrese el tema" 
          className="form-control" value={value.producto_nombre} onChange={(e)=>{actualizarInput(e)}} required/>
        </div>       
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label">Profesor</label>
          <input type="text" name="profesor" placeholder="Ingrese el nombre del profesor" 
          className="form-control" value={value.profesor} onChange={(e)=>{actualizarInput(e)}} required/>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label">Precio</label>
          <input type="number" name="producto_precio" placeholder="0" 
          className="form-control" value={value.producto_precio} onChange={(e)=>{actualizarInput(e)}} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea name="producto_descripcion" value={value.producto_descripcion} className="form-control" onChange={(e)=>{actualizarInput(e)}} placeholder="Ingrese una descripción">
          </textarea>          
        </div>
        
        <div className="col-12">
        <button className="btn btn-primary margin-right" type="submit">Editar</button>
        <button className="btn btn-secondary" onClick={()=>{retornar()}}>Retornar</button>
        </div>
        
      </form>
      
    </div>
    
  )
}