import React, { Fragment } from 'react'
import Tarjetas from '../Componentes/Tarjetas'

export default function HomeView(){
  return(
    <Fragment>
      <div className="mt-3">
        <h1>Cursos</h1> 
        <div className="mt-4"> 
          <Tarjetas/>
        </div>
      </div>
      
    </Fragment>
   
  )
}