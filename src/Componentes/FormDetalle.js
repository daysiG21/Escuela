import React,{useState, useEffect,useContext, Fragment} from 'react'
import {buscarCursoId} from '../Services/CursoService'
import {CarritoContext} from '../context/carritoContext'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'

export default function FormDetalle({id}){
 let history = useHistory()

  const [curso, setCurso]=useState({})

  const {carrito, anadirCurso }= useContext(CarritoContext)

  const getCurso =async ()=>{
    let response = await buscarCursoId(id)
    setCurso(response)

  }

 
  const anadirCursoContext= ()=>{
    let cursoAlCarrito = {...curso,cantidad:1}
     anadirCurso(cursoAlCarrito)
    
  }

  useEffect(()=>{
    getCurso()
  },[])

  return (
    <Fragment>
      <div className="row">
          <div className="col-xl-12 mt-4">
            <h1>{curso.producto_nombre}</h1>
          </div> 
        </div>
        <div className="row">
          <div className="col-md-4">
                <img src="https://www.rosatel.pe/6377/florero-con-10-rosas-y-flores.jpg" className="card-img-top" alt="..."/>
          </div>       
          <div className="col-md-8">
              <p className="card-text">Precio: S/ {curso.producto_precio}</p>
              <h5 className="mb-2">DESCRIPCIÓN</h5>
              <p>{curso.producto_descripcion}</p> 
              <button className="btn btn-dark mt-2"  onClick={()=>{anadirCursoContext()}}>Agregar al Carrito</button>
             
          </div>
        </div>
    </Fragment>
    
  )
}