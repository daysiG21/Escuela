import React from 'react'
import "./css/estilos.css"
import {Link} from 'react-router-dom'
export default function Tarjeta({curso}){
 
  return (
  
      <div className="col-sm-12 col-lg-6 col-xl-3">  
        <div className="recipe-card">
          <div className="imagenPlay">
            <img src={curso.cursoImagen} className="card-img-top" alt="..."/>
            <Link to={`detalle/${curso.cursoId}`} className="button"><span className="icono icon-play"></span>  </Link>   
          </div>
          <div className="card-descripcion">
            <h2>{curso.cursoTema}</h2> 
            <p><span>Profesor:&nbsp;</span>{curso.profesorId.user.first_name}&nbsp;{curso.profesorId.user.last_name}</p>
            <h3>S/ {parseFloat(curso.cursoPrecio).toFixed(2)}</h3>
           
          </div>          
        </div>          
      </div>      
 

  )
}