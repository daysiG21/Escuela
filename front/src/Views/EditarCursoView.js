import React from 'react'
import FormEditCurso from '../Componentes/FormEditCurso'
import {useParams} from 'react-router-dom'

export default function EditarCursoView(){
  let {id} = useParams()

  return(
    <div>
      <h1>Editar Curso</h1>
      <FormEditCurso id={id} />
    </div>
  )

}