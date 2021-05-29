import React,{useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {registrarCurso,subirArchivo} from '../Services/CursoService'
import Swal from 'sweetalert2'
import Fire from '../config/Firebase'

export default function FormCrearCurso(){
  let history = useHistory()
  let imagen 

  const [value, setValue] = useState({
    producto_nombre:"",
    producto_descripcion:"",
    producto_precio:0,
    curso:"",
    profesor:""
  })

  const actualizarInput = (e)=>{
    setValue({
      ...value,[e.target.name]:e.target.value
    })
  }

 const manejarSubmit = async(e)=>{
   e.preventDefault()

   //const refCursoStorage=Fire.storage().ref(`imgCursos/${imagen.name}`) 
   const refCursoStorage = Fire.storage().ref(`imgCursos/${imagen.name}`)
   let urlImageSubida= await subirArchivo(imagen,refCursoStorage)

   let response = await registrarCurso({...value,producto_imagen:urlImageSubida})

   Swal.fire({
    icon: "success",
    title: "Producto Creado!!!",
    showConfirmButton:false,
    timer:2000
   
  }).then(()=>{
    history.push('/cursos')
  })

 }

 const retornar = ()=>{
  history.push('/cursos')
 }

 const subirImagen=(e)=>{
   //console.log(e.target.files[0])
   let miImagen = e.target.files[0]
   imagen = miImagen
 }
  return(
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
        <div>
          <label className="form-label">Imágen</label>
          <input type="file" className="form-control mb-3" onChange={(e)=>subirImagen(e)} />
        </div>
        <div className="col-12">
          <button className="btn btn-primary margin-right" type="submit">Grabar</button>
          <button className="btn btn-secondary" onClick={()=>{retornar()}}>Retornar</button>
        </div>
        
      </form>
    </div>
  )
}