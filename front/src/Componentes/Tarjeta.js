import React from 'react'
import "./css/estilos.css"
import {Link} from 'react-router-dom'
export default function Tarjeta({curso}){
  return (
  
      <div className="col-sm-12 col-lg-6 col-xl-3">  
        <div className="recipe-card">
          <div className="imagenPlay">
            <img src={curso.producto_imagen} className="card-img-top" alt="..."/>
            <Link to={`detalle/${curso.id}`} className="button"><span className="icono icon-play"></span>  </Link>   
          </div>
          <div className="card-descripcion">
            <h2>{curso.producto_nombre}</h2> 
            <p><span>Profesor:&nbsp;</span>{curso.profesor}</p>
            <h3>S/ {parseFloat(curso.producto_precio).toFixed(2)}</h3>
           
          </div>          
        </div>          
      </div>      
 

  )
}