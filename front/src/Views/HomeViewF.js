import React, { Fragment } from 'react'
import Tarjetas from '../Componentes/Tarjetas'


export default function HomeView(props){
 

  const id = props.match.params.id
  //console.log(id);
 
  return(
    <Fragment>
      <div className="mt-3">
        <h1>Cursoso</h1> 
        <div className="mt-4"> 
          <Tarjetas/>
        </div>
      </div>
      
    </Fragment>
   
  )
}