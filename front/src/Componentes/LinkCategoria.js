import React from 'react'
import {Link, useHistory} from 'react-router-dom'

export default function LinkCategoria({categoria}){
 
  return (
    <li><Link className="nav-link text-dark" 
    to={`categoria/${categoria.categoriaId}`}>{categoria.categoriaNombre}</Link></li>
  )
}