import React,{useContext} from 'react'
import {CarritoContext} from '../context/carritoContext'

export default function TarjetaCarrito({curso,pos}){
  const {carrito, anadirCurso, removerCurso} = useContext(CarritoContext)
 

  return (
  
    <div className="card mb-3" >
    <div className="row g-0">
      <div className="col-md-4" >
        <img src={curso.cursoImagen} className="img-fluid" alt="..." />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h6 className="card-title">{curso.cursoTema}</h6>
          <p className="card-text text-muted">S/ {parseFloat(curso.cursoPrecio).toFixed(2)}</p>
          <p className="card-text">Profesor: {curso.profesorId.user.first_name}&nbsp;{curso.profesorId.user.last_name}</p>
          <button className="btn btn-danger btn-sm" onClick={() => {removerCurso(pos); }}>
                  <i className="fas fa-trash"></i>
                </button>
        </div>
      </div>
    </div>
  </div>
        
    
 /*
 style={{backgroundImage:`url(${curso.producto_imagen})`,backgroundSize:'cover',backgroundPosition:'center'}} 
 <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4" >              
              
              <img src={curso.producto_imagen}   alt="..."/> 
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h6 className="card-title">{curso.producto_nombre}</h6>
                <p className="card-text"><small className="text-muted">S/ {parseFloat(curso.producto_precio).toFixed(2)}</small></p>
                <p className="card-text">Profesor: {curso.profesor}</p> 
                <button className="btn btn-danger btn-sm" onClick={() => {removerCurso(pos); }}>
                  <i className="fas fa-trash"></i>
                </button>                            
              </div>
              
            </div>
            
          </div>          
        </div>      





              */

  )
}