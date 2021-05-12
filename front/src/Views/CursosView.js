import React, {useState, useEffect} from 'react'
import {listarCursos,eliminarProducto} from '../Services/CursoService'
import {Link,Redirect, useHistory} from 'react-router-dom'
import {DataGrid} from '@material-ui/data-grid'
import Swal from 'sweetalert2'

export default function CursosView(){
  let history = useHistory()
  let [cursos, setCursos] = useState([])

  const getCursos = async()=>{
    let response = await listarCursos()
    setCursos(response)
  }

  useEffect(()=>{
    getCursos()
  },[])

  const nuevoCurso = ()=>{
    history.push('/crearCurso')
  }

  const eliminar =async (id)=>{
    let response = await eliminarProducto(id)
     
    Swal.fire({      
     title:'Eliminado!',
     text:'El curso ha sido eliminado',
     icon:'success',     
   }).then(()=>{   
    getCursos()
   })
   }

  
  let columns =[
    {field:'curso', headerName:'Asignatura', width:300},
    {field:'producto_nombre', headerName:'Tema', width:300},
    {field:'profesor', headerName:'Profesor', width:300},
    {field:'producto_precio', headerName:'Precio', width:100},
    {
      field:'id',
      headerName:'Acciones',
      renderCell:(params)=>(
        <div>
          <Link className="btn btn-info mx-2" to={`/editarCurso/${params.value}`} >
            <i className="fas fa-pencil-alt"></i>
          </Link>
          <Link className="btn btn-danger" onClick={()=>{eliminar(params.value)}}>
            <i className="fas fa-trash"></i>
          </Link>         
        </div>
      ),width:150
    }
  ];

  return(
    <div className="mt-3">
      <h1>Cursos</h1>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-xl-2">
          <div className="d-grid">            
            <button className="btn btn-primary mb-3" onClick={()=>{nuevoCurso()}} >Nuevo</button>
          </div>
        </div>
        <div style={{width:'100%', height:'500px'}}>
        <DataGrid rows={cursos} columns={columns} pageSize={5} />
        </div>
      </div>
      <div>

      </div>
    </div>
  )

}